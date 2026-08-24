import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-md border px-4 py-3 text-sm leading-relaxed", {
  variants: {
    tone: {
      info: "border-line bg-sand-deep text-ink",
      danger: "border-danger/30 bg-danger/10 text-danger",
    },
  },
  defaultVariants: {
    tone: "info",
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export function Alert({ className, tone, ...props }: AlertProps) {
  return (
    <div role="status" className={cn(alertVariants({ tone }), className)} {...props} />
  );
}
