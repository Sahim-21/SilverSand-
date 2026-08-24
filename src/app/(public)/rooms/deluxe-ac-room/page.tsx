import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PhotosSection } from "@/components/sections/photos-section";
import { RoomLayoutSection } from "@/components/sections/room-layout-section";
import { RoomPageHero } from "@/components/sections/room-page-hero";
import { BUSINESS_NAME, ROOM_NAME, ROOM_PATH } from "@/lib/business";

export const metadata: Metadata = {
  title: ROOM_NAME,
  description:
    `${ROOM_NAME} at ${BUSINESS_NAME}, Murudeshwar. Occupancy pricing for 2, 3, 4, 6, or 8 sharing plus extra bed.`,
  alternates: { canonical: ROOM_PATH },
};

export default function DeluxeAcRoomPage() {
  return (
    <>
      <RoomPageHero />
      <RoomLayoutSection />
      <PhotosSection />
      <FinalCtaSection />
    </>
  );
}
