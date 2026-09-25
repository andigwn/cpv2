/**
 * Framer Motion variants, transitions and easings used across the whole site.
 * prd.md section 6 requires every animation object to live here instead of being
 * re-declared inside components.
 */
import type { Variants } from "framer-motion";

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

/**
 * Shared rhythm for the alternating photo/content bands on the home page and the
 * long-form inner pages. Keeping the values here means every band transition moves
 * with the same timing, the way prd.md section 6 asks.
 */
export const BAND = {
  /**
   * Photo-band height in svh. 240svh gives a 140svh pinned beat (100svh to rise into
   * view, 140svh pinned while the photo holds and is covered) — longer and heavier
   * than the old 100svh pin, per the "section lebih lebar" request.
   */
  photoHeightSvh: 240,
  /**
   * How far a content sheet pulls up over the photo above it, in svh. The sheet's box
   * ends exactly where the band starts, so the whole cover happens while the photo is
   * still — the reference's signature move.
   */
  overlapSvh: 100,
  /**
   * First-scroll hold on the home hero, in svh: the photo stays pinned and still for one
   * beat so the intro copy animates before the About sheet starts covering it.
   */
  heroHoldSvh: 80,
  /** Pinned photo eases in from this scale (subtle push-in on arrival). */
  entryScale: 1.12,
  /** Pinned photo eases back to this scale while the content sheet covers it. */
  exitScale: 0.94,
  /** Slow alternating Ken Burns zoom shared by the photo bands and the video band. */
  kenBurnsSeconds: 28,
  /** Ken Burns peak scale. */
  kenBurnsScale: 1.06,
} as const;

/**
 * Pin window derived from the band geometry: the sticky frame pins from the moment the
 * band top reaches the viewport top until its bottom reaches the viewport bottom.
 * With `photoHeightSvh` = 240: start = 100/340, end = 240/340.
 */
export const BAND_PIN_WINDOW = [
  100 / (BAND.photoHeightSvh + 100),
  BAND.photoHeightSvh / (BAND.photoHeightSvh + 100),
] as const;

/**
 * Journey fraction where the next content sheet's top edge enters the viewport bottom,
 * derived from the geometry: `(photoHeightSvh - overlapSvh) / (photoHeightSvh + 100)`.
 * The pinned photo holds alone before this point, then dollies back while the sheet
 * covers it.
 */
export const BAND_COVER_START =
  (BAND.photoHeightSvh - BAND.overlapSvh) / (BAND.photoHeightSvh + 100);

/**
 * Image bands show their own photo from the first
 * pixel — no reveal fade — so the sticky hero behind the page can never show through
 * the band area. Backgrounds stay fully sharp at every scroll position (the crisp,
 * cinematic look requested for the divider bands).
 */

/** Inline style for a sheet that overlaps the photo band above it. */
export const bandOverlapStyle = { marginTop: `-${BAND.overlapSvh}svh` } as const;

/**
 * Spring smoothing applied to scroll-linked motion values.
 *
 * The reference scrubs its timelines (`scrub: 2`), so its pinned media trails the
 * scroll slightly instead of being welded to it. A soft spring on the continuous
 * transforms (scale, drift, veil) reproduces that trailing, heavy-camera feel
 * with Framer Motion; entrance fades stay unsmoothed so arrivals stay crisp.
 */
export const SCRUB_SPRING = { stiffness: 90, damping: 24, mass: 0.6 } as const;

/**
 * Hero brand reveal (the reference's entrance-message mask): after the intro copy clears,
 * the official logo is unmasked by a circle growing out of the lower half of the frame,
 * while the photograph eases back from its starting push-in.
 */
export const HERO_REVEAL = {
  /** Slide of the hero hold (0-1) where the reveal plays, leaving the tail calm. */
  window: [0.16, 0.9] as const,
  /** Mask circle radius as a percentage of the gradient ray at start and end. */
  radius: [0, 118] as const,
  /** Wordmark scale as the mask opens: settles into place. */
  wordmarkScale: [1.1, 1] as const,
} as const;

/**
 * Closing band: the photo pins and keeps pushing in while a veil deepens, then the closing
 * message rises over it (the reference's final + outro beat) before the footer arrives.
 */
export const FINALE = {
  heightSvh: 220,
  /** Pin window where the veil fades to its darkest. */
  veilWindow: [0.2, 0.6] as const,
  /** Pin window where the closing message rises in. */
  messageWindow: [0.52, 0.88] as const,
  messageTravel: 40,
  messageScale: [0.97, 1] as const,
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
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE_SOFT },
  },
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

export const navbarVariants: Variants = {
  top: { y: 0, backgroundColor: "rgba(255,255,255,0)" },
  scrolled: { y: 0, backgroundColor: "rgba(255,255,255,0.86)" },
  hidden: { y: "-110%" },
};

export const mobileMenuVariants: Variants = {
  closed: { opacity: 0, y: "-100%", transition: { duration: 0.4, ease: EASE_IN_OUT } },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SOFT } },
};

/**
 * Desktop "Destinasi" dropdown: the panel eases in, then its unit links stagger
 * upward behind it so the menu unfolds instead of appearing all at once.
 */
export const navPanelVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: EASE_SOFT,
      when: "beforeChildren",
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: 8, scale: 0.985, transition: { duration: 0.16, ease: EASE_SOFT } },
};

/** One unit link inside the dropdown panel. */
export const navPanelItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE_SOFT } },
};

/** One child link inside the mobile drawer accordion; `custom` is the item index. */
export const mobileSubmenuItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: EASE_SOFT, delay: 0.05 + index * 0.04 },
  }),
};

export const preloaderVariants: Variants = {
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.6, ease: EASE_IN_OUT } },
};
