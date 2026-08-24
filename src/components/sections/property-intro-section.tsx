import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME } from "@/lib/business";
import { TodoNotice } from "@/components/marketing/todo-notice";

export function PropertyIntroSection() {
  return (
    <Section>
      <Container>
        <Stack gap="md" className="max-w-3xl">
          <Heading as="h2" size="section">
            A homestay, not a hotel chain
          </Heading>
          <Text tone="muted">
            {BUSINESS_NAME} is a single-property homestay in Murudeshwar. We offer
            one room type — the Deluxe AC Room — priced by how many guests share it
            (2, 3, 4, 6, or 8). That keeps groups and families on one bill instead
            of booking multiple OTA rooms.
          </Text>
          <Text size="sm" tone="muted">
            We are not listing amenities, bed layout, or beach distance until the
            owner confirms them. What you see on this site is what we can stand
            behind today.
          </Text>
          <TodoNotice
            item="bedsBath"
            detail="Bed count, bathroom layout, and AC coverage for 6–8 sharing are not published yet (checklist #3)."
          />
        </Stack>
      </Container>
    </Section>
  );
}
