import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MapSection } from "@/components/sections/map-section";
import { MurudeshwarInfoSection } from "@/components/sections/murudeshwar-info-section";
import { NearbyAttractionsSection } from "@/components/sections/nearby-attractions-section";
import { PhotosSection } from "@/components/sections/photos-section";
import { PropertyIntroSection } from "@/components/sections/property-intro-section";
import { RoomPricingSection } from "@/components/sections/room-pricing-section";
import { BUSINESS_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: "Homestay in Murudeshwar",
  description:
    `${BUSINESS_NAME} in Murudeshwar, Karnataka. One Deluxe AC Room, occupancy-based pricing, book direct on WhatsApp.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PropertyIntroSection />
      <RoomPricingSection />
      <PhotosSection />
      <AboutSection compact />
      <MurudeshwarInfoSection />
      <NearbyAttractionsSection />
      <FaqSection />
      <MapSection />
      <FinalCtaSection />
    </>
  );
}
