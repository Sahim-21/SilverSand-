import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { BookingWidgetPlaceholder } from "@/components/booking-widget-placeholder";
import { ContactCta } from "@/components/marketing/contact-cta";
import { Heading, Text } from "@/components/ui/heading";
import { ROOM_NAME } from "@/lib/business";

export function RoomPageHero() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <Stack gap="lg">
            <div>
              <Heading as="h1" size="display">
                {ROOM_NAME}
              </Heading>
              <Text tone="muted" className="mt-4 max-w-prose">
                Our only room type. Nightly rate depends on how many guests share the
                room (2, 3, 4, 6, or 8). Extra beds are charged per person when
                offered — the current rate is set by the owner in the admin panel.
              </Text>
            </div>
            <ContactCta layout="stack" className="max-w-md lg:hidden" />
          </Stack>
          <BookingWidgetPlaceholder />
        </div>
        <ContactCta className="mt-10 hidden max-w-xl lg:flex" />
      </Container>
    </section>
  );
}
