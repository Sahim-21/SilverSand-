import assert from "node:assert/strict";
import { test } from "node:test";

import { formatInr } from "./estimate";
import { COUNT_INR_DURATION_MS, countInrFrame, easeOutCubic } from "../count-inr";

test("count duration sits in the 400–600ms band", () => {
  assert.ok(COUNT_INR_DURATION_MS >= 400);
  assert.ok(COUNT_INR_DURATION_MS <= 600);
});

test("ease-out cubic is slower than linear at the start and reaches 1", () => {
  assert.equal(easeOutCubic(0), 0);
  assert.equal(easeOutCubic(1), 1);
  assert.ok(easeOutCubic(0.25) > 0.25);
  assert.ok(easeOutCubic(0.5) > 0.5);
});

test("final count frame is the exact target, then formatInr matches the live estimate", () => {
  const target = 4_500;
  assert.equal(countInrFrame(0, target, 1), target);
  assert.equal(countInrFrame(2_000, target, 1), target);
  assert.equal(formatInr(countInrFrame(0, target, 1)), formatInr(target));
  assert.equal(countInrFrame(target, target, 0.4), target);
});

test("mid-count frames stay between from and to", () => {
  const from = 0;
  const to = 8_000;
  const mid = countInrFrame(from, to, 0.4);
  assert.ok(mid >= from && mid <= to);
  assert.notEqual(mid, to);
});

test("ease-out overtakes a linear interpolant in the first half", () => {
  const from = 0;
  const to = 8_000;
  const t = 0.25;
  const eased = countInrFrame(from, to, t);
  const linear = Math.round(from + (to - from) * t);
  assert.ok(eased > linear);
});

test("counting down still lands on the exact target", () => {
  const from = 8_000;
  const to = 4_500;
  assert.equal(countInrFrame(from, to, 1), to);
  assert.equal(formatInr(countInrFrame(from, to, 1)), formatInr(to));
});
