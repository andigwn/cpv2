"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { bandOverlapStyle, SCRUB_SPRING } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ContentBandProps = {
  children: ReactNode;
  id?: string;
  /** Vertical breathing room for the content. */
  spacing?: "tight" | "default" | "loose";
  width?: "narrow" | "default" | "wide";
  /**
   * Pull the sheet up over the tail of the ImageBand above it so the content slides
   * over the still-pinned photo instead of only meeting its edge (the reference's
   * signature hand-off). Only use directly after an ImageBand.
   */
  overlap?: boolean;
  className?: string;
};

const spacingClasses = {
  tight: "py-16 sm:py-20 lg:py-24",
  default: "py-24 sm:py-28 lg:py-36",
  loose: "py-32 sm:py-36 lg:py-48",
} as const;

const shellClasses = {
  narrow: "shell",
  default: "shell",
  wide: "shell-wide",
} as const;

const innerClasses = {
  narrow: "mx-auto max-w-3xl",
  default: "",
  wide: "",
} as const;

/**
 * A solid sheet that slides up over the pinned photo above it.
 *
 * Deliberately kept at its natural height — just the content plus its padding — but with
 * `overlap` it is at least one viewport tall and is pulled up by `BAND.overlapSvh`, so it
 * rises over the photo band while that photo is still pinned and covers it completely.
 * It is opaque and sits at `z-10`, so it always paints above the photos. The sheet meets
 * the band above/below with a clean, sharp edge — no soft gradient seam.
 */
export function ContentBand({
  children,
  id,
  spacing = "default",
  width = "default",
  overlap = false,
  className,
}: ContentBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  // The sheet settles like the reference's overlapping sections: it rises into place and
  // eases the last few percent with a little lag rather than stopping dead on the scroll.
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const scale = useSpring(rawScale, SCRUB_SPRING);

  return (
    <section
      id={id}
      style={overlap ? bandOverlapStyle : undefined}
      className={cn("bg-sand-100 relative z-10", className)}
    >
      <div
        className={cn(
          "flex flex-col",
          overlap && "min-h-svh justify-center",
          spacingClasses[spacing],
        )}
      >
        <motion.div
          ref={ref}
          style={prefersReducedMotion ? undefined : { scale }}
          className={cn("origin-top", shellClasses[width])}
        >
          <div className={innerClasses[width]}>{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
