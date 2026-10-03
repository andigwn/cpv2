"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ChevronRight, PlayCircle } from "lucide-react";
import { BAND, HERO_REVEAL, ROTATION, SCRUB_SPRING } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import { useHeroBackgrounds } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";
import { Button } from "@/components/ui/Button";
import { RotatingBackground } from "@/components/animations/RotatingBackground";

/**
 * Home hero: rotating bright photography behind one static headline, then a staggered
 * fade-up for the subheadline and CTAs (prd.md section 4 & 13a).
 *
 * The hero is sticky, so it stays pinned for the whole first beat: an 80svh hold where
 * nothing moves, then the About sheet slides up over it while the copy parallaxes and
 * dissolves in sync with the cover.
 */
export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const vh = useViewportHeight();
  const hold = vh * (BAND.heroHoldSvh / 100);
  const t = useT();
  const backgrounds = useHeroBackgrounds();

  // The intro copy clears the frame first, then the brand reveal takes over, then the
  // About sheet covers everything (the cover runs from scroll `hold` to `hold + vh`).
  // Every scroll-linked value is springed, so the frame trails the scroll slightly and
  // the push-in and the iris feel physical instead of welded to the wheel.
  const rawContentY = useTransform(scrollY, [0, hold, hold + vh], [0, 0, vh * 0.2]);
  const contentY = useSpring(rawContentY, SCRUB_SPRING);
  const rawContentOpacity = useTransform(scrollY, [0, hold * 0.22, hold * 0.52], [1, 1, 0]);
  const contentOpacity = useSpring(rawContentOpacity, SCRUB_SPRING);

  // Brand reveal: a dark card carrying the wordmark is unmasked by a circle growing out of
  // the lower half of the frame, copying the reference's entrance-message mask.
  const revealStart = hold * HERO_REVEAL.window[0];
  const revealEnd = hold * HERO_REVEAL.window[1];
  const rawRevealProgress = useTransform(scrollY, [revealStart, revealEnd], [0, 1]);
  const revealProgress = useSpring(rawRevealProgress, SCRUB_SPRING);
  const revealRadius = useTransform(
    revealProgress,
    [0, 1],
    [HERO_REVEAL.radius[0], HERO_REVEAL.radius[1]],
  );
  // The outer stop trails the inner one so the mask edge is feathered instead of a hard,
  // aliased circle.
  const revealRadiusSoft = useTransform(revealRadius, (radius) => radius + 9);
  const revealMask = useMotionTemplate`radial-gradient(circle at 50% 84%, black 0%, black ${revealRadius}%, transparent ${revealRadiusSoft}%)`;
  const rawVeilOpacity = useTransform(
    scrollY,
    [revealStart, revealStart + (revealEnd - revealStart) * 0.6],
    [0, 1],
  );
  const veilOpacity = useSpring(rawVeilOpacity, SCRUB_SPRING);

  const parallaxStyle = prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <>
      <section
        id="hero"
        className="sticky top-0 isolate flex min-h-svh items-center overflow-hidden pt-[calc(var(--site-header-height)+2rem)] pb-32"
      >
        <div className="absolute inset-0 isolate z-0">
          <RotatingBackground
            slides={backgrounds.map((item) => ({ src: item.src, alt: item.alt }))}
            intervalMs={ROTATION.intervalMs}
            overlayClassName="bg-gradient-to-t from-ink-900/70 via-ink-900/30 to-ink-900/15"
          />
        </div>

        {/* Brand reveal: the official logo is unmasked by a growing circle, so the
          wordmark appears as if the camera iris opened on it. No dark card — the white
          logo sits directly on the photograph with a soft shadow for legibility.
          Decorative — the brand is already named in the header and footer. */}
        {!prefersReducedMotion ? (
          <motion.div
            aria-hidden
            style={{
              opacity: veilOpacity,
              WebkitMaskImage: revealMask,
              maskImage: revealMask,
            }}
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
              <span className="text-sunshine-300 text-[0.68rem] font-semibold tracking-[0.44em] uppercase drop-shadow-[0_2px_14px_rgba(19,25,34,0.8)]">
                {t("hero.location")}
              </span>
              <Image
                src="/images/logo.png"
                alt="Qubu Resort"
                width={800}
                height={145}
                className="h-auto w-[min(82vw,42rem)] brightness-0 drop-shadow-[0_8px_32px_rgba(19,25,34,0.75)] invert"
              />
            </div>
          </motion.div>
        ) : null}

        <motion.div style={parallaxStyle} className="shell relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.22em] text-white uppercase backdrop-blur-md"
            >
              <span aria-hidden className="bg-sunshine-300 h-1.5 w-1.5 rounded-full" />
              {t("hero.eyebrow")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              className="font-display text-shadow-hero mt-6 text-[2.6rem] leading-[1.02] font-bold text-white sm:text-6xl lg:text-[4.5rem]"
            >
              {t("hero.headline")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            >
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                {t("hero.subheadline")}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ChevronRight className="h-4 w-4" aria-hidden />}
                >
                  {t("hero.primaryCta")}
                </Button>
                <Button
                  href="/services"
                  size="lg"
                  variant="light"
                  icon={<PlayCircle className="h-4 w-4" aria-hidden />}
                  iconPosition="left"
                >
                  {t("hero.secondaryCta")}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 lg:block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* Hold beat: the sticky hero stays on screen, untouched, for this much scroll
          before the About sheet starts rising over it. */}
      <div aria-hidden style={{ height: `${BAND.heroHoldSvh}svh` }} />
    </>
  );
}
