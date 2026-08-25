import Image from "next/image";

import type { AttractionImage } from "@/lib/attractions/images";
import { cn } from "@/lib/utils";

type AttractionPlaceImageProps = {
  image: AttractionImage;
  className?: string;
  sizes?: string;
};

export function AttractionPlaceImage({
  image,
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: AttractionPlaceImageProps) {
  return (
    <div className={cn("ss-zoom-frame overflow-hidden bg-sand-deep", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="ss-image-zoom aspect-[4/3] h-auto w-full object-cover"
      />
    </div>
  );
}
