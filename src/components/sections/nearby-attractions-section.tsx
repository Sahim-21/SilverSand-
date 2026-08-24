import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { nearbyAttractions } from "@/lib/site-content";

export function NearbyAttractionsSection() {
  return (
    <Section className="bg-sand-deep/40">
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Nearby attractions
            </Heading>
            <Text tone="muted" className="mt-2">
              Places visitors often combine with a stay in Murudeshwar. Travel times
              from {`Silver Sand`} are not listed until the owner shares a map pin.
            </Text>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {nearbyAttractions.map((place) => (
              <Card key={place.name}>
                <CardHeader>
                  <CardTitle className="text-base">{place.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sm" tone="muted">
                    {place.note}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
