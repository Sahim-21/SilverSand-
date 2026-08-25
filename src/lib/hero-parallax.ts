/** Background scroll speed as a fraction of the document (50–70% band). */
export const HERO_PARALLAX_SPEED = 0.62;

/** Extra translateY = scrolled × lag, so the photo trails the copy. */
export const HERO_PARALLAX_LAG = 1 - HERO_PARALLAX_SPEED;

/** Cap so the shift stays a few centimetres, not a second viewport. */
export const HERO_PARALLAX_MAX_PX = 96;

/**
 * Parallax is off below this width. Transform-on-scroll is a common source
 * of mobile jank; the static hero crop is used instead.
 */
export const HERO_PARALLAX_MIN_WIDTH_PX = 768;

export function heroParallaxOffset(scrolledPx: number): number {
  if (scrolledPx <= 0) return 0;
  return Math.min(scrolledPx * HERO_PARALLAX_LAG, HERO_PARALLAX_MAX_PX);
}
