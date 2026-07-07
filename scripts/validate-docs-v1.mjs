#!/usr/bin/env node
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS_DIR = path.join(ROOT_DIR, "pages", "apps");
const IMAGE_ROOT = path.join(ROOT_DIR, "images", "apps");
const DOCUMENTATION_PLACEHOLDER_PATH = path.join(ROOT_DIR, "images", "shared", "placeholder.png");

const STRICT = process.argv.includes("--strict");
const JSON_OUTPUT = process.argv.includes("--json");

const args = {
  strict: STRICT,
  json: JSON_OUTPUT
};

const CORE_PAGES = [
  "overview",
  "how-to-play",
  "controls",
  "game-modes",
  "barkinmad-coins",
  "achievements",
  "leaderboards",
  "tips-and-strategy",
  "frequently-asked-questions"
];

const CONTENT_STATUS_VALUES = new Set(["verified", "needs-review", "stale", "draft"]);
const VALID_PAGES_FILE_EXTENSIONS = new Set([".json"]);

const report = {
  appsScanned: 0,
  pagesFound: 0,
  legacyApps: 0,
  warnings: [],
  errors: [],
  checks: {
    schema: 0,
    navigation: 0,
    links: 0,
    seo: 0,
    images: 0
  }
};

function addError(context, message, details = null) {
  report.errors.push({ severity: "error", context, message, details });
}

function addWarning(context, message, details = null) {
  report.warnings.push({ severity: "warning", context, message, details });
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isDateString(value) {
  if (!isString(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

function normalizeSlug(value) {
  return isString(value) ? value.trim().toLowerCase() : "";
}

function safeJsonParse(filePath, raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    addError("json", `Invalid JSON in ${filePath}`, error.message);
    return null;
  }
}

async function readJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return safeJsonParse(filePath, raw);
  } catch (error) {
    addError("json", `Failed to read ${filePath}`, error.message);
    return null;
  }
}

function markdownLinks(text) {
  if (!isString(text)) return [];
  const links = [];
  const regex = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push({ label: match[1], href: match[2] });
  }
  return links;
}

function markdownLinksFromValue(value) {
  const links = [];
  if (value === null || value === undefined) return links;

  if (typeof value === "string") {
    links.push(...markdownLinks(value));
    return links;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      links.push(...markdownLinksFromValue(item));
    }
  } else if (isObject(value)) {
    const { question, answer, heading, paragraph, paragraphs, body, bullets, bulletPoints, description, summary } = value;
    links.push(...markdownLinksFromValue(question));
    links.push(...markdownLinksFromValue(answer));
    links.push(...markdownLinksFromValue(heading));
    links.push(...markdownLinksFromValue(paragraph));
    links.push(...markdownLinksFromValue(paragraphs));
    links.push(...markdownLinksFromValue(body));
    links.push(...markdownLinksFromValue(bullets));
    links.push(...markdownLinksFromValue(bulletPoints));
    links.push(...markdownLinksFromValue(description));
    links.push(...markdownLinksFromValue(summary));
  }

  return links;
}

function explicitLinksFromValue(value) {
  const links = [];
  if (value === null || value === undefined) return links;

  if (Array.isArray(value)) {
    for (const item of value) {
      links.push(...explicitLinksFromValue(item));
    }
    return links;
  }

  if (!isObject(value)) return links;

  if (isString(value.href)) {
    links.push({ href: value.href });
  }

  for (const nested of Object.values(value)) {
    if (Array.isArray(nested) || isObject(nested)) {
      links.push(...explicitLinksFromValue(nested));
    }
  }

  return links;
}

function validateDatePair(context, item) {
  if (!isDateString(item.lastUpdated)) {
    addError(context, `Missing or invalid lastUpdated`, { value: item.lastUpdated });
  }

  if (!isDateString(item.lastVerified)) {
    addError(context, `Missing or invalid lastVerified`, { value: item.lastVerified });
  }

  if (isDateString(item.lastUpdated) && isDateString(item.lastVerified)) {
    const updated = new Date(item.lastUpdated);
    const verified = new Date(item.lastVerified);
    if (verified < updated) {
      addWarning(context, "lastVerified is before lastUpdated", {
        lastUpdated: item.lastUpdated,
        lastVerified: item.lastVerified
      });
    }
  }
}

