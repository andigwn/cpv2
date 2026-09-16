"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxImageProps = {
  image: ImageAsset;
  className?: string;
  imageClassName?: string;
  /** Vertical travel in pixels, split between entry and exit. */
  distance?: number;
  scale?: number;
  priority?: boolean;
  sizes?: string;
  /** Extra overlay classes rendered above the image. */
  overlayClassName?: string;
  rounded?: string;
};

/**
 * Image that drifts against the scroll direction. Uses `transform` only so the
 * browser can keep it on the compositor thread (no reflow, no CLS).
 */
export function ParallaxImage({
  image,
  className,
  imageClassName,
  distance = 70,
  scale = 1.08,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  overlayClassName,
  rounded = "rounded-3xl",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", rounded, className)}>
      <motion.div
        style={prefersReducedMotion ? undefined : { y, scale: parallaxScale }}
        className={cn("absolute inset-0", imageClassName)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </motion.div>
      {overlayClassName ? (
        <div aria-hidden className={cn("absolute inset-0", overlayClassName)} />
      ) : null}
    </div>
  );
}
