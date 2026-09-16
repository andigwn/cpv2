/**
 * Framer Motion variants, transitions and easings used across the whole site.
 * prd.md section 6 requires every animation object to live here instead of being
 * re-declared inside components.
 */
import type { TargetAndTransition, Transition, Variants } from "framer-motion";

/** "easeInOutExpo"-style curve used for smooth crossfades (prd.md section 12). */
export const EASE_CINEMATIC = [0.43, 0.13, 0.23, 0.96] as const;
/** Softer editorial curve for text and cards. */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;
/** Symmetric in-out curve used by the infinite background pan/zoom loops. */
export const EASE_IN_OUT = [0.42, 0, 0.58, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  crossfade: 2,
  kenBurns: 7,
} as const;

/** Hero rotating background timings (prd.md section 12). */
export const ROTATION = {
  /** How long a single photo stays on screen. */
  intervalMs: 7000,
  /** Dual-layer crossfade duration in seconds (1.5s - 2.5s). */
  crossfadeSeconds: 2,
  /** Slow alternating zoom duration in seconds. */
  zoomSeconds: 7,
  /** Zoom strength: odd frames zoom in, even frames zoom out. */
  zoomScale: 1.08,
} as const;

export const viewportOnce = { once: true, amount: 0.25 } as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_SOFT },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE_SOFT } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE_SOFT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASE_SOFT } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const staggerFastContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_SOFT } },
};

/** Section heading reveal: clip-path wipe, editorial feel. */
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DURATION.slow, ease: EASE_SOFT },
  },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: DURATION.fast, ease: EASE_SOFT } },
} as const;

export const imageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.8, ease: EASE_SOFT } },
} as const;

export const overlayHover = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: DURATION.fast } },
} as const;

/** Page transition variants (used by PageTransition.tsx). */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_SOFT, when: "beforeChildren" },
  },
  exit: { opacity: 0, y: -12, transition: { duration: DURATION.fast, ease: EASE_IN_OUT } },
};

/** Background image loop variants driven by `data/sectionBackgrounds.ts`. */
export const sectionLoopVariants: Record<
  "pan" | "zoom",
  { animate: TargetAndTransition; transition: Transition }
> = {
  pan: {
    animate: { x: ["0%", "-3%", "0%"] },
    transition: { duration: 20, repeat: Infinity, ease: EASE_IN_OUT },
  },
  zoom: {
    animate: { scale: [1, 1.06, 1] },
    transition: { duration: 12, repeat: Infinity, ease: EASE_IN_OUT },
  },
};

export const navbarVariants: Variants = {
  top: { y: 0, backgroundColor: "rgba(255,255,255,0)" },
  scrolled: { y: 0, backgroundColor: "rgba(255,255,255,0.86)" },
  hidden: { y: "-110%" },
};

export const mobileMenuVariants: Variants = {
  closed: { opacity: 0, y: "-100%", transition: { duration: 0.4, ease: EASE_IN_OUT } },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SOFT } },
};

export const preloaderVariants: Variants = {
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.6, ease: EASE_IN_OUT } },
};
