import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  className?: string;
  caption?: string;
  /** Required: empty frames still expose this as the image accessible name. */
  alt: string;
  ratio?: "wide" | "room";
};

/**
 * Honest empty photograph slot. No stock images.
 * Replace with next/image (same `alt`) when the owner supplies photos.
 */
export function PhotoFrame({
  className,
  alt,
  caption = "Photos coming from the family — WhatsApp us for recent pictures.",
  ratio = "wide",
}: PhotoFrameProps) {
  return (
    <figure className={cn("overflow-hidden rounded-lg bg-sand-deep", className)}>
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-end border border-dashed border-line",
          ratio === "wide" ? "aspect-[16/9]" : "aspect-[4/3]",
        )}
      >
        <figcaption className="p-4 text-sm text-muted">{caption}</figcaption>
      </div>
    </figure>
  );
}
