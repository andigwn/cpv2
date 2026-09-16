"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { sectionLoopVariants } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SectionBackgroundConfig } from "@/types";

type SectionBackgroundProps = SectionBackgroundConfig & {
  className?: string;
  /** Rendered below the media, useful for a flat tint before the image paints. */
  baseClassName?: string;
};

const DEFAULT_OVERLAY = "bg-white/45";

/**
 * Animated background for a section: either a lazily attached looping video or a photo
 * animated with an infinite pan/zoom loop (prd.md section 4a & 13b).
 *
 * Render it as the first child of a `relative overflow-hidden` section with
 * `className="absolute inset-0 -z-10"`, keeping the content in a `relative z-10` wrapper.
 */
export function SectionBackground(props: SectionBackgroundProps) {
  const { className, baseClassName } = props;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        baseClassName,
        className,
      )}
    >
      {props.type === "video" ? (
        <VideoLayer src={props.src} poster={props.poster} />
      ) : (
        <ImageLoopLayer src={props.src} alt={props.alt} variant={props.loopVariant} />
      )}
      <div className={cn("absolute inset-0", props.overlayClassName ?? DEFAULT_OVERLAY)} />
    </div>
  );
}

function VideoLayer({ src, poster }: { src: string; poster: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const inView = useInView(containerRef, { margin: "200px 0px", once: false });
  const [isReady, setIsReady] = useState(false);

  // Lazy attachment: the video source element only renders once the section approaches
  // the viewport, so it never competes with the initial page load.
  const playsVideo = inView && !prefersReducedMotion;

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Poster doubles as the static fallback for reduced-motion visitors. */}
      <Image
        src={poster}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        className={cn(
          "object-cover transition-opacity duration-700",
          isReady && playsVideo ? "opacity-0" : "opacity-100",
        )}
      />

      {playsVideo ? (
        <video
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            isReady ? "opacity-100" : "opacity-0",
          )}
          src={src}
          poster={poster}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onCanPlay={() => setIsReady(true)}
        />
      ) : null}
    </div>
  );
}

function ImageLoopLayer({
  src,
  alt,
  variant,
}: {
  src: string;
  alt: string;
  variant: "pan" | "zoom";
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const config = sectionLoopVariants[variant];

  return (
    <motion.div
      className={cn("absolute inset-0", variant === "pan" && "scale-[1.12]")}
      animate={prefersReducedMotion ? undefined : config.animate}
      transition={prefersReducedMotion ? undefined : config.transition}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        loading="lazy"
        // Decorative only: every usage sits under a white/85-95% overlay, so a
        // lower quality is invisible while cutting roughly a quarter of the bytes.
        quality={70}
        className="object-cover"
      />
    </motion.div>
  );
}
