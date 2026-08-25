import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import {
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
            We&apos;re at {FULL_ADDRESS}, {LANDMARK_BUS_STAND}. Murdeshwar Railway
            Station (MRDW) on the Konkan Railway is the nearest station — trains from
            Mangalore, Goa, and Mumbai stop here. Hubli is about 160 km east. Autos and
            taxis run from the station.
          </Text>
          <Text size="sm" tone="muted">
            The map shows our location. You can also{" "}
            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mangrove-fg underline"
            >
              open it on Google Maps
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
                The map isn&apos;t loading here. Open Google Maps for directions.
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