function validateContentStatus(context, status) {
  if (!CONTENT_STATUS_VALUES.has(String(status || "").toLowerCase())) {
    addError(context, "Invalid contentStatus", status);
    return false;
  }
  return true;
}

function validateVersion(context, version) {
  if (!isString(version)) {
    addError(context, "Missing documentationSchemaVersion", version);
    return false;
  }

  if (!/^1\.\d+\.\d+$/.test(version)) {
    addWarning(context, "Non-v1 documentationSchemaVersion", version);
    return false;
  }

  return true;
}

function resolveImagePath(ref) {
  if (!isString(ref)) return null;

  let value = ref.trim();

  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return null;

  if (value.startsWith("/images/")) value = value.replace(/^\/images\//, "");
  value = value.replace(/^\/+/, "");

  if (value.startsWith("images/")) {
    return path.join(ROOT_DIR, value);
  }

  if (value.startsWith("apps/")) {
    return path.join(ROOT_DIR, "images", value);
  }

  return path.join(IMAGE_ROOT, value);
}

function validateImageReferences(context, values, imageReport) {
  const refs = [];
  const pushRef = (value) => {
    if (isString(value)) {
      refs.push(String(value).trim());
    }
  };

  const walk = (value) => {
    if (isObject(value)) {
      for (const [key, nested] of Object.entries(value)) {
        if (key === "src") {
          pushRef(nested);
        } else {
          walk(nested);
        }
      }
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }

    if (isString(value)) {
      // only direct strings are handled by src paths above
    }
  };

  walk(values);

  for (const image of refs) {
    if (!isString(image)) continue;
    const resolved = resolveImagePath(image);
    const source = valueToDisplayPath(image);

    if (resolved === null) {
      addWarning(context, "Skipping external image reference", { image });
      continue;
    }

    report.checks.images += 1;

    if (resolved.includes("..")) {
      addWarning(context, "Image path has parent traversal", source);
    }

    if (!existsSync(resolved)) {
      addError(context, "Referenced image not found", source);
      imageReport.missing.push(source);
      continue;
    }

    imageReport.found.push(source);
  }
}

function validateFeatureShowcases(context, pageSlug, featureShowcases) {
  if (featureShowcases === undefined) return;

  if (!Array.isArray(featureShowcases)) {
    addWarning(context, "featureShowcases should be an array", pageSlug);
    return;
  }

  for (const [i, showcase] of featureShowcases.entries()) {
    const showcaseContext = `${context}.featureShowcases[${i}]`;

    if (!isObject(showcase)) {
      addWarning(showcaseContext, "Feature showcase entry should be an object", pageSlug);
      continue;
    }

    if (!isString(showcase.heading)) {
      addError(showcaseContext, "Feature showcase requires a clear heading", pageSlug);
    }

    if (showcase.layout !== undefined && !["textLeft", "textRight"].includes(showcase.layout)) {
      addError(showcaseContext, "Feature showcase layout must be textLeft or textRight", showcase.layout);
    }

    const image = isObject(showcase.image) ? showcase.image : {
      src: showcase.imageSrc || showcase.src,
      alt: showcase.imageAlt || showcase.alt,
      caption: showcase.caption
    };

    if (!isString(image.src)) {
      addError(showcaseContext, "Feature showcase image requires src", pageSlug);
    }

    if (!isString(image.alt)) {
      addError(showcaseContext, "Feature showcase image requires meaningful alt text", pageSlug);
    }

    const bodyValues = [
      showcase.summary,
      showcase.body,
      showcase.paragraphs,
      showcase.bullets,
      showcase.bulletPoints
    ];
    const hasBodyContent = bodyValues.some((value) => {
      if (isString(value)) return true;
      return Array.isArray(value) && value.some(isString);
    });

    if (!hasBodyContent) {
      addWarning(showcaseContext, "Feature showcase should include summary, body, paragraphs, or bullet content", pageSlug);
    }

    for (const linkGroupName of ["links", "internalLinks"]) {
      if (showcase[linkGroupName] === undefined) continue;
      if (!Array.isArray(showcase[linkGroupName])) {
        addWarning(`${showcaseContext}.${linkGroupName}`, "Feature showcase links should be an array", pageSlug);
        continue;
      }

      for (const [linkIndex, link] of showcase[linkGroupName].entries()) {
        if (!isObject(link) || !isString(link.label) || !isString(link.href)) {
          addWarning(`${showcaseContext}.${linkGroupName}[${linkIndex}]`, "Feature showcase links require label and href", pageSlug);
        }
      }
    }
  }
}

function validateDocumentationPlaceholder() {
  report.checks.images += 1;
  if (!existsSync(DOCUMENTATION_PLACEHOLDER_PATH)) {
    addError("framework.images", "Documentation placeholder image not found", "images/shared/placeholder.png");
  }
}

function valueToDisplayPath(value) {
  if (!isString(value)) return value;
  return value.trim();
}

function validateIndexSchema(context, index) {
  report.checks.schema += 1;
  report.checks.seo += 1;

  if (!isObject(index)) {
    addError(context, "pages.json must be an object");
    return false;
  }

  if (!validateVersion(context, index.documentationSchemaVersion)) return false;

  const required = [
    "appSlug",
    "title",
    "description",
    "landingPage",
    "pages",
    "lastUpdated",
    "lastVerified",
    "estimatedReadTimeMinutes"
  ];

  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(index, key)) {
      addError(context, `pages.json missing required field: ${key}`);
    }
  }

  if (!isString(index.appSlug)) {
    addError(context, "pages.json appSlug must be string");
  }

  if (!Array.isArray(index.pages)) {
    addError(context, "pages.json pages must be an array");
    return false;
  }

  if (!index.pages.length) {
    addError(context, "pages.json pages cannot be empty");
  }

  if (!isString(index.landingPage)) {
    addWarning(context, "landingPage is missing or invalid");
  }

  const seenSlugs = new Set();
  const allSlugs = new Set(
    index.pages
      .filter(entry => isObject(entry) && isString(entry.slug))
      .map(entry => normalizeSlug(entry.slug))
  );
  const seenOrders = new Set();
  const slugs = new Set();

  for (let i = 0; i < index.pages.length; i += 1) {
    const page = index.pages[i];
    const pageContext = `${context}.pages[${i}]`;

    if (!isObject(page)) {
      addError(pageContext, "Page entry must be object");
      continue;
    }

    const { slug, title, description, order, required, status, estimatedReadTimeMinutes, contentStatus } = page;

    if (!isString(slug)) {
      addError(pageContext, "Page slug required");
      continue;
    }

    const normalizedSlug = normalizeSlug(slug);
    if (seenSlugs.has(normalizedSlug)) {
      addError(pageContext, `Duplicate page slug: ${normalizedSlug}`);
    }
    seenSlugs.add(normalizedSlug);
    slugs.add(normalizedSlug);

    if (!isString(title)) {
      addError(pageContext, "Page title required", slug);
    }

    if (!isString(description)) {
      addError(pageContext, "Page description required", slug);
    }

    if (!Number.isInteger(order) || order < 1) {
      addWarning(pageContext, "Page order should be positive integer", slug);
    } else if (seenOrders.has(order)) {
      addWarning(pageContext, "Duplicate page order", { slug, order });
    } else {
      seenOrders.add(order);
    }

    if (!validateContentStatus(`${pageContext}.contentStatus`, contentStatus)) {
      addWarning(pageContext, "contentStatus missing; default will be used", { slug });
    }

    validateDatePair(`${pageContext}.dates`, page);

    if (typeof estimatedReadTimeMinutes !== "number" || estimatedReadTimeMinutes < 1) {
      addWarning(pageContext, "estimatedReadTimeMinutes should be a positive number", slug);
    }

    if (typeof required !== "boolean") {
      addWarning(pageContext, "required should be boolean", slug);
    }

    if (required === true && status && status !== "required") {
      addWarning(pageContext, "required page has status != required", { slug, status });
    }

    if (required === false && status === "required") {
      addWarning(pageContext, "optional page has status required", { slug });
    }

    if (!required) {
      if (!status) {
        addWarning(pageContext, "Optional page should set status", { slug });
      } else if (!["optional", "required"].includes(status)) {
        addWarning(pageContext, "status should be optional|required", { slug, status });
      }
    }

    if (Array.isArray(page.relatedPages)) {
      for (const rel of page.relatedPages) {
        if (typeof rel === "string" && rel) {
          if (!allSlugs.has(normalizeSlug(rel))) {
            addWarning(pageContext, `relatedPages slug not in index`, rel);
          }
        } else if (isObject(rel) && isString(rel.slug)) {
          if (!allSlugs.has(normalizeSlug(rel.slug))) {
            addWarning(pageContext, `relatedPages entry slug not in index`, rel.slug);
          }
        }
      }
    }
  }

  if (isString(index.landingPage) && !slugs.has(normalizeSlug(index.landingPage))) {
    addError(context, "landingPage does not exist in pages[]", index.landingPage);
  }

  for (const requiredSlug of CORE_PAGES) {
    if (!slugs.has(requiredSlug)) {
      addError(context, `Missing required core page: ${requiredSlug}`);
    }
  }

  return { slugs, pages: index.pages, index, hasV1: true };
}

