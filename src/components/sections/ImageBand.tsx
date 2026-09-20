"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import {
  BAND,
  BAND_COVER_START,
  BAND_PIN_WINDOW,
  EASE_IN_OUT,
  MEDIA,
  SCRUB_SPRING,
} from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ImageBandProps = {
  image: ImageAsset;
  /** Optional single short line over the photo. */
  caption?: string;
  priority?: boolean;
  align?: "center" | "left";
  /** Edge fade into the page canvas. Off by default in the band rhythm. */
  fade?: "both" | "bottom" | "none";
  className?: string;
};

/**
 * The still photo that the next ContentBand slides over.
 *
 * The section is TALLER than the viewport on purpose — that extra height is what gives
 * the photo a moment on its own. The photo itself lives in a sticky, exactly-viewport
 * box, so:
 *
 * 1. it rises with the page while the previous content sheet is still on screen — and
 *    stays INVISIBLE the whole time, so the visitor reads the sheet without the next
 *    photo peeking in from the bottom;
 * 2. the moment the sheet has scrolled past the top (the navbar zone) the band pins and
 *    the photo fades in — always sharp, no blur dissolve;
 * 3. the following ContentBand — pulled up by `bandOverlapStyle` — then rises from the
 *    bottom while the photo is STILL pinned and covers it completely. The photo
 *    never fades out on its own: it is hidden by an opaque sheet, exactly like the
 *    reference site hides a pinned video behind the next section.
 *
 * Two motions keep it from looking rigid, on separate wrappers so they compose: a
 * scroll-linked counter-drift downwards, and a slow push-in that dollies back out as the
 * sheet slides over.
 */
export function ImageBand({
  image,
  caption,
  priority = false,
  align = "center",
  fade = "none",
  className,
}: ImageBandProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [pinStart, pinEnd] = BAND_PIN_WINDOW;

  // Invisible while the previous content sheet is still on screen: the photo only fades
  // in once that sheet has scrolled past the top (the navbar zone) and the band itself
  // pins. A fade-out at the end would ghost the incoming section (the old bug) — the
  // following sheet hides it instead.
  const opacity = useTransform(scrollYProgress, [...MEDIA.fadeWindow], [0, 1], {
    clamp: true,
  });

  // Downwards while the page scrolls up: the layers move in opposite directions. The
  // springs give the pinned frame the reference's scrub lag — it trails the scroll
  // slightly instead of being welded to it, so the camera feels heavy and physical.
  const rawY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const y = useSpring(rawY, SCRUB_SPRING);
  // Push in while the photo rises into view (still hidden), settle at 1 for the pin,
  // hold while the photo is alone, then dolly back out while the content sheet covers it.
  const rawScale = useTransform(
    scrollYProgress,
    [0, pinStart, BAND_COVER_START, pinEnd],
    [BAND.entryScale, 1, 1, BAND.exitScale],
  );
  const scale = useSpring(rawScale, SCRUB_SPRING);

  // Caption follows the same rule: it rises in shortly after the photo itself appears.
  const captionOpacity = useTransform(
    scrollYProgress,
    [pinStart + 0.06, pinStart + 0.2],
    [0, 1],
    { clamp: true },
  );
  const captionY = useTransform(
    scrollYProgress,
    [pinStart + 0.06, pinStart + 0.2],
    [18, 0],
    { clamp: true },
  );

  const showTop = fade === "both";
  const showBottom = fade !== "none";

  return (
    <section
      ref={ref}
      style={{ height: `${BAND.photoHeightSvh}svh` }}
      className={cn("relative w-full", className)}
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity }}
        className="sticky top-0 isolate h-svh w-full overflow-hidden"
      >
        {/* Oversized so the counter-drift has room and never exposes an edge. */}
        <motion.div
          style={prefersReducedMotion ? undefined : { y, scale }}
          className="absolute inset-[-18%]"
        >
          <motion.div
            className="absolute inset-0"
            animate={prefersReducedMotion ? undefined : { scale: [1, BAND.kenBurnsScale, 1] }}
            transition={{ duration: BAND.kenBurnsSeconds, repeat: Infinity, ease: EASE_IN_OUT }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              priority={priority}
              loading={priority ? undefined : "lazy"}
              quality={75}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {showTop ? (
          <div
            aria-hidden
            className="from-sand-100 via-sand-100/70 absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent sm:h-36"
          />
        ) : null}
        {showBottom ? (
          <div
            aria-hidden
            className="from-sand-100 via-sand-100/70 absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent sm:h-36"
          />
        ) : null}

        {caption ? (
          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center",
              align === "center" ? "justify-center" : "justify-start",
            )}
          >
            <div className="shell">
              <motion.p
                style={prefersReducedMotion ? undefined : { opacity: captionOpacity, y: captionY }}
                className="font-display bg-sand-50/85 text-ink-800 max-w-md rounded-3xl px-6 py-5 text-lg leading-snug backdrop-blur-md sm:text-xl"
              >
                {caption}
              </motion.p>
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
