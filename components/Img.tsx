import NextImage from "next/image";
import type { CSSProperties } from "react";
import { imageDimensions } from "@/data/imageDimensions";

/**
 * Thin wrapper around next/image for our local project screenshots.
 *
 * Intrinsic width/height come from the auto-generated `imageDimensions` map, so
 * every image reserves the right space (zero layout shift) while Next serves a
 * resized, AVIF/WebP version sized to the device via `sizes`. Display size is
 * still driven entirely by the `className` you pass — set `h-auto` (or
 * `h-full`) so the height follows the width instead of being pinned.
 *
 * If an image is missing from the map it degrades to a plain <img>, so nothing
 * ever fails to render.
 */
export function Img({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  draggable,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  draggable?: boolean;
  style?: CSSProperties;
}) {
  const dim = imageDimensions[src];

  if (!dim) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={draggable}
        className={className}
        style={style}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={dim.width}
      height={dim.height}
      sizes={sizes}
      priority={priority}
      draggable={draggable}
      className={className}
      style={style}
    />
  );
}
