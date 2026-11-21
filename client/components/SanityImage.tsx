import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImageCrop, SanityImageHotspot, SanityImageAssetReference } from "@/sanity/types";

type SanityImageValue = {
  asset?: SanityImageAssetReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
  lqip?: string | null;
  dimensions?: { width: number; height: number } | null;
};

type Props = {
  image: SanityImageValue | null | undefined;
  /** Required: tells the browser which srcset width to pick. */
  sizes: string;
  className?: string;
  /** Above-the-fold images only: load eagerly with high fetch priority. */
  eager?: boolean;
};

/** Sanity image → next/image with intrinsic size, blur placeholder and alt from Sanity. */
export function SanityImage({ image, sizes, className, eager }: Props) {
  if (!image?.asset || !image.dimensions) return null;

  // Apply the Studio crop so the intrinsic aspect ratio matches the served image.
  const c = image.crop;
  const width = Math.round(image.dimensions.width * (1 - (c?.left ?? 0) - (c?.right ?? 0)));
  const height = Math.round(image.dimensions.height * (1 - (c?.top ?? 0) - (c?.bottom ?? 0)));
  return (
    <Image
      src={urlFor(image).url()}
      alt={image.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip ?? undefined}
    />
  );
}
