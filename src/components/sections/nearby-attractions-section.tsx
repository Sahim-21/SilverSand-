import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { AttractionPlaceImage } from "@/components/marketing/attraction-place-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { ATTRACTION_IMAGES } from "@/lib/attractions/images";
import { nearbyAttractions } from "@/lib/site-content";

export function NearbyAttractionsSection() {
  return (
    <Section className="bg-sand-deep/40">
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              What to do near Murudeshwar
            </Heading>
            <Text tone="muted" className="mt-2">
              Most guests combine the temple and beach with one or two day trips.
            </Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {nearbyAttractions.map((place) => {
              const image = ATTRACTION_IMAGES[place.name];
              return (
                <Card key={place.name} className="overflow-hidden">
                  {image ? <AttractionPlaceImage image={image} /> : null}
                  <CardHeader>
                    <CardTitle className="text-base">{place.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" tone="muted">
                      {place.note}
                    </Text>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
