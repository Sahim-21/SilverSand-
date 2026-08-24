import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import type { ReactNode } from "react";

type InnerPageHeroProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
};

export function InnerPageHero({ title, description, eyebrow }: InnerPageHeroProps) {
  return (
    <Section className="border-b border-line bg-surface pb-10 pt-10">
      <Container>
        <PageHeader eyebrow={eyebrow} title={title} description={description} />
      </Container>
    </Section>
  );
}
