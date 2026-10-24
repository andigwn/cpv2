"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionBackgroundConfig } from "@/types";
import { EASE_CINEMATIC, EASE_SOFT } from "@/lib/animations";
import { photoRatio, type AspectRatioStyle } from "@/lib/photoFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MEDIA_QUERIES, useMediaQuery } from "@/hooks/useMediaQuery";
import { useT } from "@/i18n/useTranslation";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  background: SectionBackgroundConfig;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /**
   * Canvas veils that blend the photo into the page. `"none"` leaves the photograph
   * fully visible with no gradient over it.
   */
  veil?: "canvas" | "none";
};

/**
 * Inner-page opening band.
 *
 * Same visual language as ImageBand: a full-bleed photograph that fades into the
 * broken-white canvas at the bottom instead of ending on a divider, with the page
 * title set over it so it stays readable on any photo.
 *
 * ## Fitting
 *
 * From `sm` up the section is a single full-bleed cover frame with the copy layered on top,
 * exactly as before.
 *
 * On a phone the copy moves below the photograph onto the page canvas, and the photo becomes a
 * full-bleed strip shaped like the photograph itself. Covering a portrait strip with landscape
 * photography would throw the picture away, and containing it would leave empty bands on either
 * side that previously had to be papered over with a blurred second copy of the same image —
 * an extra full-size request and a smear behind the title. Matching the frame's aspect ratio to
 * the photo removes both failure modes: the picture runs edge to edge, complete, with the title
 * underneath on clean canvas.
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
  veil = "canvas",
}: PageHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isWide = useMediaQuery(MEDIA_QUERIES.sm);
  const t = useT();
  const centered = align === "center";
  // With the canvas veils off, the copy sits directly on the photograph from `sm` up and
  // has to switch to a light tone. Phones keep the dark copy below the photo on canvas.
  const onPhoto = veil === "none";

  // Phone strip shape, resolved before first paint so the layout never jumps.
  const stripStyle: AspectRatioStyle = { "--hero-ar": photoRatio(background.src).css };

  return (
    <section
      className={cn(
        // Phones reserve the fixed header's height so the photo strip starts below the
        // navbar and the logo keeps its contrast against the canvas, instead of sitting
        // on top of the photograph.
        "relative isolate flex flex-col overflow-hidden pt-(--site-header-height) sm:min-h-[68vh] sm:justify-end sm:pt-0",
        className,
      )}
    >
      {/* Phone: a full-bleed strip as tall as the photograph needs at full width, so the
          picture is complete and fills the frame instead of being cropped or letterboxed. */}
      <div
        style={stripStyle}
        className="relative aspect-(--hero-ar) w-full shrink-0 overflow-hidden sm:hidden"
      >
        <Image
          src={background.src}
          alt={background.alt}
          fill
          sizes="100vw"
          priority
          quality={75}
          className="object-cover"
        />
      </div>

      {/* sm and up: full-bleed cover with the slow Ken Burns drift. */}
      <motion.div
        className="absolute inset-[-6%] hidden sm:block"
        animate={prefersReducedMotion || !isWide ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: EASE_CINEMATIC }}
      >
        <Image
          src={background.src}
          alt={background.alt}
          fill
          sizes="100vw"
          priority
          quality={75}
          className="object-cover"
        />
      </motion.div>

      {/* The veils only exist to blend the full-bleed desktop photo into the canvas. */}
      {veil === "canvas" ? (
        <>
          <div
            aria-hidden
            className="from-sand-100 via-sand-100/45 absolute inset-0 hidden bg-linear-to-t to-transparent sm:block"
          />
          <div
            aria-hidden
            className="from-sand-100/80 absolute inset-x-0 top-0 hidden h-32 bg-linear-to-b to-transparent sm:h-44"
          />
        </>
      ) : null}

      <div className="shell relative z-10 pt-8 pb-14 sm:pt-40 sm:pb-20 lg:pb-24">
        {breadcrumbs?.length ? (
          <nav aria-label={t("a11y.breadcrumb")} className="mb-6">
            <ol
              className={cn(
                "text-ink-600 flex flex-wrap items-center gap-2 text-xs",
                onPhoto && "sm:text-white/85",
              )}
            >
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label + "-" + index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={cn(
                        "hover:text-lagoon-700 transition-colors",
                        onPhoto && "sm:hover:text-white",
                      )}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className={cn("text-ink-800", onPhoto && "sm:text-white")}
                    >
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <ChevronRight
                      className={cn("text-ink-400 h-3 w-3", onPhoto && "sm:text-white/60")}
                      aria-hidden
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div
          className={cn(
            "max-w-2xl",
            centered && "mx-auto text-center",
            onPhoto &&
              "sm:[text-shadow:0_1px_2px_rgba(19,25,34,0.95),0_0_10px_rgba(19,25,34,0.75),0_2px_24px_rgba(19,25,34,0.45)]",
          )}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_SOFT }}
            className={cn(
              "text-lagoon-700 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.28em] uppercase",
              onPhoto && "sm:text-white",
            )}
          >
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.8, ease: EASE_SOFT, delay: 0.08 }}
            className={cn(
              "font-display text-ink-900 mt-4 text-4xl leading-[1.03] sm:text-5xl lg:text-6xl",
              onPhoto && "sm:text-white",
            )}
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.18 }}
              className={cn(
                "text-ink-600 mt-4 text-base leading-relaxed",
                onPhoto && "sm:text-white",
              )}
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
