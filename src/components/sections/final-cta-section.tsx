import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { ContactCta } from "@/components/marketing/contact-cta";
import { Heading, Text } from "@/components/ui/heading";

export function FinalCtaSection() {
  return (
    <Section className="bg-mangrove text-sand">
      <Container>
        <Stack gap="md" className="max-w-2xl">
          <Heading as="h2" size="section" className="text-gold-muted">
            Check your dates
          </Heading>
          <Text className="text-sand/85">
            Send us your travel dates and how many guests will share the room. We reply
            on WhatsApp with availability and the rate for your group — no booking-site
            fee, just the host.
          </Text>
          <ContactCta layout="stack" className="max-w-md" />
        </Stack>
      </Container>
    </Section>
  );
}
