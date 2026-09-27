"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { EASE_CINEMATIC, EASE_IN_OUT, GALLERY } from "@/lib/animations";

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

/**
 * Auto-playing photo gallery for the business-unit pages.
 *
 * - The rotation starts on its own the moment the gallery renders: no click, hover
 *   or focus is needed to wake it up.
 * - Every photo keeps drifting while it is shown (slow Ken Burns zoom + pan), so the
 *   frame is never a frozen still between transitions.
 * - The photo after the visible one is preloaded and only transform/opacity animate,
 *   which keeps each glide smooth; dragging pauses the timer only while the visitor
 *   is actually holding the photo.
 * - Manual navigation: previous/next buttons, clickable dots and horizontal swipe
 *   (drag) on the photo. Pressing them is a shortcut, not a prerequisite — a manual
 *   step simply restarts the auto-advance beat.
 */
export function UnitGallery({ slides, label, className }: UnitGalleryProps) {
  const [{ index, direction, moved }, setState] = useState({
    index: 0,
    direction: 1,
    moved: false,
  });
  const [dragging, setDragging] = useState(false);
  const total = slides.length;

  /**
   * `moved` is false only for the slide that mounts with the page. The first slide is
   * rendered without an entrance animation, while every later slide glides in. It is
   * tracked per slide (instead of via `AnimatePresence initial={false}`) because the
   * presence context would otherwise freeze the Ken Burns loop of the first photo too.
   */
  const goTo = useCallback(
    (next: number) =>
      setState((current) => ({
        index: ((next % total) + total) % total,
        direction: next >= current.index ? 1 : -1,
        moved: true,
      })),
    [total],
  );
  const next = useCallback(
    () =>
      setState((current) => ({ index: (current.index + 1) % total, direction: 1, moved: true })),
    [total],
  );
  const previous = useCallback(
    () =>
      setState((current) => ({
        index: (current.index - 1 + total) % total,
        direction: -1,
        moved: true,
      })),
    [total],
  );

  /**
   * Autoplay. A fresh timeout after every slide change means the first photo also
   * rotates without any interaction, and a manual step gets a whole beat before the
   * rotation continues.
   */
  useEffect(() => {
    if (total <= 1 || dragging) return;

    const from = index;
    const timer = window.setTimeout(() => {
      setState((current) =>
        current.index === from
          ? { index: (from + 1) % total, direction: 1, moved: true }
          : current,
      );
    }, GALLERY.intervalMs);

    return () => window.clearTimeout(timer);
  }, [dragging, index, total]);

  if (!total) return null;

  const active = slides[index] ?? slides[0];
  const upcoming = slides[(index + 1) % total];
  const zoomsIn = index % 2 === 0;
  const drift = GALLERY.kenBurns.driftPercent;

  return (
    <div className={cn("mt-10", className)} aria-roledescription="carousel" aria-label={label}>
      <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[0_30px_80px_-60px_rgba(19,25,34,0.6)] sm:aspect-16/10">
        {/* Hidden twin of the next photo: same props as the visible slide, so its
            optimised URL is already in the browser cache when the glide starts. */}
        {total > 1 && upcoming ? (
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
            <Image
              src={upcoming.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              quality={75}
              loading="eager"
              className="object-cover"
            />
          </div>
        ) : null}

        <AnimatePresence custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial={moved ? "enter" : false}
            animate="center"
            exit="exit"
            transition={{
              x: { duration: GALLERY.slideSeconds, ease: EASE_CINEMATIC },
              opacity: { duration: GALLERY.blendSeconds, ease: EASE_CINEMATIC },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60) previous();
            }}
            className="absolute inset-0 will-change-transform"
          >
            {/* Ken Burns: the photo keeps zooming and drifting while it is on screen. The
                keyframes run in a seamless loop, so the frame is never a frozen still. */}
            <motion.div
              animate={{
                scale: zoomsIn
                  ? [GALLERY.kenBurns.zoomFrom, GALLERY.kenBurns.zoomTo, GALLERY.kenBurns.zoomFrom]
                  : [GALLERY.kenBurns.zoomTo, GALLERY.kenBurns.zoomFrom, GALLERY.kenBurns.zoomTo],
                x:
                  direction > 0
                    ? [`${drift}%`, `-${drift}%`, `${drift}%`]
                    : [`-${drift}%`, `${drift}%`, `-${drift}%`],
              }}
              transition={{
                duration: GALLERY.kenBurns.loopSeconds,
                repeat: Infinity,
                ease: EASE_IN_OUT,
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                quality={75}
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                className="cursor-grab object-cover active:cursor-grabbing"
              />
            </motion.div>
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
