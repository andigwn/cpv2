"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { bandOverlapStyle, BLUR, SCRUB_SPRING } from "@/lib/animations";
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
 * It is opaque and sits at `z-10`, so it always paints above the photos. Short gradient
 * ramps sit just outside its top and bottom edges to soften the seam without tinting the
 * content.
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
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  // The sheet settles like the reference's overlapping sections: it rises into place and
  // eases the last few percent with a little lag rather than stopping dead on the scroll.
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const scale = useSpring(rawScale, SCRUB_SPRING);

  // Blur dissolve for the sheet itself: the content is out of focus while it rises into
  // place and sharpens the moment it lands, then softens again as the whole sheet leaves
  // the top of the viewport — the same focus-pull language as the media bands.
  const { scrollYProgress: journey } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const enterBlurPx = useTransform(scrollYProgress, [0, 0.65], [BLUR.sheetEnterPx, 0]);
  const exitBlurPx = useTransform(journey, [0.78, 1], [0, BLUR.sheetExitPx]);
  const rawBlurPx = useTransform([enterBlurPx, exitBlurPx], ([enter, exit]: number[]) => enter + exit);
  const blurPx = useSpring(rawBlurPx, SCRUB_SPRING);
  const blur = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      ref={sectionRef}
      id={id}
      style={overlap ? bandOverlapStyle : undefined}
      className={cn(
        "bg-sand-100 relative z-10",
        overlap && "shadow-[0_-36px_70px_-36px_rgba(19,25,34,0.4)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="via-sand-100/60 to-sand-100 pointer-events-none absolute inset-x-0 -top-[9svh] h-[9svh] bg-gradient-to-b from-transparent"
      />

      <div
        className={cn(
          "flex flex-col",
          overlap && "min-h-svh justify-center",
          spacingClasses[spacing],
        )}
      >
        <motion.div
          ref={ref}
          style={prefersReducedMotion ? undefined : { scale, filter: blur }}
          className={cn("origin-top", shellClasses[width])}
        >
          <div className={innerClasses[width]}>{children}</div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="from-sand-100 via-sand-100/60 pointer-events-none absolute inset-x-0 -bottom-[9svh] h-[9svh] bg-gradient-to-b to-transparent"
      />
    </section>
  );
}
