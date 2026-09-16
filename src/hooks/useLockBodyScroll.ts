"use client";

import { useEffect } from "react";

/**
 * Locks body scrolling (used by the mobile menu and the preloader).
 * Also stops Lenis so momentum scrolling cannot leak through the overlay.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.classList.add("lenis-stopped");

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [locked]);
}
