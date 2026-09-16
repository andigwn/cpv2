"use client";

import { useEffect, useState } from "react";

type ScrollProgress = {
  /** Raw window scrollY in pixels. */
  scrollY: number;
  /** Document scroll progress from 0 to 1. */
  progress: number;
  /** True once the user scrolled past `threshold`. */
  scrolled: boolean;
  /** True while scrolling down, false while scrolling up. */
  scrollingDown: boolean;
};

/**
 * Lightweight window scroll tracker used by the navbar (hide-on-scroll-down)
 * and the hero parallax. Reads the native scroll position so it keeps working
 * with Lenis' smooth scrolling layer.
 */
export function useScrollProgress(threshold = 24): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    scrollY: 0,
    progress: 0,
    scrolled: false,
    scrollingDown: false,
  });

  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      setState({
        scrollY,
        progress: Math.min(1, Math.max(0, scrollY / max)),
        scrolled: scrollY > threshold,
        scrollingDown: scrollY > previous && scrollY > threshold,
      });

      previous = scrollY;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return state;
}
