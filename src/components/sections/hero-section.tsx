import { BookingWidget } from "@/components/booking/booking-widget";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { HeroParallax } from "@/components/sections/hero-parallax";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import { TokenImage } from "@/components/ui/token-image";
import { BOOKING_HASH } from "@/lib/booking/anchor";
import { BUSINESS_NAME, BUSINESS_PLACE } from "@/lib/business";
import { cn } from "@/lib/utils";

import heroCoast from "../../../public/images/hero-murudeshwar-coast.jpg";

const HERO_ALT =
  "A tranquil sunset over a tropical beach in Murudeshwar, with silhouetted palm trees leaning over a sandy shore, gentle waves, and a golden-orange sky";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden" data-ss-hero="">
      <div className="hero-media pointer-events-none absolute inset-0">
        <HeroParallax>
          <TokenImage
            src={heroCoast}
            alt={HERO_ALT}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={85}
            slotClassName="h-full w-full"
            className="object-cover object-center"
          />
          {/* Mangrove / near-black wash so sand-tone copy and the booking CTAs stay readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-mangrove-deep/92 via-mangrove-deep/78 to-mangrove/55 dark:from-mangrove-deep/95 dark:via-mangrove-deep/84 dark:to-mangrove/68"
          />
        </HeroParallax>
      </div>

      <Container className="relative z-10 py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <Stack gap="lg">
            <div>
              <div className="hero-copy hero-copy-delay-1">
                <Text size="sm" className="font-medium tracking-wide text-gold-muted">
                  {BUSINESS_PLACE}
                </Text>
                <Heading as="h1" size="display" className="mt-2 text-sand">
                  Homestay in Murudeshwar
                </Heading>
              </div>
              <Text className="hero-copy hero-copy-delay-2 mt-4 max-w-prose text-sand/90 dark:text-sand">
                {BUSINESS_NAME} is a homestay in Murudeshwar — one Deluxe AC Room,
                priced by how many guests share it. Book direct on WhatsApp; the host
                confirms availability and your rate before you travel.
              </Text>
              <a
                href={BOOKING_HASH}
                className={cn(
                  buttonVariants({ variant: "outline-on-dark" }),
                  "hero-copy hero-copy-delay-3 mt-6 w-fit",
                )}
              >
                Check dates
              </a>
            </div>
          </Stack>
          <div className="lg:sticky lg:top-24">
            <BookingWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}
