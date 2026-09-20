"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionBackgroundConfig } from "@/types";
import { EASE_CINEMATIC, EASE_SOFT } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  background: SectionBackgroundConfig;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

/**
 * Inner-page opening band.
 *
 * Same visual language as ImageBand: a full-bleed photograph that fades into the
 * broken-white canvas at the bottom instead of ending on a divider, with the page
 * title set over it so it stays readable on any photo.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  background,
  breadcrumbs,
  children,
  className,
  align = "left",
}: PageHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const centered = align === "center";

  // Banner backgrounds are always image loops; the video shape only carries a poster.
  const imageSrc = background.type === "video" ? background.poster : background.src;
  const imageAlt = background.type === "video" ? title : background.alt;

  return (
    <section className={cn("relative isolate flex min-h-[68vh] items-end overflow-hidden", className)}>
      <motion.div
        className="absolute inset-[-6%]"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: EASE_CINEMATIC }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority
          quality={75}
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-sand-100 via-sand-100/45 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sand-100/80 to-transparent sm:h-44"
      />

      <div className="shell relative z-10 pt-40 pb-16 sm:pb-20 lg:pb-24">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-600">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label + "-" + index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-lagoon-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-800">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <ChevronRight className="h-3 w-3 text-ink-400" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_SOFT }}
            className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.28em] text-lagoon-700 uppercase"
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.08 }}
            className="mt-4 font-display text-4xl leading-[1.03] text-ink-900 sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.18 }}
              className="mt-4 text-base leading-relaxed text-ink-600"
            >
              {description}
            </motion.p>
          ) : null}

          {children ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.26 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
