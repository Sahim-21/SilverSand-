import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-serif font-semibold tracking-tight text-ink", {
  variants: {
    size: {
      display: "text-[1.875rem] leading-tight md:text-[2.75rem]",
      title: "text-[1.5rem] leading-snug md:text-[1.875rem]",
      section: "text-xl leading-snug md:text-2xl",
    },
  },
  defaultVariants: {
    size: "title",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag;
}

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}

const textVariants = cva("font-sans", {
  variants: {
    size: {
      xs: "text-xs leading-5",
      sm: "text-sm leading-relaxed",
      base: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
    },
    tone: {
      default: "text-ink",
      muted: "text-muted",
      gold: "text-gold",
      inverse: "text-sand",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
  },
});

export interface TextProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span";
}

export function Text({ as: Tag = "p", size, tone, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ size, tone }), className)} {...props} />;
}

export { headingVariants, textVariants };
