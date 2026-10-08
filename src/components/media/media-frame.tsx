import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type MediaRatio = "landscape" | "standard" | "portrait" | "square" | "fill";
type MediaOverlay = "none" | "scrim" | "hero";

const ratioStyles: Record<MediaRatio, string> = {
  landscape: "relative aspect-video",
  standard: "relative aspect-[3/2]",
  portrait: "relative aspect-[4/5]",
  square: "relative aspect-square",
  /** Fills a positioned parent, e.g. a hero background. */
  fill: "absolute inset-0",
};

const overlayStyles: Record<MediaOverlay, string> = {
  none: "",
  /** Bottom fade for text laid over an image. */
  scrim: "bg-gradient-to-t from-midnight/70 via-midnight/10 to-transparent",
  /** Left-to-right Midnight wash, a top scrim for the transparent header and a bottom fade, so hero copy stays legible over photography. */
  hero: "bg-gradient-to-r from-midnight/85 via-midnight/65 to-midnight/5 before:absolute before:inset-x-0 before:top-0 before:h-40 before:bg-gradient-to-b before:from-midnight/70 before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-t after:from-midnight/80 after:via-midnight/0 after:via-35% after:to-transparent",
};

interface MediaFrameProps {
  /** Local image (static import or a path under /public). No remote hosts are configured. */
  src: ImageProps["src"];
  /** Describe the image, or pass an empty string when it is purely decorative. */
  alt: string;
  ratio?: MediaRatio;
  overlay?: MediaOverlay;
  /** Tailwind object-position class, e.g. "object-top". Defaults to centered. */
  position?: string;
  sizes?: string;
  /** Set on the single above-the-fold image of a page (LCP) to preload it. */
  preload?: boolean;
  className?: string;
}

/** Image with a fixed aspect ratio, optional overlay and optimized loading. */
export function MediaFrame({
  src,
  alt,
  ratio = "standard",
  overlay = "none",
  position = "object-center",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  preload = false,
  className,
}: MediaFrameProps) {
  return (
    <div className={cn("overflow-hidden bg-deep-navy", ratioStyles[ratio], className)}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover", position)} />
      {overlay !== "none" ? (
        <div aria-hidden="true" className={cn("absolute inset-0", overlayStyles[overlay])} />
      ) : null}
    </div>
  );
}
