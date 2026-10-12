"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Fragment, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionBackgroundConfig } from "@/types";
import { DESTINATION_HERO, EASE_CINEMATIC, EASE_SOFT, SCRUB_SPRING } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useT } from "@/i18n/useTranslation";

type DestinationHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  background: SectionBackgroundConfig;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  className?: string;
};

/**
 * Opening frame for a destination page: the five business units and the four restaurants.
 *
 * ## Same frame as the home hero
 *
 * One full-bleed photograph filling the whole first screen, a dark scrim instead of the sand
 * veils `PageHero` uses, and the copy set in white over the photo. Nothing in the frame is
 * blurred — not the photograph, not a placeholder, not the chrome — because this is an
 * immersive opener, and a softened picture reads as a mistake rather than as atmosphere.
 * The frame fills on every screen for the same reason the home hero does: a landscape
 * photograph boxed into a portrait strip throws the picture away.
 *
 * ## A different performance
 *
 * The home hero rotates photographs under a wavy mask wipe and later opens an iris on the
 * wordmark. A destination has one fixed photograph, so there is nothing to wipe between:
 * here the frame is *drawn* once instead. A curtain edge crosses it while the photo settles
 * out of a single slow push-in, and the title arrives word by word from behind its own
 * masks. Both play once and stop — the destination settles into a poster for that building
 * instead of drifting while it is being read.
 */
export function DestinationHero({
  eyebrow,
  title,
  description,
  background,
  breadcrumbs,
  children,
  className,
}: DestinationHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();

  // Scroll-linked drift as the frame leaves: the photograph trails the copy, so the page
  // feels like it is walking out from behind a still image. Springed, so it glides rather
  // than tracking the wheel.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawPhotoY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${DESTINATION_HERO.driftPercent}%`],
  );
  const photoY = useSpring(rawPhotoY, SCRUB_SPRING);
  const rawCopyY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${DESTINATION_HERO.driftPercent * 0.35}%`],
  );
  const copyY = useSpring(rawCopyY, SCRUB_SPRING);

  const driftStyle = prefersReducedMotion ? undefined : { y: photoY };
  const copyStyle = prefersReducedMotion ? undefined : { y: copyY };
  const still = prefersReducedMotion;

  const words = title.split(" ");

  return (
    <section
      ref={sectionRef}
      className={cn(
        // Same geometry as the home hero: a full first screen with the fixed header's height
        // reserved above the copy and room at the bottom for the scroll cue.
        "relative isolate flex min-h-svh items-center overflow-hidden pt-[calc(var(--site-header-height)+2rem)] pb-32",
        className,
      )}
    >
      {/* The photograph. Dark base behind it so the frame is never a white flash while the
          image decodes. The curtain is a clip-path on the outermost layer, so the push-in
          underneath is already running before the edge reaches it. */}
      <div aria-hidden className="bg-ink-900 absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={still ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{
            duration: still ? 0 : DESTINATION_HERO.curtainSeconds,
            ease: EASE_CINEMATIC,
          }}
        >
          {/* Oversized so the drift has somewhere to go without exposing an edge. */}
          <motion.div className="absolute inset-[-9%]" style={driftStyle}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: still ? 1 : DESTINATION_HERO.zoom.from }}
              animate={{ scale: DESTINATION_HERO.zoom.to }}
              transition={{
                duration: still ? 0 : DESTINATION_HERO.zoom.seconds,
                ease: "linear",
              }}
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
          </motion.div>
        </motion.div>
      </div>

      {/* Contrast, not blur. Two stacked veils: one weights the bottom the way the home hero
          does, the other runs across the copy column so the left side of the frame stays
          readable whatever the photograph happens to be doing on the right. */}
      <div
        aria-hidden
        className="from-ink-900/85 via-ink-900/55 to-ink-900/40 sm:from-ink-900/70 sm:via-ink-900/30 sm:to-ink-900/15 absolute inset-0 bg-linear-to-t"
      />
      <div
        aria-hidden
        className="from-ink-900/80 via-ink-900/40 sm:from-ink-900/85 sm:via-ink-900/45 absolute inset-0 bg-linear-to-r to-transparent"
      />

      <motion.div style={copyStyle} className="shell relative z-10 w-full">
        <div className="max-w-3xl">
          {breadcrumbs?.length ? (
            <motion.nav
              aria-label={t("a11y.breadcrumb")}
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE_SOFT }}
            >
              <ol className="flex flex-wrap items-center gap-2 text-xs text-white/65">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.label + "-" + index} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-white">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white">
                        {crumb.label}
                      </span>
                    )}
                    {index < breadcrumbs.length - 1 ? (
                      <ChevronRight className="h-3 w-3 text-white/40" aria-hidden />
                    ) : null}
                  </li>
                ))}
              </ol>
            </motion.nav>
          ) : null}

          {/* Eyebrow: the rule draws out from the left and the label fades in behind it,
              rather than the pill the home hero uses. */}
          <div className="flex items-center gap-3">
            <motion.span
              aria-hidden
              className="bg-sunshine-300 h-px w-14 origin-left"
              initial={still ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: still ? 0 : DESTINATION_HERO.rule.seconds,
                delay: still ? 0 : DESTINATION_HERO.rule.delay,
                ease: EASE_CINEMATIC,
              }}
            />
            <motion.span
              className="text-[0.68rem] font-semibold tracking-[0.28em] text-white uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.12 }}
            >
              {eyebrow}
            </motion.span>
          </div>

          {/* Title: each word rises out of its own mask. The mask needs the extra vertical
              padding plus the matching negative margin, or a tall serif ascender gets shaved
              off at rest. The label is carried by `aria-label` because the words themselves
              are decorative, and the drop shadow is a filter on the whole heading so the
              glow is composited after the masks instead of being clipped by them. */}
          <h1
            aria-label={title}
            className="font-display mt-6 text-[2.4rem] leading-[1.06] font-bold text-white drop-shadow-[0_4px_30px_rgba(19,25,34,0.75)] sm:text-6xl lg:text-[4.5rem]"
          >
            {words.map((word, index) => (
              <Fragment key={word + "-" + index}>
                <span
                  aria-hidden
                  className="mt-[-0.12em] mb-[-0.16em] inline-block overflow-hidden pt-[0.12em] pb-[0.16em] align-bottom"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={still ? false : { y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: still ? 0 : DESTINATION_HERO.word.seconds,
                      delay: still
                        ? 0
                        : DESTINATION_HERO.word.delay + index * DESTINATION_HERO.word.stagger,
                      ease: EASE_SOFT,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {/* The separator sits outside the mask: whitespace at the end of an
                    inline-block is trimmed, which would run the words together. */}
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>

          {description ? (
            <motion.p
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: EASE_SOFT,
                delay: still ? 0 : DESTINATION_HERO.bodyDelay,
              }}
            >
              {description}
            </motion.p>
          ) : null}

          {children ? (
            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: EASE_SOFT,
                delay: still ? 0 : DESTINATION_HERO.bodyDelay + 0.1,
              }}
            >
              {children}
            </motion.div>
          ) : null}
        </div>
      </motion.div>

      {!still ? (
        <motion.div
          aria-hidden
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 lg:block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      ) : null}
    </section>
  );
}
