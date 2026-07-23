#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const EXPECTED_UNITY_DIRECT = "unity.com, 7551469, DIRECT, 96cabb5fbdde37a7";
const WORKER_PATH = new URL("../worker.js", import.meta.url);
const FIXTURE_PATH = new URL("./fixtures/unity-app-ads-sellers.txt", import.meta.url);

function canonicalRecord(line) {
  const fields = line.split(",").map((field) => field.trim());
  fields[0] = fields[0].toLowerCase();
  return fields.join(", ");
}

function parseRecords(body, label) {
  const errors = [];
  if (/<!doctype|<html(?:\s|>)/i.test(body)) errors.push(`${label}: contains HTML output`);
  if (/^\s*[\[{]/.test(body)) errors.push(`${label}: contains JSON output`);
  if (!body.endsWith("\n")) errors.push(`${label}: does not end with a newline`);

  const lines = body.split(/\r?\n/);
  if (lines.at(-1) === "") lines.pop();

  const records = [];
  const seen = new Set();
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (!line.trim()) {
      errors.push(`${label}: line ${lineNumber} is empty or whitespace-only`);
      return;
    }
    if (line !== line.trim()) errors.push(`${label}: line ${lineNumber} has leading or trailing whitespace`);

    const fields = line.split(",").map((field) => field.trim());
    if (fields.length !== 3 && fields.length !== 4) {
      errors.push(`${label}: line ${lineNumber} has ${fields.length} fields; expected 3 or 4`);
      return;
    }
    if (!fields[0]) errors.push(`${label}: line ${lineNumber} is missing an advertising-system domain`);
    if (!fields[1]) errors.push(`${label}: line ${lineNumber} is missing a publisher account ID`);
    if (fields[2] !== "DIRECT" && fields[2] !== "RESELLER") {
      errors.push(`${label}: line ${lineNumber} has invalid relationship ${fields[2] || "(empty)"}`);
    }

    if (seen.has(line)) errors.push(`${label}: line ${lineNumber} duplicates a complete record`);
    seen.add(line);
    records.push({ line, fields });
  });

  return { errors, records };
}

function extractTemplateLiteral(source, variableName) {
  const declaration = `var ${variableName} = \``;
  const start = source.indexOf(declaration);
  if (start === -1) throw new Error(`Could not find ${variableName} in worker.js`);
  const valueStart = start + declaration.length;
  const valueEnd = source.indexOf("\`;", valueStart);
  if (valueEnd === -1) throw new Error(`Could not find the end of ${variableName} in worker.js`);
  return source.slice(valueStart, valueEnd);
}

export function validateAppAds(body, requiredSellerList) {
  const parsed = parseRecords(body, "app-ads.txt");
  const required = parseRecords(requiredSellerList, "Unity seller fixture");
  const errors = [...parsed.errors, ...required.errors];

  const actualByCanonicalRecord = new Set(parsed.records.map(({ line }) => canonicalRecord(line)));
  for (const { line } of required.records) {
    if (!actualByCanonicalRecord.has(canonicalRecord(line))) {
      errors.push(`app-ads.txt: missing supplied seller record ${line}`);
    }
  }

  const unityRecords = parsed.records.filter(({ fields }) => fields[0].toLowerCase() === "unity.com");
  if (!unityRecords.some(({ line }) => canonicalRecord(line) === EXPECTED_UNITY_DIRECT)) {
    errors.push("app-ads.txt: missing required Unity direct record");
  }
  if (unityRecords.some(({ fields }) => fields[1] !== "7551469")) {
    errors.push("app-ads.txt: incorrect Unity direct publisher ID");
  }
  if (unityRecords.some(({ fields }) => fields.length !== 4 || fields[3] !== "96cabb5fbdde37a7")) {
    errors.push("app-ads.txt: incorrect Unity certification authority ID");
  }
  if (unityRecords.some(({ fields }) => fields[2] === "RESELLER" && fields[1] === "7551469")) {
    errors.push("app-ads.txt: required Unity record is incorrectly marked RESELLER");
  }

  return errors;
}

async function main() {
  const source = await readFile(WORKER_PATH, "utf8");
  const appAds = extractTemplateLiteral(source, "APP_ADS_TXT");
  const requiredSellerList = await readFile(FIXTURE_PATH, "utf8");
  const errors = validateAppAds(appAds, requiredSellerList);

  const urlIndex = process.argv.indexOf("--url");
  if (urlIndex !== -1) {
    const url = process.argv[urlIndex + 1];
    if (!url) throw new Error("--url requires a value");
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "";
    const responseBody = await response.text();

    if (response.status !== 200) errors.push(`route: expected HTTP 200, received ${response.status}`);
    if (!contentType.toLowerCase().startsWith("text/plain")) errors.push(`route: expected text/plain content type, received ${contentType || "(missing)"}`);
    if (responseBody !== appAds) errors.push("route: response does not match canonical APP_ADS_TXT content");
    errors.push(...validateAppAds(responseBody, requiredSellerList).map((error) => `route: ${error}`));
  }

  if (errors.length) {
    for (const error of errors) console.error(`FAIL: ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`app-ads.txt validation passed (${appAds.split("\n").filter(Boolean).length} records)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
