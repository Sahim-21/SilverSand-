import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SplitProps = {
  children: ReactNode;
  aside: ReactNode;
  className?: string;
};

/** Marketing column + booking widget. Stacks on mobile. */
export function Split({ children, aside, className }: SplitProps) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start",
        className,
      )}
    >
      <div>{children}</div>
      <div className="lg:sticky lg:top-24">{aside}</div>
    </div>
  );
}
