#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const MODIFICATION_FIELDS = new Set(["lastUpdated", "updatedAt", "modified", "dateModified"]);
const REVIEW_FIELDS = new Set(["lastReviewed", "lastVerified", "verifiedAt", "reviewDate"]);
const PUBLICATION_FIELDS = new Set([
  "date",
  "published",
  "publishedAt",
  "releaseDate",
  "launchDate",
  "eventDate",
  "createdAt"
]);
const KNOWN_FIELDS = new Set([...MODIFICATION_FIELDS, ...REVIEW_FIELDS, ...PUBLICATION_FIELDS]);
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function classifyDateField(field) {
  if (MODIFICATION_FIELDS.has(field)) return "modification";
  if (REVIEW_FIELDS.has(field)) return "review-or-verification";
  if (PUBLICATION_FIELDS.has(field)) return "publication-or-historical";
  return "unknown";
}

export function ukCalendarDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid timestamp: ${timestamp}`);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map(({ type, value: part }) => [type, part]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function isValidDateOnly(value) {
  if (!DATE_ONLY_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function stripManagedMetadata(value) {
  if (Array.isArray(value)) return value.map(stripManagedMetadata);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !MODIFICATION_FIELDS.has(key) && !REVIEW_FIELDS.has(key))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => [key, stripManagedMetadata(nested)])
  );
}

function parseArguments(argv) {
  const options = {
    apply: false,
    jsonOutput: null,
    repo: process.cwd(),
    roots: [],
    today: ukCalendarDate(new Date()),
    verbose: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--apply") options.apply = true;
    else if (argument === "--verbose") options.verbose = true;
    else if (["--json", "--repo", "--root", "--today"].includes(argument)) {
      const value = argv[index + 1];
      if (!value) throw new Error(`${argument} requires a value`);
      index += 1;
      if (argument === "--json") options.jsonOutput = value;
      if (argument === "--repo") options.repo = path.resolve(value);
      if (argument === "--root") options.roots.push(value);
      if (argument === "--today") options.today = value;
    } else if (argument === "--help") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (!options.roots.length) options.roots = ["pages", "news"];
  if (!isValidDateOnly(options.today)) throw new Error(`Invalid --today value: ${options.today}`);
  return options;
}

function usage() {
  return `Usage: node scripts/audit-content-dates.mjs [options]

Audits public JSON date metadata against meaningful Git history. The default mode is dry-run.

