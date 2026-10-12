"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { FINALE, SCRUB_SPRING } from "@/lib/animations";
import { photoRatio, type AspectRatioStyle } from "@/lib/photoFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { MEDIA_QUERIES, useMediaQuery } from "@/hooks/useMediaQuery";

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
 *
 * ## Fitting
 *
 * From `sm` up the frame is a full-viewport bleed and the photo covers it, unchanged.
 *
 * On a phone the frame instead takes the photograph's own aspect ratio, so the closing shot
 * runs edge to edge and complete instead of being cropped down to whatever slice of it a
 * portrait viewport could show. The section is then exactly as tall as the photo and the frame
 * never pins, which also leaves no scroll distance for the veil to deepen across or the closing
 * message to rise over — so on a phone both are simply in place, and the call to action is
 * readable the moment it arrives. Gated on hydration, so the server keeps emitting the pinned
 * mapping and no desktop visitor sees a flash of the un-scrolled state.
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
  // Below `sm` the section collapses to the photo's own height and nothing pins, so there is
  // no scroll distance for the veil and the message to travel across. Gated on hydration so the
  // server keeps emitting the pinned mapping and no desktop visitor sees a flash of it.
  const isWide = useMediaQuery(MEDIA_QUERIES.sm);
  const isPhoneLayout = useIsHydrated() && !isWide;

  // Phone frame shape, resolved before first paint so the layout never jumps.
  const ratio = photoRatio(image.src);
  const sectionStyle: AspectRatioStyle = {
    "--finale-ar": ratio.css,
    "--finale-height": `${heightSvh}svh`,
  };

  // Pin progress as `["start start", "end end"]`, written with explicit insets so Framer
  // Motion does not accelerate it onto a native ViewTimeline: that path anchors the range
  // to the animated element, which never moves while pinned, so derived values freeze.
  const { scrollYProgress: pin } = useScroll({
    target: ref,
    offset: ["start 0%", "end 100%"],
  });

  // The closing photo is visible from the first pixel (no fade-in), so the band always
  // shows its OWN photo instead of the sticky hero behind the page showing through.
  // The veil depth and the rising message trail the scroll like a camera settling on its
  // subject. No scroll-linked zoom: the revision removed every scale-on-scroll effect.
  const rawVeil = useTransform(pin, [...FINALE.veilWindow], [0, 1]);
  const veil = useSpring(rawVeil, SCRUB_SPRING);
  const rawMessageOpacity = useTransform(pin, [...FINALE.messageWindow], [0, 1]);
  const messageOpacity = useSpring(rawMessageOpacity, SCRUB_SPRING);
  const rawMessageY = useTransform(pin, [...FINALE.messageWindow], [FINALE.messageTravel, 0]);
  const messageY = useSpring(rawMessageY, SCRUB_SPRING);

  // Phone (and reduced-motion) visitors get the settled state directly.
  const veilStyle = prefersReducedMotion || isPhoneLayout ? { opacity: 1 } : { opacity: veil };
  const messageStyle =
    prefersReducedMotion || isPhoneLayout
      ? { opacity: 1, y: 0 }
      : { opacity: messageOpacity, y: messageY };

  return (
    <section
      ref={ref}
      id={id}
      style={sectionStyle}
      className={cn("relative w-full sm:h-(--finale-height)", className)}
    >
      <div className="sticky top-0 isolate aspect-(--finale-ar) w-full overflow-hidden sm:aspect-auto sm:h-svh">
        <div className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
        </div>

        <motion.div
          aria-hidden
          style={veilStyle}
          className="from-ink-900/95 via-ink-900/80 to-ink-900/55 absolute inset-0 bg-linear-to-t"
        />

        <div className="relative z-10 flex h-full items-center justify-center">
          <motion.div style={messageStyle} className="shell">
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
