"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "@/lib/animations";

/**
 * Route transition: `AnimatePresence` keys on the pathname so each page fades/slides in
 * and out (prd.md section 8).
 *
 * `initial` is deliberately left at its default: `initial={false}` here also disables the
 * mount animation of every motion element nested in the page (presence context is
 * inherited), which silently killed all card, heading and FadeIn reveals. The page's own
 * first-load animation stays hidden behind the intro preloader, so nothing is visible.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex min-h-screen flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
