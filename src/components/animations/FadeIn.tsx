"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeIn, fadeInLeft, fadeInRight, scaleIn } from "@/lib/animations";

type Direction = "up" | "left" | "right" | "scale" | "none";

type FadeInProps = {
  children: ReactNode;
  /** Direction of the entrance motion. */
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: keyof typeof MOTION_TAGS;
};

// Motion components are created once at module scope (not during render).
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  li: motion.li,
  article: motion.article,
} as const;

const baseVariants = {
  up: fadeIn,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
} as const;

/** Scroll-triggered entrance wrapper: the single animation primitive of the site. */
export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration,
  className,
  once = true,
  amount = 0.25,
  as = "div",
}: FadeInProps) {
  const MotionTag = MOTION_TAGS[as] ?? MOTION_TAGS.div;

  return (
    <MotionTag
      variants={baseVariants[direction] ?? baseVariants.up}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay || duration ? { delay, duration } : undefined}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
