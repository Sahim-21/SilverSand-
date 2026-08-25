import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ContactCta } from "@/components/marketing/contact-cta";
import { Heading, Text } from "@/components/ui/heading";
import { buttonVariants } from "@/components/ui/button";
import { PAGE_SEO } from "@/lib/seo/copy";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: PAGE_SEO.notFound.title,
  description: PAGE_SEO.notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container width="narrow">
          <Section>
            <Stack gap="lg">
              <Heading as="h1" size="display">
                Page not found
              </Heading>
              <Text tone="muted">
                That URL is not on this site. Head home for the homestay in Murudeshwar,
                or message us on WhatsApp about dates.
              </Text>
              <Link href="/" className={cn(buttonVariants(), "w-fit")}>
                Back to Home
              </Link>
              <ContactCta layout="stack" />
            </Stack>
          </Section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
