"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin page-wide reading indicator pinned to the very top of the viewport. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="from-lagoon-500 via-leaf-400 to-sunshine-400 fixed inset-x-0 top-0 z-60 h-0.75 origin-left bg-linear-to-r"
    />
  );
}
