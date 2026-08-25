import type { StaticImageData } from "next/image";

/** Open/close fade+scale. 200–300ms band; not a hover/press token. */
export const LIGHTBOX_DURATION_MS = 250;

/** Horizontal pointer travel before a swipe changes slides. */
export const LIGHTBOX_SWIPE_PX = 48;

export type LightboxSlide = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

export function wrapGalleryIndex(index: number, length: number, delta: number): number {
  if (length <= 0) return 0;
  return (((index + delta) % length) + length) % length;
}
