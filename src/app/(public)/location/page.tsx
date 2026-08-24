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
import { BUSINESS_NAME, BUSINESS_PLACE } from "@/lib/business";

export const metadata: Metadata = {
  title: "Location",
  description: `How to find ${BUSINESS_NAME} in Murudeshwar, Karnataka. Map and directions when the owner provides a confirmed pin.`,
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  return (
    <>
      <InnerPageHero
        title="Location"
        description={`${BUSINESS_NAME} — ${BUSINESS_PLACE}. Street address and driving directions will be added when the owner confirms them.`}
      />
      <MapSection showLocationLink={false} />
      <Section>
        <Container>
          <Stack gap="md" className="max-w-3xl">
            <Text tone="muted">
              We have not published walking or driving times from our homestay to
              the beach, temple, bus stand, or railway station until the owner
              shares a map pin and measured distances.
            </Text>
            <TodoNotice item="address" />
            <TodoNotice
              item="landmarkDistances"
              detail="Distances to Murudeshwar Beach, temple, bus stand, and railway station are pending (checklist #8)."
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
