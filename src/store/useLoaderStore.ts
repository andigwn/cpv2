"use client";

import { create } from "zustand";

type LoaderState = {
  /** True while the intro preloader is still on screen. */
  isLoading: boolean;
  /** Becomes true after the first intro finished (guards re-runs on route change). */
  hasLoaded: boolean;
  finish: () => void;
  restart: () => void;
};

/** Intro preloader state (prd.md section 9). */
export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: true,
  hasLoaded: false,
  finish: () => set({ isLoading: false, hasLoaded: true }),
  restart: () => set({ isLoading: true, hasLoaded: false }),
}));
