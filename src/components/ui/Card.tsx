"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import { imageHover, staggerItem, viewportOnce } from "@/lib/animations";

type CardProps = {
  image: ImageAsset;
  title: string;
  description?: string;
  eyebrow?: string;
  meta?: ReactNode;
  /** Optional footer row: tags, price, actions. */
  footer?: ReactNode;
  href?: string;
  ctaLabel?: string;
  className?: string;
  imageClassName?: string;
  /** Image aspect ratio, e.g. "aspect-[4/3]". */
  ratio?: string;
  /** Colour of the hover overlay. */
  accent?: "lagoon" | "sunshine" | "leaf" | "coral" | "none";
  priority?: boolean;
  /** Provide when the card sits inside a StaggerContainer. */
  variants?: Variants;
};

// Motion components are created once at module scope (not during render).
const MotionLink = motion.create(Link);

const accentClasses = {
  lagoon: "from-lagoon-900/70 via-lagoon-700/25 to-transparent",
  sunshine: "from-sunshine-900/65 via-sunshine-600/20 to-transparent",
  leaf: "from-leaf-900/70 via-leaf-700/20 to-transparent",
  coral: "from-coral-600/70 via-coral-400/20 to-transparent",
  none: "from-ink-900/65 via-ink-900/20 to-transparent",
} as const;

const titleHover: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Generic image card used for services, news, works and team entries.
 * Presentational only — data arrives through props (prd.md section 6).
 */
export function Card({
  image,
  title,
  description,
  eyebrow,
  meta,
  footer,
  href,
  ctaLabel = "Selengkapnya",
  className,
  imageClassName,
  ratio = "aspect-[4/3]",
  accent = "lagoon",
  priority = false,
  variants,
}: CardProps) {
  const entrance = variants ?? staggerItem;
  const hoverState = variants ? undefined : "hover";
  const restingState = variants ? undefined : "rest";

  const inner = (
    <>
      <div className={cn("relative overflow-hidden", ratio, imageClassName)}>
        <motion.div
          variants={variants ? undefined : imageHover}
          initial={variants ? { scale: 1 } : undefined}
          whileHover={variants ? { scale: 1.06 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover"
          />
        </motion.div>

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-500 group-hover/card:opacity-90",
            accentClasses[accent],
          )}
        />

        {eyebrow ? (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-ink-700 uppercase backdrop-blur-md">
            {eyebrow}
          </span>
        ) : null}

        {href ? (
          <span className="absolute right-4 bottom-4 z-10 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white/90 text-ink-800 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">{ctaLabel}</span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {meta ? (
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500">{meta}</div>
        ) : null}
        <motion.h3
          variants={variants ? undefined : titleHover}
          className="text-lg leading-snug sm:text-xl"
        >
          {title}
        </motion.h3>
        {description ? <p className="text-sm leading-relaxed text-ink-600">{description}</p> : null}
        {footer ? <div className="mt-auto pt-3">{footer}</div> : null}
      </div>
    </>
  );

  const shellClasses = cn(
    "group/card relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_18px_50px_-34px_rgba(19,25,34,0.4)] backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_-36px_rgba(19,25,34,0.45)]",
    className,
  );

  const motionProps = {
    variants: entrance,
    initial: variants ? undefined : restingState,
    whileHover: hoverState,
    animate: variants ? undefined : restingState,
    whileInView: variants ? undefined : "visible",
    viewport: variants ? undefined : viewportOnce,
    className: shellClasses,
  } as const;

  if (href) {
    return (
      <MotionLink href={href} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  return <motion.div {...motionProps}>{inner}</motion.div>;
}
