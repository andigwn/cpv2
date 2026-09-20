"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { AnimatedText } from "@/components/ui/AnimatedText";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  /** Renders on top of a busy background: adds a soft white plate behind the text. */
  plate?: boolean;
};

/**
 * Editorial section heading used by every content band.
 *
 * The title reveals word by word (AnimatedText) instead of appearing as a static block,
 * so every band has movement in the type itself, not only in the images.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  titleClassName,
  plate = false,
}: SectionTitleProps) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        plate && "rounded-3xl bg-white/70 p-6 backdrop-blur-md sm:p-8",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          variants={staggerItem}
          className={cn(
            "inline-flex w-fit items-center gap-2 text-[0.7rem] font-semibold tracking-[0.28em] uppercase",
            light ? "text-white/90" : "text-lagoon-700",
            centered && "self-center",
          )}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </motion.span>
      ) : null}

      <AnimatedText
        as="h2"
        text={title}
        stagger={0.05}
        className={cn(
          "max-w-3xl text-3xl leading-[1.05] sm:text-4xl lg:text-5xl",
          light && "text-white drop-shadow-[0_2px_18px_rgba(19,25,34,0.35)]",
          titleClassName,
        )}
      />

      {description ? (
        <motion.p
          variants={staggerItem}
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-white/85" : "text-ink-600",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
