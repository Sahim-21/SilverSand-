import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const SRC_ROOT = join(process.cwd(), "src");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    if (!/\.(ts|tsx)$/.test(name)) continue;
    if (name.endsWith(".test.ts") || name.endsWith(".test.tsx")) continue;
    out.push(full);
  }
  return out;
}

const LITERAL_RATE_FIELD =
  /\b(nightlyRateInr|extraBedRateInr)\s*[:=]\s*\d+/;
const NAMED_PRICE_CONST =
  /\b(?:const|let)\s+(?:RATE|PRICE|FALLBACK|DEFAULT_RATE)_\w*\s*=\s*\d{3,}/;
const RUPEE_AMOUNT = /₹\s*[\d,]+/;

const ALLOWED_RUPEE = [
  /₹99,999/,
  /₹9,999/,
  /₹ \/ night/,
  /₹ 0 1 2 3 4 5 6 7 8 9/,
];

test("src/ has no hardcoded occupancy or extra-bed rupee amounts", () => {
  const violations: string[] = [];

  for (const file of walk(SRC_ROOT)) {
    const rel = relative(process.cwd(), file);
    const source = readFileSync(file, "utf8");
    const lines = source.split("\n");

    lines.forEach((line, index) => {
      const loc = `${rel}:${index + 1}`;
      if (LITERAL_RATE_FIELD.test(line)) {
        violations.push(`${loc} literal rate field — ${line.trim()}`);
      }
      if (NAMED_PRICE_CONST.test(line)) {
        violations.push(`${loc} named price constant — ${line.trim()}`);
      }
      if (RUPEE_AMOUNT.test(line) && !ALLOWED_RUPEE.some((re) => re.test(line))) {
        violations.push(`${loc} rupee amount in source — ${line.trim()}`);
      }
    });
  }

  assert.deepEqual(violations, [], violations.join("\n"));
});

test("admin write and public read use the same rooms + occupancy_prices fields", () => {
  const publicFetch = readFileSync(
    join(SRC_ROOT, "lib/pricing/fetch.ts"),
    "utf8",
  );
  const adminWrite = readFileSync(
    join(SRC_ROOT, "app/api/admin/pricing/route.ts"),
    "utf8",
  );
  const adminRead = readFileSync(
    join(SRC_ROOT, "lib/pricing/admin-fetch.ts"),
    "utf8",
  );

  for (const [label, source] of [
    ["getPublicPricing", publicFetch],
    ["PATCH /api/admin/pricing", adminWrite],
    ["getAdminPricing", adminRead],
  ] as const) {
    assert.match(source, /from ["']@\/db\/schema["']/, `${label} must import schema`);
    assert.match(source, /\brooms\b/, `${label} must touch rooms`);
    assert.match(source, /\boccupancyPrices\b/, `${label} must touch occupancyPrices`);
    assert.match(source, /\bextraBedRateInr\b/, `${label} must use extraBedRateInr`);
    assert.match(source, /\bnightlyRateInr\b/, `${label} must use nightlyRateInr`);
  }
});
