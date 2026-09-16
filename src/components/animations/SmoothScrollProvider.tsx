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

  useEffect(() => {
    if (!lenisRef?.lenis) return;
    lenisRef.lenis.scrollTo(0, { immediate: true });
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
