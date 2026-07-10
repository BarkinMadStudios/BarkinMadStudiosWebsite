import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  auditRepository,
  classifyDateField,
  gitDateEvidence,
  isValidDateOnly,
  stripManagedMetadata,
  ukCalendarDate
} from "./audit-content-dates.mjs";

function command(cwd, executable, args, env = {}) {
  const result = spawnSync(executable, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, ...env }
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

function commit(repo, message, timestamp) {
  command(repo, "git", ["add", "."]);
  command(repo, "git", ["commit", "-m", message], {
    GIT_AUTHOR_DATE: timestamp,
    GIT_COMMITTER_DATE: timestamp
  });
}

function fixture() {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), "content-dates-"));
  command(repo, "git", ["init", "-q"]);
  command(repo, "git", ["config", "user.email", "codex@example.test"]);
  command(repo, "git", ["config", "user.name", "Codex Test"]);
  fs.mkdirSync(path.join(repo, "pages"));
  fs.writeFileSync(path.join(repo, "pages", "original.json"), JSON.stringify({
    title: "Original",
    lastUpdated: "2026-06-30",
    lastVerified: "2026-06-29"
  }, null, 2));
  commit(repo, "Add content", "2026-06-30T23:30:00Z");
  command(repo, "git", ["mv", "pages/original.json", "pages/renamed.json"]);
  commit(repo, "Rename only", "2026-07-02T09:00:00Z");
  return repo;
}

test("classifies modification, review, publication, and unknown fields", () => {
  assert.equal(classifyDateField("lastUpdated"), "modification");
  assert.equal(classifyDateField("lastVerified"), "review-or-verification");
  assert.equal(classifyDateField("date"), "publication-or-historical");
  assert.equal(classifyDateField("mysteryDate"), "unknown");
});

test("validates real date-only values", () => {
  assert.equal(isValidDateOnly("2026-07-10"), true);
  assert.equal(isValidDateOnly("2026-02-29"), false);
  assert.equal(isValidDateOnly("10/07/2026"), false);
});

test("converts timestamps using the Europe/London calendar date", () => {
  assert.equal(ukCalendarDate("2026-06-30T23:30:00Z"), "2026-07-01");
  assert.equal(ukCalendarDate("2026-12-31T23:30:00Z"), "2026-12-31");
});

test("ignores formatting, key order, and managed metadata", () => {
  const left = { title: "Same", lastUpdated: "2026-06-01", nested: { lastVerified: "2026-06-02", value: 1 } };
  const right = { nested: { value: 1, lastVerified: "2026-07-01" }, lastUpdated: "2026-07-01", title: "Same" };
  assert.deepEqual(stripManagedMetadata(left), stripManagedMetadata(right));
});

test("follows rename history and ignores a rename-only commit", () => {
  const repo = fixture();
  const evidence = gitDateEvidence(repo, "pages/renamed.json");
  assert.equal(evidence.meaningfulDate, "2026-07-01");
  assert.equal(new Date(evidence.latestCommitTimestamp).toISOString(), "2026-07-02T09:00:00.000Z");
});

test("apply changes only the selected date value and preserves formatting", () => {
  const repo = fixture();
  const file = path.join(repo, "pages", "renamed.json");
  const before = fs.readFileSync(file, "utf8");
  const report = auditRepository({ repo, roots: ["pages"], today: "2026-07-10", apply: true });
  const after = fs.readFileSync(file, "utf8");
  assert.equal(report.summary.filesChanged, 1);
  assert.equal(after, before.replace('"lastUpdated": "2026-06-30"', '"lastUpdated": "2026-07-01"'));
});

test("dry-run proposes updates without writing and retains review metadata", () => {
  const repo = fixture();
  const file = path.join(repo, "pages", "renamed.json");
  const before = fs.readFileSync(file, "utf8");
  const report = auditRepository({ repo, roots: ["pages"], today: "2026-07-10", apply: false });
  assert.equal(report.summary.proposedUpdates, 1);
  assert.equal(report.entries.find(({ field }) => field === "lastUpdated").newValue, "2026-07-01");
  assert.equal(report.entries.find(({ field }) => field === "lastVerified").action, "retain");
  assert.equal(fs.readFileSync(file, "utf8"), before);
});

test("future metadata is an error but future publication is ignored", () => {
  const repo = fixture();
  fs.writeFileSync(path.join(repo, "pages", "future.json"), JSON.stringify({
    title: "Scheduled article",
    date: "2026-08-01",
    lastUpdated: "2026-08-01"
  }, null, 2));
  commit(repo, "Add scheduled article", "2026-07-03T09:00:00Z");
  const report = auditRepository({ repo, roots: ["pages"], today: "2026-07-10", apply: false });
  assert.equal(report.errors.some((error) => error.includes("future publication")), false);
  assert.equal(report.errors.some((error) => error.includes("future modification")), true);
});
