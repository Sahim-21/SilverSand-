import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { RoomsListSection } from "@/components/sections/rooms-list-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { BUSINESS_NAME } from "@/lib/business";

export const metadata: Metadata = {
  title: "Rooms",
  description: `Rooms at ${BUSINESS_NAME}, Murudeshwar. One Deluxe AC Room with occupancy-based pricing.`,
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <InnerPageHero
        title="Rooms"
        description="We offer one room type — the Deluxe AC Room — priced by how many guests share it. Rates are set by the owner and shown when published."
      />
      <RoomsListSection />
      <Section>
        <Container>
          <ContactCta />
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