Options:
  --apply          Write evidence-backed modification-field updates
  --json <path>    Write the complete machine-readable inventory
  --repo <path>    Repository root (default: current directory)
  --root <path>    Content root; repeatable (default: pages and news)
  --today <date>   Validation date in YYYY-MM-DD format
  --verbose        Print every inventoried field
  --help           Show this help`;
}

function git(repo, args, allowFailure = false) {
  const result = spawnSync("git", args, { cwd: repo, encoding: "utf8" });
  if (result.status !== 0 && !allowFailure) {
    throw new Error(`git ${args.join(" ")} failed: ${result.stderr.trim()}`);
  }
  return result.status === 0 ? result.stdout : null;
}

function listJsonFiles(repo, roots) {
  const files = [];
  const visit = (relativePath) => {
    const absolutePath = path.join(repo, relativePath);
    if (!fs.existsSync(absolutePath)) throw new Error(`Content root not found: ${relativePath}`);
    const stat = fs.statSync(absolutePath);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(absolutePath).sort()) visit(path.join(relativePath, entry));
    } else if (relativePath.endsWith(".json")) {
      files.push(relativePath.split(path.sep).join("/"));
    }
  };
  roots.forEach(visit);
  return files;
}

function findDateFields(value, segments = [], found = []) {
  if (Array.isArray(value)) {
    value.forEach((nested, index) => findDateFields(nested, [...segments, index], found));
    return found;
  }
  if (!value || typeof value !== "object") return found;
  for (const [key, nested] of Object.entries(value)) {
    const nextSegments = [...segments, key];
    if (KNOWN_FIELDS.has(key)) found.push({ field: key, segments: nextSegments, value: nested });
    findDateFields(nested, nextSegments, found);
  }
  return found;
}

function jsonPath(segments) {
  return segments.reduce((result, segment) => (
    typeof segment === "number" ? `${result}[${segment}]` : `${result}.${segment}`
  ), "$");
}

function parseGitJson(repo, revision, file) {
  const source = git(repo, ["show", `${revision}:${file}`], true);
  if (source === null) return null;
  try {
    return JSON.parse(source);
  } catch {
    return null;
  }
}

function commitChange(repo, hash, currentPath) {
  const rows = git(repo, ["diff-tree", "--root", "--no-commit-id", "--name-status", "-r", "-M", hash])
    .trim().split("\n").filter(Boolean).map((line) => line.split("\t"));
  const row = rows.find((parts) => {
    const status = parts[0][0];
    return status === "R" || status === "C" ? parts[2] === currentPath : parts[1] === currentPath;
  });
  if (!row) return { oldPath: currentPath, currentPath };
  const status = row[0][0];
  return {
    currentPath,
    oldPath: status === "R" || status === "C" ? row[1] : currentPath
  };
}

export function gitDateEvidence(repo, file) {
  const historyOutput = git(repo, ["log", "--follow", "--format=%H%x09%aI", "--", file], true);
  if (historyOutput === null || !historyOutput.trim()) return null;
  const history = historyOutput.trim().split("\n").map((line) => {
    const [hash, timestamp] = line.split("\t");
    return { hash, timestamp };
  });
  let currentPath = file;

  for (const commit of history) {
    const { oldPath } = commitChange(repo, commit.hash, currentPath);
    const current = parseGitJson(repo, commit.hash, currentPath);
    const parent = git(repo, ["rev-parse", `${commit.hash}^`], true)?.trim();
    const previous = parent ? parseGitJson(repo, parent, oldPath) : null;
    if (current && JSON.stringify(stripManagedMetadata(current)) !== JSON.stringify(stripManagedMetadata(previous))) {
      return {
        latestCommitTimestamp: history[0].timestamp,
        meaningfulCommit: commit.hash,
        meaningfulTimestamp: commit.timestamp,
        meaningfulDate: ukCalendarDate(commit.timestamp)
      };
    }
    currentPath = oldPath;
  }

  return {
    latestCommitTimestamp: history[0].timestamp,
    meaningfulCommit: null,
    meaningfulTimestamp: null,
    meaningfulDate: null
  };
}

function requiredDateIssues(document, file) {
  if (!document.documentationSchemaVersion) return [];
  const issues = [];
  for (const field of ["lastUpdated", "lastVerified"]) {
    if (!Object.hasOwn(document, field)) issues.push(`${file}: missing required ${field}`);
  }
  return issues;
}

export function auditRepository(options) {
  const entries = [];
  const files = [];
  const errors = [];
  const changedFiles = new Map();
  const sourceCache = new Map();

  for (const file of listJsonFiles(options.repo, options.roots)) {
    let document;
    try {
      document = JSON.parse(fs.readFileSync(path.join(options.repo, file), "utf8"));
    } catch (error) {
      errors.push(`${file}: invalid JSON (${error.message})`);
      files.push({ file, fields: 0, status: "invalid-json" });
      continue;
    }

    errors.push(...requiredDateIssues(document, file));
    const fields = findDateFields(document);
    files.push({ file, fields: fields.length, status: fields.length ? "inventoried" : "no-date-metadata" });
    let evidence = null;
    const fieldOccurrences = new Map();

    for (const item of fields) {
      const occurrence = fieldOccurrences.get(item.field) ?? 0;
      fieldOccurrences.set(item.field, occurrence + 1);
      const classification = classifyDateField(item.field);
      const valid = typeof item.value === "string" && isValidDateOnly(item.value);
      if (!valid) errors.push(`${file} ${jsonPath(item.segments)}: invalid date value ${JSON.stringify(item.value)}`);
      if (valid && classification !== "publication-or-historical" && item.value > options.today) {
        errors.push(`${file} ${jsonPath(item.segments)}: future ${classification} date ${item.value}`);
      }

      let proposedValue = item.value;
      let sourceTimestamp = null;
      let sourceType = classification === "modification" ? "meaningful-git-history" : "existing-field-semantics";
      let reason;
      let action;
      let confidence = valid ? "high" : "low";

      if (classification === "modification") {
        if (!sourceCache.has(file)) sourceCache.set(file, gitDateEvidence(options.repo, file));
        evidence = sourceCache.get(file);
        if (!evidence?.meaningfulDate) {
          reason = "No usable meaningful Git content history; filesystem time was not used automatically.";
          action = "review";
          confidence = "low";
          errors.push(`${file}: no usable meaningful Git history for ${item.field}`);
        } else {
          proposedValue = evidence.meaningfulDate;
          sourceTimestamp = evidence.meaningfulTimestamp;
          action = item.value === proposedValue ? "retain" : "update";
          reason = action === "retain"
            ? "Value already matches the latest meaningful public-content commit in Europe/London."
            : "Synchronise to the latest meaningful public-content commit in Europe/London.";
        }
      } else if (classification === "review-or-verification") {
        action = "retain";
        reason = "Retained: Git modification history alone is not evidence of a completed review or verification.";
      } else if (classification === "publication-or-historical") {
        action = "ignore";
        reason = "Publication or historical date is outside modification-date synchronisation scope.";
      } else {
        action = "review";
        reason = "Ambiguous date semantics; left unchanged.";
        confidence = "low";
      }

      entries.push({
        file,
        jsonPath: jsonPath(item.segments),
        field: item.field,
        oldValue: item.value,
        newValue: proposedValue,
        latestGitCommitTimestamp: evidence?.latestCommitTimestamp ?? null,
        sourceTimestamp,
        sourceType,
        classification,
        reason,
        confidence,
        action
      });

      if (options.apply && action === "update") {
        if (!changedFiles.has(file)) changedFiles.set(file, []);
        changedFiles.get(file).push({ field: item.field, occurrence, oldValue: item.value, newValue: proposedValue });
      }
    }
  }

  for (const [file, updates] of changedFiles) {
    const absolutePath = path.join(options.repo, file);
    const original = fs.readFileSync(absolutePath, "utf8");
    const seen = new Map();
    const updated = original.replace(
      /"(lastUpdated|updatedAt|modified|dateModified)"(\s*:\s*)"([^"]*)"/g,
      (match, field, separator, oldValue) => {
        const occurrence = seen.get(field) ?? 0;
        seen.set(field, occurrence + 1);
        const update = updates.find((candidate) => candidate.field === field && candidate.occurrence === occurrence);
        if (!update) return match;
        if (oldValue !== update.oldValue) {
          throw new Error(`${file}: source changed while applying ${field} occurrence ${occurrence}`);
        }
        return `"${field}"${separator}"${update.newValue}"`;
      }
    );
    fs.writeFileSync(absolutePath, updated);
  }

  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    filesInspected: files.length,
    fieldsFound: entries.length,
    modificationFields: entries.filter(({ classification }) => classification === "modification").length,
    reviewFields: entries.filter(({ classification }) => classification === "review-or-verification").length,
    publicationFields: entries.filter(({ classification }) => classification === "publication-or-historical").length,
    proposedUpdates: entries.filter(({ action }) => action === "update").length,
    retained: entries.filter(({ action }) => action === "retain").length,
    ignored: entries.filter(({ action }) => action === "ignore").length,
    reviewRequired: entries.filter(({ action }) => action === "review").length,
    filesChanged: changedFiles.size,
    errors: errors.length,
    filesystemTimestampsUsed: 0
  };

  return { generatedAt: new Date().toISOString(), timezone: "Europe/London", summary, files, entries, errors };
}

function printReport(report, verbose) {
  console.log(`${report.summary.mode === "dry-run" ? "DRY RUN" : "APPLY"}: content date audit`);
  for (const [key, value] of Object.entries(report.summary)) console.log(`${key}: ${value}`);
  const displayed = verbose ? report.entries : report.entries.filter(({ action }) => action === "update" || action === "review");
  for (const entry of displayed) {
    console.log(`${entry.action.toUpperCase()} ${entry.file} ${entry.jsonPath}: ${entry.oldValue} -> ${entry.newValue}`);
  }
  for (const error of report.errors) console.error(`ERROR ${error}`);
}

function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
    if (options.help) {
      console.log(usage());
      return;
    }
    const report = auditRepository(options);
    printReport(report, options.verbose);
    if (options.jsonOutput) {
      const outputPath = path.resolve(options.repo, options.jsonOutput);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
    }
    if (report.errors.length) process.exitCode = 1;
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
