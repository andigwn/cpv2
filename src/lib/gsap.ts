/**
 * Single entry point for GSAP + ScrollTrigger.
 *
 * Registering the plugin more than once logs a warning, and importing GSAP from
 * several components would do exactly that, so the registration happens here once.
 * `ScrollTrigger.config({ ignoreMobileResize: true })` stops the mobile URL bar
 * from firing a refresh on every scroll, and `lagSmoothing(0)` keeps scrubbed
 * timelines honest when Lenis is animating scroll.
 *
 * Client-only: GSAP itself is SSR-safe, but ScrollTrigger needs a real DOM, so
 * everything is guarded behind `typeof window`.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
