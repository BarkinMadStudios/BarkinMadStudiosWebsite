import assert from "node:assert/strict";
import { validateAppAds } from "./validate-app-ads-txt.mjs";

const unityDirect = "unity.com, 7551469, DIRECT, 96cabb5fbdde37a7";

function expectError(body, expectedMessage) {
  const errors = validateAppAds(body, `${unityDirect}\n`);
  assert.ok(
    errors.some((error) => error.includes(expectedMessage)),
    `Expected "${expectedMessage}" in: ${errors.join("; ")}`
  );
}

assert.deepEqual(validateAppAds(`${unityDirect}\n`, `${unityDirect}\n`), []);
expectError(`${unityDirect}\n \n`, "empty or whitespace-only");
expectError("unity.com, 7551469, DIRECT, 96cabb5fbdde37a7, unexpected\n", "expected 3 or 4");
expectError(", 7551469, RESELLER\n", "missing an advertising-system domain");
expectError("example.com, , RESELLER\n", "missing a publisher account ID");
expectError("example.com, publisher, INVALID\n", "invalid relationship");
expectError(`${unityDirect}\n${unityDirect}\n`, "duplicates a complete record");
expectError("<html>not an ads inventory</html>\n", "contains HTML output");
expectError("{}\n", "contains JSON output");
expectError("example.com, publisher, RESELLER\n", "missing required Unity direct record");
expectError("unity.com, wrong-id, DIRECT, 96cabb5fbdde37a7\n", "incorrect Unity direct publisher ID");
expectError("unity.com, 7551469, DIRECT, wrong-cert\n", "incorrect Unity certification authority ID");
expectError("unity.com, 7551469, RESELLER, 96cabb5fbdde37a7\n", "incorrectly marked RESELLER");

console.log("app-ads.txt validator tests passed");
