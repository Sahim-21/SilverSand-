import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-4",
      form: "gap-form",
      lg: "gap-8",
      xl: "gap-10",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {}

export function Stack({ className, gap, ...props }: StackProps) {
  return <div className={cn(stackVariants({ gap }), className)} {...props} />;
}
