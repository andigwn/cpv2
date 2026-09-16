"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerFastContainer } from "@/lib/animations";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  /** `normal` = 120ms between children, `fast` = 60ms. */
  speed?: "normal" | "fast";
  once?: boolean;
  amount?: number;
  /** Extra delay before the first child animates. */
  delay?: number;
  as?: keyof typeof MOTION_TAGS;
  variants?: Variants;
};

// Motion components are created once at module scope (not during render).
const MOTION_TAGS = {
  div: motion.div,
  ul: motion.ul,
  section: motion.section,
  article: motion.article,
} as const;

/**
 * Parent that sequences its children: every direct child must use `staggerItem`
 * (or any variant with `hidden`/`visible` keys).
 */
export function StaggerContainer({
  children,
  className,
  speed = "normal",
  once = true,
  amount = 0.2,
  delay = 0,
  as = "div",
  variants,
}: StaggerContainerProps) {
  const MotionTag = MOTION_TAGS[as] ?? MOTION_TAGS.div;
  const base = variants ?? (speed === "fast" ? staggerFastContainer : staggerContainer);

  const merged: Variants =
    delay > 0
      ? {
          hidden: base.hidden,
          visible: {
            ...base.visible,
            transition: {
              ...(base.visible as { transition?: object }).transition,
              delayChildren: delay,
            },
          },
        }
      : base;

  return (
    <MotionTag
      variants={merged}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
