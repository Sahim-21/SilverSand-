import assert from "node:assert/strict";
import { test } from "node:test";

import { clampIsoDateToMin, earliestCheckOutIso, normalizeCheckOutIso } from "./dates";

test("earliest check-out is the morning after check-in", () => {
  assert.equal(earliestCheckOutIso("2026-08-25"), "2026-08-26");
  assert.equal(earliestCheckOutIso("2026-08-31"), "2026-09-01");
});

test("check-out cannot precede or equal check-in", () => {
  assert.equal(normalizeCheckOutIso("2026-08-25", "2026-08-24"), "2026-08-26");
  assert.equal(normalizeCheckOutIso("2026-08-25", "2026-08-25"), "2026-08-26");
  assert.equal(normalizeCheckOutIso("2026-08-25", ""), "2026-08-26");
  assert.equal(normalizeCheckOutIso("2026-08-25", "2026-08-28"), "2026-08-28");
});

test("check-in cannot be before the minimum calendar day", () => {
  assert.equal(clampIsoDateToMin("2026-08-20", "2026-08-25"), "2026-08-25");
  assert.equal(clampIsoDateToMin("2026-08-26", "2026-08-25"), "2026-08-26");
});