function validateDetailPage(pagePath, pageSlug, expectedContext) {
  report.checks.schema += 1;
  report.pagesFound += 1;
  const context = `${expectedContext}.${pageSlug}`;
  const page = readCache.get(pagePath);

  if (!isObject(page)) {
    addError(context, "Page JSON file is invalid");
    return;
  }

  validateVersion(context, page.documentationSchemaVersion);
  const required = [
    "title",
    "description",
    "sections",
    "contentStatus",
    "lastUpdated",
    "lastVerified",
    "estimatedReadTimeMinutes"
  ];

  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(page, key)) {
      addError(context, `Missing required field: ${key}`);
    }
  }

  if (!isString(page.title)) addError(context, "title required");
  if (!isString(page.description)) addError(context, "description required");
  if (!Array.isArray(page.sections) || !page.sections.length) {
    addWarning(context, "sections should be a non-empty array");
  }

  if (!validateContentStatus(`${context}.contentStatus`, page.contentStatus)) {
    addWarning(context, "contentStatus fallback to default may be used", { page: pageSlug });
  }

  validateDatePair(context, page);

  if (typeof page.estimatedReadTimeMinutes !== "number" || page.estimatedReadTimeMinutes < 1) {
    addWarning(context, "estimatedReadTimeMinutes should be a positive number", pageSlug);
  }

  if (page.heroImage && !isString(page.heroImage)) {
    addWarning(context, "heroImage should be a string", { page: pageSlug });
  }

  const seoTitle = page.seoTitle;
  report.checks.seo += 1;
  if (!isString(seoTitle)) {
    addWarning(context, "seoTitle recommended for search consistency", pageSlug);
  } else if (seoTitle.length > 70) {
    addWarning(context, "seoTitle looks long", { page: pageSlug, length: seoTitle.length });
  }

  if (!isString(page.description) || page.description.length < 80 || page.description.length > 200) {
    addWarning(context, "description length should be 80-200 chars", {
      page: pageSlug,
      length: isString(page.description) ? page.description.length : 0
    });
  }

  if (Array.isArray(page.keywords) && page.keywords.length === 0) {
    addWarning(context, "keywords should not be empty", pageSlug);
  }

  if (Array.isArray(page.faq)) {
    for (const [i, faq] of page.faq.entries()) {
      if (!isObject(faq) || !isString(faq.question) || !isString(faq.answer)) {
        addWarning(context, `FAQ entry ${i} requires question and answer`, pageSlug);
      }
    }
  }

  if (Array.isArray(page.images) && !page.images.every(item => isObject(item) && isString(item.src))) {
    addWarning(context, "images entries should include src");
  }

  if (Array.isArray(page.imageMetadata)) {
    for (const [i, meta] of page.imageMetadata.entries()) {
      if (!isObject(meta) || !isString(meta.src) || !isString(meta.alt)) {
        addWarning(context, `imageMetadata[${i}] requires src and alt`, pageSlug);
      }

      if (!isString(meta.purpose)) {
        addWarning(context, `imageMetadata[${i}] should include purpose`, pageSlug);
      }

      if (!Number.isInteger(meta.width) || !Number.isInteger(meta.height)) {
        addWarning(context, `imageMetadata[${i}] should include numeric width/height`, pageSlug);
      }
    }
  }

  validateFeatureShowcases(context, pageSlug, page.featureShowcases);

  const linkContext = `${context}.links`;
  const links = [
    page.summary,
    page.description,
    ...(Array.isArray(page.sections) ? page.sections.flatMap(markdownLinksFromValue) : []),
    ...(Array.isArray(page.featureShowcases) ? page.featureShowcases.flatMap(markdownLinksFromValue) : []),
    ...(Array.isArray(page.featureShowcases) ? page.featureShowcases.flatMap(explicitLinksFromValue) : []),
    ...(Array.isArray(page.relatedLinks) ? page.relatedLinks.map(link => ({ href: link.href })) : []),
    ...(Array.isArray(page.faq) ? page.faq.flatMap(markdownLinksFromValue) : [])
  ].filter(Boolean);

  for (const item of links) {
    const href = item.href || item;
    report.checks.links += 1;
    if (!isString(href)) continue;

    if (href.startsWith("/") && href.startsWith(`/apps/`)) {
      const [, appSlug, pagePart] = href.split("/").filter(Boolean);
      const resolvedApp = appSlug;
      if (!appMap.has(resolvedApp)) {
        addWarning(linkContext, "Link points to undocumented app", { href, page: pageSlug });
        continue;
      }
      if (isString(pagePart) && !appMap.get(resolvedApp)?.pages?.has(pagePart)) {
        addWarning(linkContext, "Link points to missing app page", { href, page: pageSlug });
      }
    }
  }

  const imageReport = { found: [], missing: [] };
  report.checks.images += 1;
  validateImageReferences(context, page, imageReport);
}

