"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { headingReveal, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

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

/** Editorial section heading used by every section on the site. */
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
            tone === "light" ? "text-white/90" : "text-lagoon-700",
            centered && "self-center",
          )}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.h2
        variants={headingReveal}
        className={cn(
          "max-w-3xl text-3xl leading-[1.05] sm:text-4xl lg:text-5xl",
          tone === "light" && "text-white drop-shadow-[0_2px_18px_rgba(19,25,34,0.35)]",
          titleClassName,
        )}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={staggerItem}
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-white/85" : "text-ink-600",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
