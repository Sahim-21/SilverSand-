import Image from "next/image";

import { BookingWidget } from "@/components/booking/booking-widget";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME, BUSINESS_PLACE } from "@/lib/business";

const HERO_IMAGE = {
  src: "/images/hero-murudeshwar-coast.jpg",
  alt: "A tranquil sunset over a tropical beach in Murudeshwar, with silhouetted palm trees leaning over a sandy shore, gentle waves, and a golden-orange sky",
} as const;

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 100vw"
        quality={85}
        className="object-cover object-center"
      />
      {/* Mangrove / near-black wash so sand-tone copy and the booking CTAs stay readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-mangrove-deep/92 via-mangrove-deep/78 to-mangrove/55"
      />

      <Container className="relative z-10 py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <Stack gap="lg">
            <div>
              <Text
                size="sm"
                className="font-medium tracking-wide text-gold-muted"
              >
                {BUSINESS_PLACE}
              </Text>
              <Heading as="h1" size="display" className="mt-2 text-sand">
                Homestay in Murudeshwar
              </Heading>
              <Text className="mt-4 max-w-prose text-sand/85">
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
