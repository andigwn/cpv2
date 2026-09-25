"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Lenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/**
 * Global momentum scrolling with Lenis.
 *
 * - Disabled entirely when the visitor prefers reduced motion.
 * - Scroll position resets to the top on route change so page transitions start clean.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const [lenisRef, setLenisRef] = useState<LenisRef | null>(null);

  // Keep Lenis' scroll limit in sync with the real document height. Without this,
  // a client-side navigation leaves the limit at the previous page's height and the
  // visitor cannot scroll down to the footer until the window is resized.
  useEffect(() => {
    const lenis = lenisRef?.lenis;
    if (!lenis) return;

    const observer = new ResizeObserver(() => lenis.resize());
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [lenisRef]);

  useEffect(() => {
    const lenis = lenisRef?.lenis;
    if (!lenis) return;

    // Deep link to an in-page section (e.g. /services#paket): after the new page has
    // painted, glide to the anchor instead of forcing the top of the document.
    const hash = window.location.hash;
    const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      const settle = setTimeout(() => {
        lenis.resize();
        lenis.scrollTo(target, { offset: -96 });
      }, 450);
      return () => clearTimeout(settle);
    }

    lenis.scrollTo(0, { immediate: true });
    // The incoming page may still be mounting: recalculate once after paint and once
    // after the page transition so the new document height is picked up.
    const frame = requestAnimationFrame(() => lenis.resize());
    const settle = setTimeout(() => lenis.resize(), 700);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [pathname, lenisRef]);

  useEffect(() => {
    if (!lenisRef?.lenis) return;
    if (prefersReducedMotion) {
      lenisRef.lenis.stop();
    } else {
      lenisRef.lenis.start();
    }
  }, [prefersReducedMotion, lenisRef]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <Lenis
      root
      ref={setLenisRef}
      options={{
        duration: 1.15,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </Lenis>
  );
}
