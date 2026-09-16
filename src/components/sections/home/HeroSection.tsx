"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, MousePointerClick, PlayCircle } from "lucide-react";
import { heroBackgrounds, heroContent, heroMarquee } from "@/data/meta";
import { ROTATION } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { Icon } from "@/components/ui/Icon";
import { RotatingBackground } from "@/components/animations/RotatingBackground";

/**
 * Home hero: rotating bright photography, typewriter headline, then a staggered
 * fade-up for the subheadline and CTAs once typing completes (prd.md section 4 & 13a).
 */
export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const [typingDone, setTypingDone] = useState(false);
  const [line1Typed, setLine1Typed] = useState(false);
  const [generation, setGeneration] = useState(0);

  // Subtle parallax on top of the rotating background (transform only, no reflow).
  const contentY = useTransform(scrollY, [0, 700], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 620], [1, 0]);

  const parallaxStyle = prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden pt-[calc(var(--site-header-height)+2rem)] pb-32"
    >
      <RotatingBackground
        slides={heroBackgrounds.map((item) => ({ src: item.src, alt: item.alt }))}
        intervalMs={ROTATION.intervalMs}
        overlayClassName="bg-gradient-to-t from-ink-900/70 via-ink-900/30 to-ink-900/15"
      />

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
                cursorClassName="bg-sunshine-300"
              />
            </span>

            {/* Line 2: "di " is static; only "Qubu Resort" types → holds → deletes → retypes, forever. */}
            {line1Typed && (
              <span aria-hidden className="block">
                {heroContent.headlineLine2Prefix}
                <TypewriterText
                  key={`word-${generation}`}
                  text={heroContent.headlineLoopWord}
                  speed={52}
                  startDelay={200}
                  onComplete={() => setTypingDone(true)}
                  cursorClassName="bg-sunshine-300"
                  loop
                  holdDuration={2200}
                  deleteSpeed={28}
                  pauseBeforeRestart={500}
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

            {/* <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
              <button
                type="button"
                onClick={() => {
                  setTypingDone(false);
                  setLine1Typed(false);
                  setGeneration((value) => value + 1);
                }}
                className="inline-flex items-center gap-2 text-white/85 underline decoration-white/40 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                <MousePointerClick className="h-4 w-4" aria-hidden />
                Putar ulang animasi teks
              </button>
              <span className="hidden items-center gap-2 sm:inline-flex">
                <span aria-hidden className="h-1 w-8 rounded-full bg-white/50" />
                {heroContent.scrollHint}
              </span>
            </div> */}
          </motion.div>
        </div>
      </motion.div>

      {/* Facility marquee pinned to the bottom of the hero */}
      <div className="from-ink-900/60 absolute inset-x-0 bottom-0 z-10 border-t border-white/25 bg-linear-to-t to-transparent py-4">
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
  );
}
