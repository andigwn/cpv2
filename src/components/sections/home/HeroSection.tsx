"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import { heroBackgrounds, heroContent, heroMarquee } from "@/data/meta";
import { BAND, HERO_REVEAL, ROTATION, SCRUB_SPRING } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useViewportHeight } from "@/hooks/useViewportHeight";
import { Button } from "@/components/ui/Button";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Icon } from "@/components/ui/Icon";
import { RotatingBackground } from "@/components/animations/RotatingBackground";

/**
 * Home hero: rotating bright photography, typewriter headline, then a staggered
 * fade-up for the subheadline and CTAs once typing completes (prd.md section 4 & 13a).
 *
 * The hero is sticky, so it stays pinned for the whole first beat: an 80svh hold where
 * nothing moves (the photo is simply alive), then the About sheet slides up over it
 * while the copy parallaxes and dissolves in sync with the cover.
 */
export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const vh = useViewportHeight();
  const hold = vh * (BAND.heroHoldSvh / 100);
  const [typingDone, setTypingDone] = useState(false);
  const [line1Typed, setLine1Typed] = useState(false);
  const [generation] = useState(0);

  // The intro copy clears the frame first, then the brand reveal takes over, then the
  // About sheet covers everything (the cover runs from scroll `hold` to `hold + vh`).
  // Every scroll-linked value is springed: like the reference's scrubbed timeline, the
  // frame trails the scroll slightly, so the push-in and the iris feel physical instead
  // of welded to the wheel.
  const rawContentY = useTransform(scrollY, [0, hold, hold + vh], [0, 0, vh * 0.2]);
  const contentY = useSpring(rawContentY, SCRUB_SPRING);
  const rawContentOpacity = useTransform(scrollY, [0, hold * 0.22, hold * 0.52], [1, 1, 0]);
  const contentOpacity = useSpring(rawContentOpacity, SCRUB_SPRING);
  // The photo starts noticeably pushed in, settles exactly while the reveal opens (the
  // reference's scale-out from 1.25), then pushes back in as the sheet covers it.
  const rawBackgroundScale = useTransform(scrollY, [0, hold, hold + vh * 1.4], [1.14, 1, 1.1]);
  const backgroundScale = useSpring(rawBackgroundScale, SCRUB_SPRING);

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
  const wordmarkScale = useTransform(
    revealProgress,
    [0, 1],
    [HERO_REVEAL.wordmarkScale[0], HERO_REVEAL.wordmarkScale[1]],
  );

  const parallaxStyle = prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <>
      <section
        id="hero"
        className="sticky top-0 isolate flex min-h-svh items-center overflow-hidden pt-[calc(var(--site-header-height)+2rem)] pb-32"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { scale: backgroundScale }}
          className="absolute inset-0"
        >
          <RotatingBackground
            slides={heroBackgrounds.map((item) => ({ src: item.src, alt: item.alt }))}
            intervalMs={ROTATION.intervalMs}
            overlayClassName="bg-gradient-to-t from-ink-900/70 via-ink-900/30 to-ink-900/15"
          />
        </motion.div>

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
            <motion.div
              style={{ scale: wordmarkScale }}
              className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center"
            >
              <span className="text-sunshine-300 text-[0.68rem] font-semibold tracking-[0.44em] uppercase drop-shadow-[0_2px_14px_rgba(19,25,34,0.8)]">
                Tanjung Benoa · Bali
              </span>
              <Image
                src="/images/logo.png"
                alt="Qubu Resort"
                width={800}
                height={145}
                className="h-auto w-[min(82vw,42rem)] brightness-0 invert drop-shadow-[0_8px_32px_rgba(19,25,34,0.75)]"
              />
            </motion.div>
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
              {heroContent.eyebrow}
            </motion.span>

            <h1 className="font-display text-shadow-hero mt-6 text-[2.6rem] leading-[1.02] font-bold text-white sm:text-6xl lg:text-[4.5rem]">
              {/* Full headline stays in the DOM for crawlers and no-JS visitors; the visible
                copy is the typewriter output, which is hidden from assistive tech to avoid
                announcing the same sentence twice. */}
              <span className="sr-only">{heroContent.headlineLines.join(" ")}</span>

              {/* Line 1: typed once, then stays put. */}
              <span aria-hidden className="block">
                <TypewriterText
                  key={`line1-${generation}`}
                  lines={[heroContent.headlineLines[0]]}
                  speed={52}
                  startDelay={320}
                  onComplete={() => setLine1Typed(true)}
                  keepCursor={false}
                />
              </span>

              {/* Line 2: "di " is static; the business-unit names type → hold → delete → cycle, forever. */}
              {line1Typed && (
                <span aria-hidden className="block">
                  {heroContent.headlineLine2Prefix}
                  <TypewriterText
                    key={`units-${generation}`}
                    words={heroContent.headlineLoopWords}
                    speed={70}
                    startDelay={200}
                    onComplete={() => setTypingDone(true)}
                    holdDuration={2000}
                    deleteSpeed={32}
                    pauseBeforeRestart={500}
                    className="from-sunshine-300 via-[#FFD34E] to-[#EF723D] bg-linear-to-r bg-clip-text text-transparent [text-shadow:none] drop-shadow-[0_3px_16px_rgba(19,25,34,0.6)]"
                    inline
                  />
                </span>
              )}
            </h1>

            <motion.div
              initial={false}
              animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: typingDone ? 0.15 : 0 }}
            >
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                {heroContent.subheadline}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button
                  href={heroContent.primaryCta.href}
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                >
                  {heroContent.primaryCta.label}
                </Button>
                <Button
                  href={heroContent.secondaryCta.href}
                  size="lg"
                  variant="light"
                  icon={<PlayCircle className="h-4 w-4" aria-hidden />}
                  iconPosition="left"
                >
                  {heroContent.secondaryCta.label}
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Facility marquee pinned to the bottom of the hero */}
        <div className="from-ink-900/70 via-ink-900/25 absolute inset-x-0 bottom-0 z-10 bg-linear-to-t to-transparent py-5">
          <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
              {[...heroMarquee, ...heroMarquee].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex shrink-0 items-center gap-3 text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-white/85 uppercase"
                >
                  <Icon name="waves" className="text-sunshine-300 h-4 w-4" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 text-white/70 lg:block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>

        {/* Hidden list keeps the marquee text crawlable. */}
        <nav aria-label="Sorotan fasilitas" className="sr-only">
          <ul>
            {heroMarquee.map((item) => (
              <li key={item}>
                <Link href="/services">{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Hold beat: the sticky hero stays on screen, untouched, for this much scroll
          before the About sheet starts rising over it. */}
      <div aria-hidden style={{ height: `${BAND.heroHoldSvh}svh` }} />
    </>
  );
}
