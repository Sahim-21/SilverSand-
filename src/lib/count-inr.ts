/** Stay-total count duration (400–600ms). Not a hover/press token. */
export const COUNT_INR_DURATION_MS = 500;

/** Ease-out cubic — not linear. */
export function easeOutCubic(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return 1 - (1 - x) ** 3;
}

/**
 * Rupee integer shown on one animation frame.
 * `t >= 1` returns `to` exactly (no extra rounding of the live estimate).
 */
export function countInrFrame(from: number, to: number, t: number): number {
  if (t >= 1) return to;
  if (t <= 0) return from;
  return Math.round(from + (to - from) * easeOutCubic(t));
}
