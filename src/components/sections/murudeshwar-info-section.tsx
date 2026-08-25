import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { BUSINESS_NAME, LANDMARK_BUS_STAND } from "@/lib/business";
import { murudeshwarContext } from "@/lib/site-content";

export function MurudeshwarInfoSection() {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Murudeshwar — temple town on the Arabian Sea
            </Heading>
            <Text tone="muted" className="mt-2">
              {murudeshwarContext.intro}
            </Text>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">The temple &amp; Shiva statue</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {murudeshwarContext.temple}
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Murudeshwar Beach</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {murudeshwarContext.beach}
                </Text>
              </CardContent>
            </Card>
          </div>
          <Text size="sm" tone="muted">
            {BUSINESS_NAME} is {LANDMARK_BUS_STAND}.
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}
