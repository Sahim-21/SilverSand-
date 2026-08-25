"use client";

import { PhotoLightboxProvider } from "@/components/media/photo-lightbox";
import { ATTRACTION_IMAGES } from "@/lib/attractions/images";
import { ATTRACTION_STATIC } from "@/lib/images/attraction-statics";
import type { LightboxSlide } from "@/lib/images/lightbox";
import { nearbyAttractions } from "@/lib/site-content";
import type { ReactNode } from "react";

export const ATTRACTION_LIGHTBOX_SLIDES: LightboxSlide[] = nearbyAttractions.flatMap(
  (place) => {
    const image = ATTRACTION_IMAGES[place.name];
    const src = image ? ATTRACTION_STATIC[image.src] : undefined;
    if (!image || !src) return [];
    return [
      {
        src,
        alt: image.alt,
        caption: place.name,
      },
    ];
  },
);

export function AttractionPhotoGallery({ children }: { children: ReactNode }) {
  return (
    <PhotoLightboxProvider
      slides={ATTRACTION_LIGHTBOX_SLIDES}
      label="Nearby attraction photos"
    >
      {children}
    </PhotoLightboxProvider>
  );
}
