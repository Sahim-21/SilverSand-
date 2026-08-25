import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { RoomsListSection } from "@/components/sections/rooms-list-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PAGE_SEO } from "@/lib/seo/copy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata(PAGE_SEO.rooms);

export default function RoomsPage() {
  return (
    <>
      <InnerPageHero
        title="Rooms at Silver Sand"
        description="One room type — the Deluxe AC Room, air-conditioned, priced by occupancy."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/rooms", label: "Rooms" },
        ]}
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
