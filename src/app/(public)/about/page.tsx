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

export const metadata: Metadata = {
  title: "About",
  description: `About ${BUSINESS_NAME} — a homestay in Murudeshwar focused on direct WhatsApp and phone bookings.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <InnerPageHero
        title={`About ${BUSINESS_NAME}`}
        description="A single-property homestay in Murudeshwar. We publish only what the owner has confirmed."
      />
      <AboutSection />
      <Section>
        <Container>
          <Stack gap="md" className="max-w-3xl">
            <TodoNotice
              item="meals"
              detail="Meals policy (none / on request / included) not yet provided (checklist #16)."
            />
            <TodoNotice
              item="houseRules"
              detail="House rules and ID requirements not yet provided (checklist #21)."
            />
            <ContactCta />
          </Stack>
        </Container>
      </Section>
      <FinalCtaSection />
    </>
  );
}
