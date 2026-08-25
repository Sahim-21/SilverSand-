import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "flex h-12 w-full appearance-none rounded-md border px-3.5 py-2 pr-10 text-base md:text-sm tabular-nums transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      surface: {
        light: "border-line bg-surface text-ink focus-visible:ring-focus",
        dark: "scheme-dark border-line-on-dark bg-mangrove-mid text-sand focus-visible:ring-gold",
      },
    },
    defaultVariants: {
      surface: "light",
    },
  },
);

export interface SelectProps
  extends React.ComponentProps<"select">, VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, surface, children, ...props }, ref) => (
    <div className="relative">
      <select
        className={cn(selectVariants({ surface }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2",
          surface === "dark" ? "text-sand/70" : "text-muted",
        )}
      />
    </div>
  ),
);
Select.displayName = "Select";

export { Select, selectVariants };
