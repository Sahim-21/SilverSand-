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
        description="A single-property homestay in Murudeshwar. We publish only what the owner has confirmed."
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
