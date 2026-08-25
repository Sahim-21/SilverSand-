import type { StaticImageData } from "next/image";

import { PhotoRevealCaption } from "@/components/marketing/photo-reveal-caption";
import { TokenImage } from "@/components/ui/token-image";
import type { AttractionImage } from "@/lib/attractions/images";
import { cn } from "@/lib/utils";

import beach from "../../../public/tourist_places/beach.jpg";
import idagunji from "../../../public/tourist_places/idagunji_temple.jpg";
import jetty from "../../../public/tourist_places/murudeshwar_jetty.jpg";
import temple from "../../../public/tourist_places/murudeshwar_temple.jpg";
import netrani from "../../../public/tourist_places/Netrani.jpg";
import yana from "../../../public/tourist_places/yana.jpeg";

const ATTRACTION_STATIC: Record<string, StaticImageData> = {
  "/tourist_places/murudeshwar_temple.jpg": temple,
  "/tourist_places/beach.jpg": beach,
  "/tourist_places/Netrani.jpg": netrani,
  "/tourist_places/idagunji_temple.jpg": idagunji,
  "/tourist_places/yana.jpeg": yana,
  "/tourist_places/murudeshwar_jetty.jpg": jetty,
};

type AttractionPlaceImageProps = {
  image: AttractionImage;
  label: string;
  className?: string;
  sizes?: string;
};

export function AttractionPlaceImage({
  image,
  label,
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: AttractionPlaceImageProps) {
  const staticSrc = ATTRACTION_STATIC[image.src];

  return (
    <div className={cn("ss-zoom-frame overflow-hidden bg-sand-deep", className)}>
      <TokenImage
        src={staticSrc ?? image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        slotClassName="aspect-[4/3] w-full"
        className="ss-image-zoom object-cover"
      />
      <PhotoRevealCaption title={label} />
    </div>
  );
}
