import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { MapSection } from "@/components/sections/map-section";
import { MurudeshwarInfoSection } from "@/components/sections/murudeshwar-info-section";
import { NearbyAttractionsSection } from "@/components/sections/nearby-attractions-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Stack } from "@/components/layout/stack";
import { Text } from "@/components/ui/heading";
import { BUSINESS_NAME, FULL_ADDRESS } from "@/lib/business";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.location);

export default function LocationPage() {
  return (
    <>
      <InnerPageHero
        title="Getting to Murudeshwar"
        description={`${BUSINESS_NAME} is at ${FULL_ADDRESS}. Murdeshwar Railway Station is on the Konkan Railway.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/location", label: "Location" },
        ]}
      />
      <MapSection showLocationLink={false} />
      <Section>
        <Container>
          <Stack gap="md" className="max-w-3xl">
            <Text tone="muted">
              Murudeshwar is on the Konkan Railway — the quickest route from most major
              cities. Nearest airport is Hubli (roughly 3–4 hours by road) or Mangalore
              (roughly 2 hours). Once you arrive at Murdeshwar station, auto-rickshaws
              run to most parts of town.
            </Text>
            <Text size="sm" tone="muted">
              We have not published walking or driving times from our homestay to the
              beach, temple, bus stand, or railway station.
            </Text>
            <TodoNotice
              item="landmarkDistances"
              detail="Distances to the beach, temple, bus stand, and railway station are not published yet (checklist #8)."
            />
          </Stack>
        </Container>
      </Section>
      <MurudeshwarInfoSection />
      <NearbyAttractionsSection />
      <Section>
        <Container>
          <ContactCta whatsappLabel="Ask for directions on WhatsApp" />
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
