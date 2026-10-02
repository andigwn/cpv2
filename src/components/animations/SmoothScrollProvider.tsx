"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Lenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
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
  // visitor cannot scroll down to the footer until the window is resized. The same
  // observer lets ScrollTrigger remeasure when the page grows or shrinks (language
  // switch, images decoding, a band opening).
  useEffect(() => {
    const lenis = lenisRef?.lenis;
    if (!lenis) return;

    let frame = 0;
    const observer = new ResizeObserver(() => {
      lenis.resize();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [lenisRef]);

  // Lenis animates the native scroll position, so ScrollTrigger has to be told about
  // every smoothed tick; otherwise scrubbed card/text animations lag a frame behind.
  useEffect(() => {
    const lenis = lenisRef?.lenis;
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
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
        ScrollTrigger.refresh();
      }, 450);
      return () => clearTimeout(settle);
    }

    lenis.scrollTo(0, { immediate: true });
    // The incoming page may still be mounting: recalculate once after paint and once
    // after the page transition so the new document height is picked up.
    const frame = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    const settle = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 700);

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
        // Duration + easing is the glide Lenis actually uses for the wheel; a slightly
        // longer tail (1.25s) gives the page the same heavy-camera feel as the springs.
        duration: 1.25,
        // Kept as the fallback for any code path without a duration (e.g. programmatic).
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        // Native touch scrolling stays untouched — smoothing it fights the OS.
        syncTouch: false,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </Lenis>
  );
}
