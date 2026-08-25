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
            Ready to check dates?
          </Heading>
          <Text className="text-sand/85">
            Send your travel dates and how many guests will share the Deluxe AC Room. We
            reply on WhatsApp with availability and an estimate from our published
            rates.
          </Text>
          <ContactCta layout="stack" className="max-w-md" />
        </Stack>
      </Container>
    </Section>
  );
}
