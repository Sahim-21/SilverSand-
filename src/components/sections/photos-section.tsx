import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { buttonVariants } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/heading";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { cn } from "@/lib/utils";

type PhotosSectionProps = {
  showGalleryLink?: boolean;
};

export function PhotosSection({ showGalleryLink = true }: PhotosSectionProps) {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Photos
            </Heading>
            <Text tone="muted" className="mt-2">
              A photograph of the Deluxe AC Room will appear here when the owner
              supplies it. We do not use stock images or unverified OTA scrapes.
              Exterior, bathroom, and other property photos will be added in a
              later step — we do not show empty placeholder boxes for those.
            </Text>
          </div>
          <PhotoFrame
            ratio="room"
            className="max-w-xl"
            alt="Deluxe AC Room interior at Silver Sand Beach Homestay — photograph pending from the owner"
            caption="Deluxe AC Room — pending (#2)"
          />
          <TodoNotice item="photos" />
          {showGalleryLink ? (
            <Link
              href="/gallery"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              View gallery
            </Link>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
