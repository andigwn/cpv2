"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { preloaderVariants } from "@/lib/animations";
import { SITE } from "@/lib/constants";

type PreloaderProps = {
  /** Total intro duration in milliseconds. */
  duration?: number;
  onFinish: () => void;
};

/**
 * Short cinematic intro shown before the first page paints: counter + brand mark, then a
 * curtain fade. Skipped entirely for reduced-motion visitors and only rendered on the
 * client, so it can never block the server-rendered markup.
 */
export function Preloader({ duration = 1500, onFinish }: PreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(!prefersReducedMotion);

  // Let the parent shell know the intro is over (also covers the reduced-motion skip).
  useEffect(() => {
    if (!prefersReducedMotion) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with an external system (the OS motion preference)
    setVisible(false);
    onFinish();
  }, [onFinish, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const ratio = Math.min(1, elapsed / duration);
      // easeOutCubic for a decelerating counter
      setProgress(Math.round((1 - Math.pow(1 - ratio, 3)) * 100));

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        onFinish();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, onFinish, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          variants={preloaderVariants}
          initial="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-white via-lagoon-50 to-sand-100"
          role="status"
          aria-live="polite"
          aria-label="Memuat situs Qubu Resort"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lagoon-200/60 blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sunshine-200/60 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6 px-6 text-center"
          >
            <span className="text-[0.7rem] font-semibold tracking-[0.4em] text-lagoon-700 uppercase">
              {SITE.tagline}
            </span>
            <p className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-6xl">
              {SITE.name}
            </p>
            <div className="relative h-[3px] w-56 overflow-hidden rounded-full bg-ink-200 sm:w-72">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0B6C3C] via-[#8BC91B] to-[#FFE52C]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-sm tracking-[0.3em] text-ink-500 tabular-nums">
              {String(progress).padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
