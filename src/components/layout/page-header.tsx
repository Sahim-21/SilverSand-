import type { ReactNode } from "react";

import { Stack } from "@/components/layout/stack";
import { Heading, Text } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <Stack gap="sm" className={cn("max-w-prose", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-mangrove">{eyebrow}</p>
      ) : null}
      <Heading as="h1" size="display">
        {title}
      </Heading>
      {description ? (
        <Text tone="muted" className="max-w-prose">
          {description}
        </Text>
      ) : null}
    </Stack>
  );
}
