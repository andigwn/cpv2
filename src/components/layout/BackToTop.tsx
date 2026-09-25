"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/Button";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_SOFT } from "@/lib/animations";

/** Scroll distance (px) before the shortcut appears. */
const VISIBLE_AFTER = 560;

/**
 * Floating shortcut pinned to the bottom-right corner. It only exists after the visitor
 * has scrolled past the fold and glides back to the top through Lenis when available,
 * falling back to the native smooth scroll when reduced motion disables the provider.
 */
export function BackToTop() {
  const { scrolled } = useScrollProgress(VISIBLE_AFTER);
  const lenis = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {scrolled ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: EASE_SOFT }}
          className="fixed right-5 bottom-5 z-30 sm:right-8 sm:bottom-8"
        >
          <Button
            type="button"
            variant="primary"
            size="sm"
            aria-label="Kembali ke atas"
            onClick={scrollToTop}
            className="h-12 w-12 p-0"
          >
            <ChevronsUp className="h-5 w-5" aria-hidden />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
