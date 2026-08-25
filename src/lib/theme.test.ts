import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "./theme";

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

const HEX = /#[0-9a-fA-F]{3,8}\b/;

const ALLOWED_HEX_FILES = new Set([
  "src/app/opengraph-image.tsx",
  "src/app/(public)/style-guide/page.tsx",
]);

test("theme init script follows system then persists an explicit choice", () => {
  assert.ok(THEME_INIT_SCRIPT.includes(THEME_STORAGE_KEY));
  assert.ok(THEME_INIT_SCRIPT.includes("prefers-color-scheme: dark"));
  assert.ok(THEME_INIT_SCRIPT.includes('classList.toggle("dark"'));
});

test("globals.css remaps canvas tokens under html.dark without inverting pigments", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  assert.ok(css.includes("@custom-variant dark"));
  assert.ok(css.includes("html.dark"));
  assert.ok(css.includes("--background: var(--mangrove-deep)"));
  assert.ok(css.includes("--mangrove-fg: var(--gold-muted)"));

  const darkBlock = css.split("html.dark")[1]?.split("@theme")[0] ?? "";
  assert.match(darkBlock, /--ink:\s*var\(--sand\)/);
  assert.doesNotMatch(darkBlock, /--sand:/);
  assert.doesNotMatch(darkBlock, /--mangrove:/);
  assert.doesNotMatch(darkBlock, /--gold:/);
});

test("tsx files do not hardcode hex colours (except OG image and style-guide labels)", () => {
  const violations: string[] = [];

  for (const file of walk(SRC_ROOT)) {
    const rel = relative(process.cwd(), file);
    if (ALLOWED_HEX_FILES.has(rel)) continue;
    if (rel.endsWith("globals.css")) continue;
    const source = readFileSync(file, "utf8");
    const lines = source.split("\n");
    lines.forEach((line, index) => {
      if (HEX.test(line)) {
        violations.push(`${rel}:${index + 1} ${line.trim()}`);
      }
    });
  }

  assert.deepEqual(violations, [], violations.join("\n"));
});
