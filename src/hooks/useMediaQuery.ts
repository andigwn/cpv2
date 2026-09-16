"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook.
 * Always returns `defaultValue` on the server so the hydration output matches, then
 * subscribes to the real MediaQueryList on the client.
 */
export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Sync once on mount, then react to changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- subscribing to an external system (matchMedia)
    setMatches(list.matches);

    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const MEDIA_QUERIES = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  mobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;
