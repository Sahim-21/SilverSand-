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
          <TodoNotice
            item="landmarkDistances"
            detail="We have not published the walking or driving distance from our homestay to the temple, beach, or bus stand — this requires the owner to share a confirmed map pin (checklist #8)."
          />
        </Stack>
      </Container>
    </Section>
  );
}
