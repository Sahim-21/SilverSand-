import { BookingWidget } from "@/components/booking/booking-widget";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { ROOM_NAME, ROOM_PATH } from "@/lib/business";

export function RoomPageHero() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <Stack gap="lg">
            <div>
              <Breadcrumbs
                items={[
                  { href: "/", label: "Home" },
                  { href: "/rooms", label: "Rooms" },
                  { href: ROOM_PATH, label: ROOM_NAME },
                ]}
              />
              <Heading as="h1" size="display" className="mt-3">
                {ROOM_NAME}
              </Heading>
              <Text tone="muted" className="mt-4 max-w-prose">
                Our only room type, priced by occupancy — how many guests share the room
                sets the nightly rate. Suitable for couples, families, and groups of up
                to eight. The room is air-conditioned. An extra bed can be added up to
                eight guests; the per-person nightly charge is in the booking widget.
              </Text>
            </div>
          </Stack>
          <div className="lg:sticky lg:top-6">
            <BookingWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}
