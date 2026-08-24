import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { TodoNotice } from "@/components/marketing/todo-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { murudeshwarContext } from "@/lib/site-content";

export function MurudeshwarInfoSection() {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <div className="max-w-2xl">
            <Heading as="h2" size="section">
              Murudeshwar beach &amp; temple
            </Heading>
            <Text tone="muted" className="mt-2">
              General context for your trip — not a claim about our homestay&apos;s
              distance to each place.
            </Text>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">The temple &amp; statue</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {murudeshwarContext.temple}
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">The beach</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {murudeshwarContext.beach}
                </Text>
              </CardContent>
            </Card>
          </div>
          <TodoNotice
            item="landmarkDistances"
            detail="We have not published walking or driving times from our homestay to the beach or temple (checklist #8)."
          />
        </Stack>
      </Container>
    </Section>
  );
}
