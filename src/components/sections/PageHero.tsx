"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionBackgroundConfig } from "@/types";
import { EASE_SOFT } from "@/lib/animations";
import { SectionBackground } from "@/components/animations/SectionBackground";

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
 * Compact page banner used by every inner page. It reuses `SectionBackground`, so inner
 * pages also get an animated background instead of a flat colour (prd.md section 4a).
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
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-[calc(var(--site-header-height)+4rem)] pb-16 lg:pb-20",
        className,
      )}
    >
      <SectionBackground {...background} />

      <div className="shell relative z-10">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-lagoon-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-700">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <ChevronRight className="h-3 w-3 text-ink-300" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_SOFT }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-lagoon-200 bg-white/80 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.22em] text-lagoon-700 uppercase backdrop-blur-md",
              centered && "mx-auto",
            )}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lagoon-500" />
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.08 }}
            className="mt-5 text-4xl leading-[1.03] sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.2 }}
              className={cn(
                "mt-5 text-base leading-relaxed text-ink-600 sm:text-lg",
                centered && "mx-auto",
              )}
            >
              {description}
            </motion.p>
          ) : null}

          {children ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.3 }}
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
