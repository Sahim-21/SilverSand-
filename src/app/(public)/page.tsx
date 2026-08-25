import type { Metadata } from "next";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { AboutSection } from "@/components/sections/about-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MapSection } from "@/components/sections/map-section";
import { MurudeshwarInfoSection } from "@/components/sections/murudeshwar-info-section";
import { NearbyAttractionsSection } from "@/components/sections/nearby-attractions-section";
import { PhotosSection } from "@/components/sections/photos-section";
import { PropertyIntroSection } from "@/components/sections/property-intro-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { RoomPricingSection } from "@/components/sections/room-pricing-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublicPricing } from "@/lib/pricing/fetch";
import { getAnsweredFaqs } from "@/lib/seo/faqs";
import { PAGE_SEO } from "@/lib/seo/copy";
import { faqPageJsonLd } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.home);

export default async function HomePage() {
  const pricing = await getPublicPricing();
  const faqLd = faqPageJsonLd(getAnsweredFaqs(pricing));

  return (
    <>
      <JsonLd data={faqLd} />
      <HeroSection />
      <PropertyIntroSection />
      <RevealOnScroll>
        <RoomPricingSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <PhotosSection band="canvas" />
      </RevealOnScroll>
      <RevealOnScroll>
        <AboutSection compact band="wash" />
      </RevealOnScroll>
      <ReviewsSection />
      <MurudeshwarInfoSection band="canvas" />
      <RevealOnScroll>
        <NearbyAttractionsSection band="wash" />
      </RevealOnScroll>
      <RevealOnScroll>
        <FaqSection />
      </RevealOnScroll>
      <MapSection band="wash" />
      <FinalCtaSection />
    </>
  );
}
