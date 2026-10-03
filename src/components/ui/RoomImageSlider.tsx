"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { EASE_CINEMATIC } from "@/lib/animations";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/i18n/useTranslation";

type RoomImageSliderProps = {
  slides: ImageAsset[];
  /** Responsive `sizes` hint forwarded to `next/image`. */
  sizes?: string;
  className?: string;
};

/** One photo holds for this long before the automatic advance. */
const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 48;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.4,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.4,
  }),
};

/**
 * Shared room-photo slider used by every outlet through `RoomTypeCard`.
 *
 * - Autoplay loops through the photos and pauses while the pointer rests on the slider.
 * - The arrows are hidden by default: the left one appears while the pointer is over
 *   the left half of the photo, the right one over the right half. Devices without
 *   hover (touch) keep both arrows visible and can also swipe the photo.
 * - A room with a single photo renders as a plain still image: no slider, no arrows.
 */
export function RoomImageSlider({ slides, sizes = "(max-width: 1023px) 100vw, 50vw", className }: RoomImageSliderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canHover = useMediaQuery("(hover: hover)", true);
  const t = useT();

  const [{ index, direction, moved }, setState] = useState({
    index: 0,
    direction: 1,
    moved: false,
  });
  const [hovered, setHovered] = useState(false);
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;

  const goTo = useCallback(
    (next: number, nextDirection?: number) =>
      setState((current) => {
        const target = ((next % total) + total) % total;
        return {
          index: target,
          direction: nextDirection ?? (target >= current.index ? 1 : -1),
          moved: true,
        };
      }),
    [total],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Autoplay: a fresh timer after every change, paused while hovered or dragging.
  useEffect(() => {
    if (total <= 1 || prefersReducedMotion || hovered || dragging) return;

    const from = index;
    const timer = window.setTimeout(() => {
      setState((current) =>
        current.index === from ? { index: (from + 1) % total, direction: 1, moved: true } : current,
      );
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [dragging, hovered, index, prefersReducedMotion, total]);

  if (!total) return null;

  const active = slides[index] ?? slides[0];

  // Single photo: plain image, no controls at all.
  if (total === 1) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const showLeft = !canHover || side === "left";
  const showRight = !canHover || side === "right";

  return (
    <div
      className={cn(
        "group/slider relative h-full w-full overflow-hidden",
        className,
      )}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setSide(null);
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setSide(event.clientX - bounds.left < bounds.width / 2 ? "left" : "right");
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? start) - start;
        if (delta < -SWIPE_THRESHOLD) next();
        else if (delta > SWIPE_THRESHOLD) previous();
      }}
    >
      {prefersReducedMotion ? (
        <Image src={active.src} alt={active.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial={moved ? "enter" : false}
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.65, ease: EASE_CINEMATIC },
              opacity: { duration: 0.4, ease: EASE_CINEMATIC },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              if (info.offset.x < -SWIPE_THRESHOLD) next();
              else if (info.offset.x > SWIPE_THRESHOLD) previous();
            }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes={sizes}
              loading="lazy"
              className="cursor-grab object-cover active:cursor-grabbing"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Manual arrows: each only appears over its own side of the photo (and stays
          visible on touch devices, which have no hover). */}
      <button
        type="button"
        onClick={previous}
        aria-label={t("gallery.previous")}
        className={cn(
          "text-ink-800 absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-md transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 group-focus-within/slider:opacity-100",
          showLeft ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={t("gallery.next")}
        className={cn(
          "text-ink-800 absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-md transition-opacity duration-300 hover:bg-white focus-visible:opacity-100 group-focus-within/slider:opacity-100",
          showRight ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
