import { BookingWidget } from "@/components/booking/booking-widget";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME, BUSINESS_PLACE } from "@/lib/business";

export function HeroSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <Stack gap="lg">
            <div>
              <Text size="sm" className="font-medium tracking-wide text-mangrove">
                {BUSINESS_PLACE}
              </Text>
              <Heading as="h1" size="display" className="mt-2">
                Homestay in Murudeshwar
              </Heading>
              <Text tone="muted" className="mt-4 max-w-prose">
                {BUSINESS_NAME} is a homestay in Murudeshwar — one Deluxe AC Room,
                priced by how many guests share it. Book direct on WhatsApp; the host
                confirms availability and your rate before you travel.
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
