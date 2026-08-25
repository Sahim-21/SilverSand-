import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import {
  BUSINESS_PLACE,
  FULL_ADDRESS,
  GOOGLE_MAPS_PLACE_URL,
  LANDMARK_BUS_STAND,
  googleMapsEmbedSrc,
} from "@/lib/business";
import { cn } from "@/lib/utils";

type MapSectionProps = {
  showLocationLink?: boolean;
};

export function MapSection({ showLocationLink = true }: MapSectionProps) {
  const embedSrc = googleMapsEmbedSrc();

  return (
    <Section className="bg-surface">
      <Container>
        <Stack gap="md" className="max-w-3xl">
          <Heading as="h2" size="section">
            Getting here
          </Heading>
          <Text tone="muted">
            {FULL_ADDRESS}. The homestay is {LANDMARK_BUS_STAND}. The nearest railway
            station is <strong>Murdeshwar Railway Station</strong> (MRDW) on the Konkan
            Railway — trains from Mangalore, Goa, and Mumbai stop here. The nearest
            large city is Hubli (~160 km east). Auto-rickshaws and taxis operate from
            the station.
          </Text>
          <Text size="sm" tone="muted">
            {BUSINESS_PLACE}. Open the map below for the live pin, or{" "}
            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mangrove underline"
            >
              view the place on Google Maps
            </a>
            .
          </Text>

          {embedSrc ? (
            <div className="overflow-hidden rounded-lg border border-line bg-sand-deep aspect-[16/9]">
              <iframe
                title={`Map of Silver Sand Beach Homestay — ${FULL_ADDRESS}`}
                src={embedSrc}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-lg border border-line bg-sand-deep px-4 text-center">
              <Text size="sm" tone="muted">
                Map embed needs{" "}
                <code className="text-ink">NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY</code> in
                the environment. Until then, open the place on Google Maps.
              </Text>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
              >
                Open in Google Maps
              </a>
            </div>
          )}

          {showLocationLink ? (
            <Link
              href="/location"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Location &amp; directions
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
