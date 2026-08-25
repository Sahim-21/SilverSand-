import assert from "node:assert/strict";
import { test } from "node:test";

import { clampExtraBeds, maxExtraBeds } from "./guest-cap";

test("extra beds fill remaining places up to the room cap", () => {
  assert.equal(maxExtraBeds(2, 8), 6);
  assert.equal(maxExtraBeds(3, 8), 5);
  assert.equal(maxExtraBeds(4, 8), 4);
  assert.equal(maxExtraBeds(6, 8), 2);
  assert.equal(maxExtraBeds(8, 8), 0);
});

test("occupancy of 8 cannot add extra beds", () => {
  assert.equal(clampExtraBeds(8, 1, 8), 0);
  assert.equal(clampExtraBeds(8, 8, 8), 0);
});

test("extra beds over the remaining places are clamped", () => {
  assert.equal(clampExtraBeds(6, 5, 8), 2);
  assert.equal(clampExtraBeds(2, 0, 8), 0);
  assert.equal(clampExtraBeds(2, -1, 8), 0);
});
