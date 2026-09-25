"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { FINALE, SCRUB_SPRING } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type FinaleBandProps = {
  id?: string;
  image: ImageAsset;
  children: ReactNode;
  /** Total band height in svh; the pin (and the reveal) stretches with it. */
  heightSvh?: number;
  className?: string;
};

/**
 * The closing band: the last photo pins, keeps pushing in while a dark veil deepens, and
 * the closing message rises over it exactly before the footer arrives (the reference's
 * final + outro beat, translated to a photograph).
 *
 * The photo is never faded out on its own — the veil and the footer take over — so the
 * section hands off without a visible cut.
 */
export function FinaleBand({
  id,
  image,
  children,
  heightSvh = FINALE.heightSvh,
  className,
}: FinaleBandProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Pin progress as `["start start", "end end"]`, written with explicit insets so Framer
  // Motion does not accelerate it onto a native ViewTimeline: that path anchors the range
  // to the animated element, which never moves while pinned, so derived values freeze.
  const { scrollYProgress: pin } = useScroll({
    target: ref,
    offset: ["start 0%", "end 100%"],
  });

  // The closing photo is visible from the first pixel (no fade-in), so the band always
  // shows its OWN photo instead of the sticky hero behind the page showing through.
  // Continuous, gentle push-in for the whole pin: the frame is never static. The springs
  // give the closing beat the reference's scrubbed feel — the veil, the push and the
  // rising message all trail the scroll like a camera settling on its subject.
  const rawScale = useTransform(pin, [0, 1], [1.02, 1.12]);
  const scale = useSpring(rawScale, SCRUB_SPRING);
  const rawVeil = useTransform(pin, [...FINALE.veilWindow], [0, 1]);
  const veil = useSpring(rawVeil, SCRUB_SPRING);
  const rawMessageOpacity = useTransform(pin, [...FINALE.messageWindow], [0, 1]);
  const messageOpacity = useSpring(rawMessageOpacity, SCRUB_SPRING);
  const rawMessageY = useTransform(pin, [...FINALE.messageWindow], [FINALE.messageTravel, 0]);
  const messageY = useSpring(rawMessageY, SCRUB_SPRING);
  const rawMessageScale = useTransform(
    pin,
    [...FINALE.messageWindow],
    [...FINALE.messageScale] as number[],
  );
  const messageScale = useSpring(rawMessageScale, SCRUB_SPRING);

  return (
    <section
      ref={ref}
      id={id}
      style={{ height: `${heightSvh}svh` }}
      className={cn("relative w-full", className)}
    >
      <div className="sticky top-0 isolate h-svh w-full overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? { scale: 1 } : { scale }}
          className="absolute inset-[-4%]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          aria-hidden
          style={prefersReducedMotion ? { opacity: 1 } : { opacity: veil }}
          className="from-ink-900/95 via-ink-900/80 to-ink-900/55 absolute inset-0 bg-gradient-to-t"
        />

        <div className="relative z-10 flex h-full items-center justify-center">
          <motion.div
            style={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: messageOpacity, y: messageY, scale: messageScale }
            }
            className="shell"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
