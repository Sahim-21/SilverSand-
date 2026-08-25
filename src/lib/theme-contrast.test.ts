import assert from "node:assert/strict";
import { test } from "node:test";

/** WCAG 2 relative luminance + contrast for token pairs we ship. */
function srgbChannel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}

function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

const AA_BODY = 4.5;
const AA_LARGE = 3;

const light = {
  sand: "#f4efe6",
  sandDeep: "#e8dfd0",
  surface: "#fffcf7",
  ink: "#1c1914",
  muted: "#5e574c",
  mangrove: "#1a2b24",
  mangroveDeep: "#121c18",
  gold: "#c4a35a",
  goldMuted: "#d4b56a",
} as const;

const dark = {
  page: "#121c18",
  surface: "#1e2c26",
  ink: "#f4efe6",
  muted: "#c9bfb0",
  mangroveFg: "#d4b56a",
  mangrove: "#1a2b24",
  mangroveDeep: "#121c18",
  gold: "#c4a35a",
  danger: "#e07068",
} as const;

test("light-mode body, muted, and mangrove-panel text meet WCAG AA", () => {
  assert.ok(contrastRatio(light.ink, light.sand) >= AA_BODY);
  assert.ok(contrastRatio(light.muted, light.sand) >= AA_BODY);
  assert.ok(contrastRatio(light.ink, light.surface) >= AA_BODY);
  assert.ok(contrastRatio(light.ink, light.sandDeep) >= AA_BODY);
  assert.ok(contrastRatio(light.sand, light.mangrove) >= AA_BODY);
  assert.ok(contrastRatio(light.goldMuted, light.mangrove) >= AA_LARGE);
  assert.ok(contrastRatio(light.mangrove, light.gold) >= AA_BODY);
});

test("dark-mode page, surface, pricing cards, and mangrove-fg meet WCAG AA", () => {
  assert.ok(contrastRatio(dark.ink, dark.page) >= AA_BODY);
  assert.ok(contrastRatio(dark.muted, dark.page) >= AA_BODY);
  assert.ok(contrastRatio(dark.ink, dark.surface) >= AA_BODY);
  assert.ok(contrastRatio(dark.muted, dark.surface) >= AA_BODY);
  assert.ok(contrastRatio(dark.mangroveFg, dark.surface) >= AA_BODY);
  assert.ok(contrastRatio(dark.mangroveFg, dark.page) >= AA_BODY);
  assert.ok(contrastRatio(dark.ink, dark.mangrove) >= AA_BODY);
  assert.ok(contrastRatio(dark.gold, dark.mangrove) >= AA_LARGE);
  assert.ok(contrastRatio(dark.mangrove, dark.gold) >= AA_BODY);
  assert.ok(contrastRatio(dark.danger, dark.surface) >= AA_BODY);
});

test("hero overlay (mangrove-deep) keeps sand-coloured type above AA", () => {
  assert.ok(contrastRatio(light.sand, light.mangroveDeep) >= AA_BODY);
  assert.ok(contrastRatio(light.goldMuted, light.mangroveDeep) >= AA_LARGE);
  assert.ok(contrastRatio(dark.ink, dark.mangroveDeep) >= AA_BODY);
  assert.ok(contrastRatio(dark.mangroveFg, dark.mangroveDeep) >= AA_BODY);
});
