"use client";

import { create } from "zustand";

type CarouselState = {
  /** Index of the visible highlight slide. */
  activeIndex: number;
  /** True while the user drags/swipes (pauses the autoplay timer). */
  isPaused: boolean;
  setActiveIndex: (index: number) => void;
  next: (length: number) => void;
  previous: (length: number) => void;
  pause: () => void;
  resume: () => void;
};

/**
 * Optional global carousel state so the home highlight carousel can be driven
 * from more than one place (chips, arrows, autoplay) without prop drilling.
 */
export const useCarouselStore = create<CarouselState>((set, get) => ({
  activeIndex: 0,
  isPaused: false,
  setActiveIndex: (index) => set({ activeIndex: index }),
  next: (length) => {
    if (length <= 0) return;
    set({ activeIndex: (get().activeIndex + 1) % length });
  },
  previous: (length) => {
    if (length <= 0) return;
    set({ activeIndex: (get().activeIndex - 1 + length) % length });
  },
  pause: () => set({ isPaused: true }),
  resume: () => set({ isPaused: false }),
}));
