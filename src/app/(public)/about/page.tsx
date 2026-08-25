import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AboutSection } from "@/components/sections/about-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
import { BUSINESS_NAME } from "@/lib/business";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.about);

export default function AboutPage() {
  return (
    <>
      <InnerPageHero
        title={`About ${BUSINESS_NAME}`}
        description="A family-run homestay in Murudeshwar with one Deluxe AC Room. Direct booking on WhatsApp — no OTA, no middleman."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <AboutSection />
      <Section>
        <Container>
          <Stack gap="md" className="max-w-3xl">
            <Text tone="muted">
              Meals are not included and are not offered at the homestay. Check-in is at
              11:00 AM; check-out is at 11:00 AM the following day. Bookings are
              non-cancellable and non-refundable. A valid ID is required at check-in.
            </Text>
            <ContactCta />
          </Stack>
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
