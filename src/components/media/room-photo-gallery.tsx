"use client";

import { PhotoLightboxProvider } from "@/components/media/photo-lightbox";
import { OCCUPANCY_TIERS } from "@/lib/business";
import type { LightboxSlide } from "@/lib/images/lightbox";
import { ROOM_STATIC } from "@/lib/images/room-statics";
import { OCCUPANCY_IMAGES } from "@/lib/rooms/occupancy-images";
import type { ReactNode } from "react";

export const ROOM_LIGHTBOX_SLIDES: LightboxSlide[] = OCCUPANCY_TIERS.map((tier) => ({
  src: ROOM_STATIC[tier],
  alt: OCCUPANCY_IMAGES[tier].alt,
  caption: `${tier} sharing`,
}));

export function RoomPhotoGallery({ children }: { children: ReactNode }) {
  return (
    <PhotoLightboxProvider slides={ROOM_LIGHTBOX_SLIDES} label="Deluxe AC Room photos">
      {children}
    </PhotoLightboxProvider>
  );
}
