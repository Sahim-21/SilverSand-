import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { PhotosSection } from "@/components/sections/photos-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { BUSINESS_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photographs of ${BUSINESS_NAME}, Murudeshwar. Real owner photos will replace placeholders.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <InnerPageHero
        title="Gallery"
        description="Real photographs from the owner will appear here. We do not use stock villa images or OTA scrapes."
      />
      <PhotosSection showGalleryLink={false} />
      <Section>
        <Container>
          <ContactCta whatsappLabel="Ask about photos on WhatsApp" />
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
