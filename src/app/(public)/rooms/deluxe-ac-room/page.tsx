import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PhotosSection } from "@/components/sections/photos-section";
import { RoomLayoutSection } from "@/components/sections/room-layout-section";
import { RoomPageHero } from "@/components/sections/room-page-hero";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.room);

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
