"use client";

import { MEDIA_QUERIES, useMediaQuery } from "./useMediaQuery";

/**
 * True when the visitor asked the OS/browser for reduced motion.
 * Every animated background + the typewriter consult this hook (prd.md section 4a & 13).
 */
export function usePrefersReducedMotion() {
  return useMediaQuery(MEDIA_QUERIES.reduceMotion, false);
}
