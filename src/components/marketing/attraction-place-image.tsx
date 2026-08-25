import { PhotoLightboxTrigger } from "@/components/media/photo-lightbox";
import { PhotoRevealCaption } from "@/components/marketing/photo-reveal-caption";
import { TokenImage } from "@/components/ui/token-image";
import type { AttractionImage } from "@/lib/attractions/images";
import { ATTRACTION_STATIC } from "@/lib/images/attraction-statics";
import { cn } from "@/lib/utils";

type AttractionPlaceImageProps = {
  image: AttractionImage;
  label: string;
  index: number;
  className?: string;
  sizes?: string;
};

export function AttractionPlaceImage({
  image,
  label,
  index,
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: AttractionPlaceImageProps) {
  const staticSrc = ATTRACTION_STATIC[image.src];

  return (
    <PhotoLightboxTrigger
      index={index}
      label={image.alt}
      className={cn("ss-zoom-frame overflow-hidden bg-sand-deep", className)}
    >
      <TokenImage
        src={staticSrc ?? image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        slotClassName="aspect-[4/3] w-full"
        className="ss-image-zoom object-cover"
      />
      <PhotoRevealCaption title={label} />
    </PhotoLightboxTrigger>
  );
}
