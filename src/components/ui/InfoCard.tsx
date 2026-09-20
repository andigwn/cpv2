"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { staggerItem, viewportOnce } from "@/lib/animations";

type InfoCardProps = {
  title: string;
  body?: string;
  eyebrow?: string;
  icon?: ReactNode;
  /** Optional footer slot: a link, a price, a tag row. */
  footer?: ReactNode;
  /** Turns the whole card into a link. */
  href?: string;
  titleClassName?: string;
  className?: string;
  /** Pass when the card sits inside a StaggerContainer so the parent drives the timing. */
  variants?: Variants;
};

const MotionLink = motion.create(Link);

/**
 * Compact card used by the content bands.
 *
 * The bands are meant to read as cards rather than walls of copy, so titles, stats,
 * values, FAQ entries, benefits and list items all funnel through this one shape. It
 * animates itself in when it stands alone and defers to its StaggerContainer when
 * nested, and lifts slightly on hover.
 */
export function InfoCard({
  title,
  body,
  eyebrow,
  icon,
  footer,
  href,
  titleClassName,
  className,
  variants,
}: InfoCardProps) {
  const entrance = variants ?? staggerItem;
  const standalone = !variants;

  const inner = (
    <>
      {icon ? (
        <span className="bg-lagoon-50 text-lagoon-700 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
          {icon}
        </span>
      ) : null}

      {eyebrow ? (
        <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
          {eyebrow}
        </span>
      ) : null}

      <h3 className={cn("font-display text-lg leading-snug font-bold text-ink-900", titleClassName)}>
        {title}
      </h3>

      {body ? <p className="text-sm leading-relaxed text-ink-600">{body}</p> : null}
      {footer ? <div className="mt-auto pt-3">{footer}</div> : null}
    </>
  );

  const motionProps = {
    variants: entrance,
    initial: standalone ? "hidden" : undefined,
    whileInView: standalone ? "visible" : undefined,
    viewport: standalone ? viewportOnce : undefined,
    whileHover: { y: -6 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
    className: cn(
      "group flex h-full flex-col gap-3 rounded-3xl border border-white/70 bg-white/75 p-6 backdrop-blur-sm",
      "shadow-[0_20px_50px_-40px_rgba(19,25,34,0.5)] transition-shadow duration-500",
      "hover:shadow-[0_30px_70px_-45px_rgba(19,25,34,0.6)]",
      className,
    ),
  } as const;

  if (href) {
    return (
      <MotionLink href={href} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  return <motion.article {...motionProps}>{inner}</motion.article>;
}
