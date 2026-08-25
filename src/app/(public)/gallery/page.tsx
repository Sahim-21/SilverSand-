import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { PhotosSection } from "@/components/sections/photos-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { ROOM_BOOKING_HREF } from "@/lib/booking/anchor";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.gallery);

export default function GalleryPage() {
  return (
    <>
      <InnerPageHero
        title="Gallery"
        description="Photographs of the Deluxe AC Room by occupancy. We do not use stock villa images or OTA scrapes."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/gallery", label: "Gallery" },
        ]}
      />
      <PhotosSection showGalleryLink={false} bookingHref={ROOM_BOOKING_HREF} />
      <Section>
        <Container>
          <ContactCta whatsappLabel="Ask about photos on WhatsApp" />
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
