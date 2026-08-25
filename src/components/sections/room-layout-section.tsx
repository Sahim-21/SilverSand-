import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { OccupancyPricing } from "@/components/marketing/occupancy-pricing";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Heading, Text } from "@/components/ui/heading";

export function RoomLayoutSection() {
  return (
    <Section className="bg-sand-deep/40">
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Layout &amp; pricing
            </Heading>
            <Text tone="muted" className="mt-2">
              Occupancy rates below are loaded from the admin panel when published. We
              do not hardcode nightly prices on this site.
            </Text>
          </div>
          <OccupancyPricing />
          <TodoNotice
            item="bedsBath"
            detail="Bed count, bathroom layout, and AC coverage for 6–8 sharing are not published yet (checklist #3)."
          />
        </Stack>
      </Container>
    </Section>
  );
}