async function buildAppMap() {
  const entries = await fs.readdir(APPS_DIR, { withFileTypes: true });
  const map = new Map();

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pagesFile = path.join(APPS_DIR, entry.name, "pages.json");
      if (existsSync(pagesFile)) {
        const existing = map.get(entry.name) || {};
        map.set(entry.name, {
          ...existing,
          appJson: existing.appJson || null,
          appJsonPath: existing.appJsonPath || null,
          hasPages: true,
          pagesFile,
        });
      }

      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;

    const slug = entry.name.replace(/\.json$/i, "");
    const filePath = path.join(APPS_DIR, entry.name);
    const appJson = await readJson(filePath);

    const docDir = path.join(APPS_DIR, slug);
    const pagesFile = path.join(docDir, "pages.json");
    const hasPages = existsSync(pagesFile);

    map.set(slug, {
      ...map.get(slug),
      appJson,
      appJsonPath: filePath,
      hasPages,
      pagesFile,
    });
  }

  return map;
}

async function validateApp(appSlug, appData) {
  report.appsScanned += 1;
  const appContext = `apps/${appSlug}`;
  const { appJson, hasPages, pagesFile } = appData;

  if (!hasPages) {
    addWarning(appContext, "No documentation index found", "pages.json");
    return;
  }

  const pageIndex = await readJson(pagesFile);
  if (!pageIndex) {
    addError(appContext, "Failed to parse pages.json");
    return;
  }

  const isV1 = isString(pageIndex.documentationSchemaVersion) && /^1\./.test(pageIndex.documentationSchemaVersion);

  if (!isV1) {
    report.legacyApps += 1;
    addWarning(appContext, "Documentation index is not v1", {
      documentationSchemaVersion: pageIndex.documentationSchemaVersion || "missing"
    });
    return;
  }

  const validated = validateIndexSchema(appContext, pageIndex);
  if (!validated || !validated.slugs) {
    return;
  }

  if (isV1 && !Array.isArray(pageIndex.pages)) {
    return;
  }

  const indexPageMap = new Set();
  for (const item of validated.pages) {
    if (item && isString(item.slug)) {
      indexPageMap.add(normalizeSlug(item.slug));
    }
  }

  appMap.get(appSlug).pages = indexPageMap;

  const files = await fs.readdir(path.join(APPS_DIR, appSlug), { withFileTypes: true });
  const detailPaths = new Map();

  for (const file of files) {
    if (!file.isFile() || !VALID_PAGES_FILE_EXTENSIONS.has(path.extname(file.name)) || file.name === "pages.json") {
      continue;
    }

    const slug = file.name.replace(/\.json$/i, "");
    detailPaths.set(slug, path.join(APPS_DIR, appSlug, file.name));
    if (!indexPageMap.has(normalizeSlug(slug))) {
      addWarning(appContext, "Unreferenced documentation page file", {
        file: file.name
      });
    }
  }

  for (const page of validated.pages) {
    if (!isObject(page) || !isString(page.slug)) continue;

    const pageSlug = normalizeSlug(page.slug);
    const detailPath = detailPaths.get(pageSlug);
    if (!detailPath) {
      addError(appContext, `Missing detail file for page slug`, pageSlug);
      continue;
    }

    const detail = await readJson(detailPath);
    if (!detail) continue;

    readCache.set(detailPath, detail);
  }

  for (const [pageSlug, detailPath] of detailPaths.entries()) {
    if (!indexPageMap.has(pageSlug)) continue;
    const detail = readCache.get(detailPath);
    if (detail) {
      validateDetailPage(detailPath, pageSlug, appContext);
      report.checks.navigation += 1;
    }
  }

  const linksToCheck = Array.isArray(appJson?.documentationLinks) ? appJson.documentationLinks : [];
  if (linksToCheck.length > 0) {
    const linkedSlugs = new Set();
    for (const link of linksToCheck) {
      if (!isObject(link) || !isString(link.href)) continue;
      const match = /^\/apps\/[a-z0-9-]+\/([a-z0-9-]+)$/.exec(link.href);
      if (match) {
        linkedSlugs.add(match[1]);
      }
    }

    for (const requiredSlug of CORE_PAGES) {
      if (!linkedSlugs.has(requiredSlug)) {
        addWarning(appContext, `App overview does not link to core doc slug`, requiredSlug);
      }
    }
  } else if (appJson) {
    addWarning(appContext, "App overview has no documentationLinks");
  }
}

