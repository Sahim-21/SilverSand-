import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SectionBand = "canvas" | "wash";

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Alternating page bands. Omit on inner pages until the homepage direction is confirmed. */
  band?: SectionBand;
  /** Soften the join from the previous band. Off after the hero. */
  fade?: boolean;
};

export function Section({ className, band, fade = true, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-section",
        band === "canvas" && "ss-band-canvas",
        band === "wash" && "ss-band-wash",
        band && fade && "ss-band-fade",
        className,
      )}
      {...props}
    />
  );
}
