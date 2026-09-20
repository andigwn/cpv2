"use client";

import { useEffect, useState } from "react";

/**
 * Current viewport height in pixels, SSR-safe.
 *
 * Scroll-linked transitions use this instead of hard-coded pixel windows so the timing
 * stays the same on phones and desktops. The fallback matches the tallest common mobile
 * viewport until the effect syncs the real value on mount.
 */
export function useViewportHeight(fallback = 720) {
  const [height, setHeight] = useState(fallback);

  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}
