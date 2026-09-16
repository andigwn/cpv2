"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_CINEMATIC, ROTATION } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RotationSlide = {
  src: string;
  alt: string;
};

type RotatingBackgroundProps = {
  slides: RotationSlide[];
  /** Milliseconds a photo stays on screen (prd.md asks for 6–8s). */
  intervalMs?: number;
  className?: string;
  /** Gradient overlay classes; the overlay lives above both layers so contrast never flickers. */
  overlayClassName?: string;
  /** Enables the alternating Ken Burns zoom. */
  zoom?: boolean;
  priority?: boolean;
};

type Layer = { slide: RotationSlide; index: number; token: number };

const crossfadeTransition = (zoom: boolean): Transition => ({
  opacity: { duration: ROTATION.crossfadeSeconds, ease: EASE_CINEMATIC },
  scale: zoom ? { duration: ROTATION.zoomSeconds, ease: "linear" } : { duration: 0 },
});

/**
 * Hero background that rotates through bright photography.
 *
 * Implementation notes (prd.md section 12):
 * - Two stacked `motion.div` layers crossfade with `AnimatePresence mode="sync"`, so the
 *   incoming photo fades in *while* the outgoing one fades out — no gap, no flash.
 * - Zoom direction alternates: even indexes zoom in (1 → 1.08), odd indexes zoom out
 *   (1.08 → 1), which keeps the motion from feeling repetitive.
 * - Upcoming photos are preloaded into the browser cache before their turn.
 * - All layers are `absolute inset-0` inside a fixed-height container: zero CLS.
 */
export function RotatingBackground({
  slides,
  intervalMs = ROTATION.intervalMs,
  className,
  overlayClassName = "bg-gradient-to-t from-ink-900/55 via-ink-900/15 to-transparent",
  zoom = true,
  priority = true,
}: RotatingBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState<Layer>({ slide: slides[0], index: 0, token: 0 });
  const tokenRef = useRef(0);

  const interval = useMemo(() => Math.max(3000, intervalMs), [intervalMs]);

  // Advance the rotation on a fixed interval.
  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((previous) => {
        const nextIndex = (previous.index + 1) % slides.length;
        tokenRef.current += 1;
        return { slide: slides[nextIndex], index: nextIndex, token: tokenRef.current };
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, prefersReducedMotion, slides]);

  // Warm the cache for the next two photos so the crossfade never stutters.
  const currentIndex = current.index;
  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;

    const warm = (offset: number) => {
      const target = slides[(currentIndex + offset + slides.length) % slides.length];
      if (!target) return;
      const preload = new window.Image();
      preload.decoding = "async";
      preload.src = target.src;
    };

    warm(1);
    warm(2);
  }, [currentIndex, prefersReducedMotion, slides]);

  const isZoomIn = current.index % 2 === 0;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-lagoon-100", className)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current.token}
          className="absolute inset-0 will-change-[opacity,transform]"
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            scale: prefersReducedMotion ? 1 : zoom && !isZoomIn ? ROTATION.zoomScale : 1,
          }}
          animate={{
            opacity: 1,
            scale: prefersReducedMotion || !zoom ? 1 : isZoomIn ? ROTATION.zoomScale : 1,
          }}
          exit={{ opacity: 0, transition: { duration: ROTATION.crossfadeSeconds, ease: EASE_CINEMATIC } }}
          transition={crossfadeTransition(zoom && !prefersReducedMotion)}
        >
          <Image
            src={current.slide.src}
            alt={current.slide.alt}
            fill
            sizes="100vw"
            priority={priority && current.index === 0}
            loading={priority && current.index === 0 ? undefined : "eager"}
            // The hero is the LCP image and already sits under a contrast overlay;
            // 75 matches the site-wide default and is ~15% lighter than 82.
            quality={75}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Single overlay above every layer: headline contrast stays constant during the fade. */}
      <div className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}
