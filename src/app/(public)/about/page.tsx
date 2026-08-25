import type { Metadata } from "next";

import { ContactCta } from "@/components/marketing/contact-cta";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AboutSection } from "@/components/sections/about-section";
import { InnerPageHero } from "@/components/sections/inner-page-hero";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Stack } from "@/components/layout/stack";
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
            <TodoNotice
              item="meals"
              detail="Meals policy (whether food is available, on request, or included) is not yet confirmed (checklist #16). Do not assume breakfast is offered — Murudeshwar has restaurants nearby but we have not verified whether the host provides food."
            />
            <TodoNotice
              item="houseRules"
              detail="House rules including check-in/out times, ID requirements, and cancellation policy are not yet confirmed (checklist #21). These must come from the owner before they appear here."
            />
            <ContactCta />
          </Stack>
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
