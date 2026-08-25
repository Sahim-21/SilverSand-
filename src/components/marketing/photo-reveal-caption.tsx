import { cn } from "@/lib/utils";

type PhotoRevealCaptionProps = {
  as?: "div" | "figcaption";
  title: string;
  detail?: string;
  className?: string;
};

/** Bottom-gradient caption on room/attraction photos. Visibility is CSS (hover vs coarse pointer). */
export function PhotoRevealCaption({
  as: Tag = "div",
  title,
  detail,
  className,
}: PhotoRevealCaptionProps) {
  return (
    <Tag className={cn("ss-photo-caption", className)}>
      <span className="text-sm font-medium text-sand">{title}</span>
      {detail ? (
        <span className="text-sm tabular-nums text-gold-muted">{detail}</span>
      ) : null}
    </Tag>
  );
}
