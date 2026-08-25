import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Stack } from "@/components/layout/stack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/heading";
import { extraBedFaq, STATIC_FAQS } from "@/lib/seo/faqs";
import { getPublicPricing } from "@/lib/pricing/fetch";

export async function FaqSection() {
  const pricing = await getPublicPricing();
  const extra = extraBedFaq(pricing);

  return (
    <Section band="canvas">
      <Container>
        <Stack gap="lg">
          <Heading as="h2" size="section">
            Frequently asked questions
          </Heading>
          <div className="grid gap-4">
            {STATIC_FAQS.map((item) => (
              <Card key={item.q}>
                <CardHeader>
                  <CardTitle className="text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sm" tone="muted">
                    {item.a}
                  </Text>
                </CardContent>
              </Card>
            ))}
            {extra ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{extra.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sm" tone="muted">
                    {extra.a}
                  </Text>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Is there an extra bed?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text size="sm" tone="muted">
                    Yes. Extra beds can be added up to eight guests in the room. Ask on
                    WhatsApp for the extra-bed charge for your dates.
                  </Text>
                </CardContent>
              </Card>
            )}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
