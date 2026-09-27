"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { EASE_CINEMATIC } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** The brief asks for a 2–3 second auto-slide on every unit gallery. */
const AUTO_ADVANCE_MS = 2500;
/** Glide duration of one slide; comfortably inside the auto-advance interval. */
const SLIDE_DURATION_S = 1.05;

type UnitGalleryProps = {
  slides: ImageAsset[];
  /** Accessible name for the carousel, e.g. "Galeri Hotel Q". */
  label: string;
  className?: string;
};

/**
 * Direction-aware slides: the next photo glides in from the side while the previous
 * one leaves, with a soft opacity blend so the rotation reads as one continuous
 * camera move instead of a hard cut.
 */
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.35,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.35,
  }),
};

/** Reduced-motion fallback: a quiet crossfade with no travel. */
const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Auto-playing photo gallery for the business-unit pages.
 *
 * - Auto-advances every 2.5 seconds with a smooth directional glide; hovering,
 *   focusing or dragging pauses the rotation, and `prefers-reduced-motion` switches
 *   to a plain crossfade and stops the timer.
 * - Manual navigation: previous/next buttons, clickable dots and horizontal swipe
 *   (drag) on the photo.
 * - `next/image` keeps the payload to the visible photo plus lazy follow-ups, and
 *   every slide carries its own descriptive alt text.
 */
export function UnitGallery({ slides, label, className }: UnitGalleryProps) {
  const [{ index, direction }, setState] = useState({ index: 0, direction: 1 });
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = slides.length;

  const goTo = useCallback(
    (next: number) =>
      setState((current) => ({
        index: ((next % total) + total) % total,
        direction: next >= current.index ? 1 : -1,
      })),
    [total],
  );
  const next = useCallback(
    () => setState((current) => ({ index: (current.index + 1) % total, direction: 1 })),
    [total],
  );
  const previous = useCallback(
    () =>
      setState((current) => ({
        index: (current.index - 1 + total) % total,
        direction: -1,
      })),
    [total],
  );

  useEffect(() => {
    if (prefersReducedMotion || paused || total <= 1) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next, paused, prefersReducedMotion, total]);

  if (!total) return null;

  const active = slides[index] ?? slides[0];

  return (
    <div
      className={cn("mt-10", className)}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[0_30px_80px_-60px_rgba(19,25,34,0.6)] sm:aspect-16/10">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={prefersReducedMotion ? fadeVariants : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              prefersReducedMotion
                ? { duration: 0.3, ease: EASE_CINEMATIC }
                : {
                    x: { duration: SLIDE_DURATION_S, ease: EASE_CINEMATIC },
                    opacity: { duration: 0.7, ease: EASE_CINEMATIC },
                  }
            }
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            dragMomentum={false}
            onDragStart={() => setPaused(true)}
            onDragEnd={(_, info) => {
              setPaused(false);
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60) previous();
            }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              quality={75}
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              className="cursor-grab object-cover active:cursor-grabbing"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="from-ink-900/40 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent"
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Foto sebelumnya"
              className="text-ink-800 absolute bottom-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur-md transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto berikutnya"
              className="text-ink-800 absolute bottom-5 left-20 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur-md transition hover:bg-white"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <span className="text-ink-700 absolute top-5 right-5 z-10 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-semibold tabular-nums backdrop-blur-md">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src + "-" + slideIndex}
              type="button"
              onClick={() => goTo(slideIndex)}
              aria-label={"Tampilkan foto " + (slideIndex + 1) + ": " + slide.alt}
              aria-current={slideIndex === index ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                slideIndex === index ? "bg-lagoon-600 w-8" : "bg-ink-300 hover:bg-ink-400 w-2",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
