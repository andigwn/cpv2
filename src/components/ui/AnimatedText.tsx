"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  /** Words are wrapped individually so they can stagger in. */
  text: string;
  as?: keyof typeof MOTION_TAGS;
  className?: string;
  wordClassName?: string;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  once?: boolean;
};

// Motion components are created once at module scope (not during render).
const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", rotateX: -35 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Word-by-word headline reveal. Used everywhere except the Home hero, which uses the
 * typewriter effect instead (prd.md section 13a).
 */
export function AnimatedText({
  text,
  as = "h2",
  className,
  wordClassName,
  stagger = 0.06,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const MotionTag = MOTION_TAGS[as] ?? MOTION_TAGS.h2;

  return (
    <MotionTag
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      className={cn("inline-block [perspective:800px]", className)}
    >
      {words.map((item, index) => (
        <span key={`${item}-${index}`} className="inline-block overflow-hidden pb-[0.08em]">
          <motion.span
            variants={word}
            className={cn("inline-block will-change-transform", wordClassName)}
          >
            {item}
            {index < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

type AnimatedTextListProps = {
  lines: ReactNode[];
  className?: string;
};

/** Staggered vertical list of arbitrary nodes (used for feature bullets). */
export function AnimatedTextList({ lines, className }: AnimatedTextListProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {lines.map((line, index) => (
        <motion.li key={index} variants={word} className="will-change-transform">
          {line}
        </motion.li>
      ))}
    </motion.ul>
  );
}
