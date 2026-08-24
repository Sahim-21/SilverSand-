import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-gutter md:px-gutter-md", {
  variants: {
    width: {
      page: "max-w-6xl",
      narrow: "max-w-2xl",
      widget: "max-w-[28rem]",
    },
  },
  defaultVariants: {
    width: "page",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export function Container({ className, width, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ width }), className)} {...props} />;
}
