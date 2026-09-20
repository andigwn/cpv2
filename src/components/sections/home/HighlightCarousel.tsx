"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { highlightSection, highlightSlides } from "@/data/highlights";
import { EASE_CINEMATIC } from "@/lib/animations";
import { useCarouselStore } from "@/store/useCarouselStore";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionBackground } from "@/components/animations/SectionBackground";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";

const AUTO_ADVANCE_MS = 6500;

/**
 * Auto-playing highlight carousel with crossfade, manual drag/swipe and clickable chips
 * (prd.md section 4 point 3). Reads its index from the shared carousel store.
 */
export function HighlightCarousel() {
  const { activeIndex, isPaused, setActiveIndex, next, previous, pause, resume } =
    useCarouselStore();

  const total = highlightSlides.length;
  const active = highlightSlides[activeIndex] ?? highlightSlides[0];

  const goTo = useCallback((index: number) => setActiveIndex(index), [setActiveIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => next(total), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, next, total]);

  // Reset to the first slide if the store ever points past the end.
  useEffect(() => {
    if (activeIndex >= total) setActiveIndex(0);
  }, [activeIndex, setActiveIndex, total]);

  return (
    <section
      id="highlights"
      className="relative overflow-hidden py-20 lg:py-28"
      aria-roledescription="carousel"
      aria-label="Highlight fasilitas Qubu Resort"
    >
      <SectionBackground {...sectionBackgrounds.highlights} />

      <div className="shell relative z-10">
        <SectionTitle
          eyebrow={highlightSection.eyebrow}
          title={highlightSection.title}
          description={highlightSection.description}
          className="max-w-3xl"
        />

        <div
          className="relative mt-12 overflow-hidden rounded-4xl border border-white/70 bg-white/70 shadow-[0_40px_90px_-60px_rgba(19,25,34,0.6)] backdrop-blur-sm"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          <div className="relative grid lg:grid-cols-[1.15fr_1fr]">
            {/* Visual side: crossfading photo */}
            <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-120">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.9, ease: EASE_CINEMATIC },
                    scale: { duration: 1.4, ease: EASE_CINEMATIC },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragStart={pause}
                  onDragEnd={(_, info) => {
                    resume();
                    if (info.offset.x < -60) next(total);
                    else if (info.offset.x > 60) previous(total);
                  }}
                >
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="cursor-grab object-cover active:cursor-grabbing"
                    priority={activeIndex === 0}
                  />
                  <div
                    aria-hidden
                    className="from-ink-900/45 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent"
                  />
                </motion.div>
              </AnimatePresence>

              <span className="text-lagoon-800 absolute top-5 left-5 z-10 rounded-full bg-white/85 px-4 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] uppercase backdrop-blur-md">
                {active.eyebrow}
              </span>

              <div className="absolute right-5 bottom-5 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => previous(total)}
                  aria-label="Slide sebelumnya"
                  className="text-ink-800 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur-md transition hover:bg-white"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => next(total)}
                  aria-label="Slide berikutnya"
                  className="text-ink-800 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur-md transition hover:bg-white"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            {/* Copy side */}
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${active.id}-copy`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <h3 className="text-2xl leading-tight sm:text-3xl">{active.title}</h3>
                  <p className="text-ink-600 mt-4 text-sm leading-relaxed sm:text-base">
                    {active.description}
                  </p>
                  <Button href={active.href} className="mt-7" variant="primary">
                    {active.ctaLabel}
                  </Button>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih highlight">
                  {highlightSlides.map((slide, index) => (
                    <Chip
                      key={slide.id}
                      label={slide.chip}
                      isActive={index === activeIndex}
                      onClick={() => goTo(index)}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-ink-200 h-1 flex-1 overflow-hidden rounded-full">
                    <motion.span
                      key={`${active.id}-progress`}
                      className="from-[#FFE52C] to-[#EF723D] block h-full rounded-full bg-linear-to-r"
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "45%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0.4 : AUTO_ADVANCE_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <span className="text-ink-500 font-mono text-xs tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide dots for mobile */}
        <div className={cn("mt-6 flex justify-center gap-2 lg:hidden")}>
          {highlightSlides.map((slide, index) => (
            <button
              key={`dot-${slide.id}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Tampilkan ${slide.chip}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-lagoon-600 w-8" : "bg-ink-300 w-2",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
