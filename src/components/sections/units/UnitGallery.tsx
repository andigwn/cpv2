"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { EASE_CINEMATIC } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** The brief asks for a 2–3 second auto-slide on every unit gallery. */
const AUTO_ADVANCE_MS = 2500;

type UnitGalleryProps = {
  slides: ImageAsset[];
  /** Accessible name for the carousel, e.g. "Galeri Hotel Q". */
  label: string;
  className?: string;
};

/**
 * Auto-playing photo gallery for the business-unit pages.
 *
 * - Crossfades to the next photo every 2.5 seconds; hovering, focusing or dragging
 *   pauses the rotation, and `prefers-reduced-motion` disables it entirely.
 * - Manual navigation: previous/next buttons, clickable dots and horizontal swipe
 *   (drag) on the photo.
 * - `next/image` keeps the payload to the visible photo plus lazy follow-ups, and
 *   every slide carries its own descriptive alt text.
 */
export function UnitGallery({ slides, label, className }: UnitGalleryProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = slides.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const next = useCallback(
    () => setIndex((current) => (current + 1) % total),
    [total],
  );
  const previous = useCallback(
    () => setIndex((current) => (current - 1 + total) % total),
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
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.7, ease: EASE_CINEMATIC },
              scale: { duration: 1.1, ease: EASE_CINEMATIC },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setPaused(true)}
            onDragEnd={(_, info) => {
              setPaused(false);
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60) previous();
            }}
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