function printTextReport() {
  const lines = [];
  lines.push("BarkinMad Studios Documentation v1 Validation");
  lines.push("-------------------------------------");
  lines.push(`Apps scanned: ${report.appsScanned}`);
  lines.push(`Pages discovered: ${report.pagesFound}`);
  lines.push(`Legacy doc sets: ${report.legacyApps}`);
  lines.push(`Checks run: schema=${report.checks.schema}, navigation=${report.checks.navigation}, links=${report.checks.links}, images=${report.checks.images}, seo=${report.checks.seo}`);
  lines.push("");

  if (report.errors.length) {
    lines.push("Errors:");
    for (const issue of report.errors) {
      const details = issue.details !== null ? ` ${JSON.stringify(issue.details)}` : "";
      lines.push(`- [error] ${issue.context}: ${issue.message}${details}`);
    }
    lines.push("");
  }

  if (report.warnings.length) {
    lines.push("Warnings:");
    for (const issue of report.warnings) {
      const details = issue.details !== null ? ` ${JSON.stringify(issue.details)}` : "";
      lines.push(`- [warn] ${issue.context}: ${issue.message}${details}`);
    }
    lines.push("");
  }

  lines.push(`Result: ${report.errors.length ? "FAIL" : "PASS"}`);
  if (STRICT && report.warnings.length) {
    lines.push("Strict mode: warnings are treated as failures.");
  }

  return lines.join("\n");
}

validateDocumentationPlaceholder();

const appMap = await buildAppMap();
const readCache = new Map();

for (const [slug, data] of appMap.entries()) {
  await validateApp(slug, data);
}

if (report.errors.length === 0 && args.strict && report.warnings.length > 0) {
  const remainingWarnings = [];

  for (const warning of report.warnings) {
    if (warning.message === "No documentation index found" && warning.details === "pages.json") {
      remainingWarnings.push(warning);
      continue;
    }

    addError(warning.context, `Strict mode: ${warning.message}`, warning.details);
  }

  report.warnings.length = 0;
  report.warnings.push(...remainingWarnings);
}

if (args.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(printTextReport());
}

process.exitCode = report.errors.length ? 1 : 0;
