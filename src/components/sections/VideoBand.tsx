"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import type { VideoBandContent } from "@/types";
import {
  BAND,
  BAND_COVER_START,
  BAND_PIN_WINDOW,
  MEDIA,
  SCRUB_SPRING,
} from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";

type VideoBandProps = VideoBandContent & {
  className?: string;
};

/**
 * The living-video twin of `ImageBand` — the reference's pinned-video scrub translated
 * to the photo bands' vocabulary.
 *
 * Same rhythm, same hand-off: the band is 240svh tall with a sticky, exactly-viewport
 * frame inside. While the previous content sheet is still on screen the footage stays
 * INVISIBLE; the moment that sheet passes the top (the navbar zone) the band pins, the
 * footage fades in out of focus and sharpens. Instead of playing on a loop, the footage
 * is scrubbed by scroll: while the frame is pinned, scrolling forward plays the
 * recording forward and scrolling back rewinds it, exactly like the reference's
 * FirstVideo/SecondVideo beats. The still-drift, push-in → rest → dolly-back scale and
 * the cover defocus stay in place, so the video reads as a photograph that the visitor's
 * own scrolling brings to life, never as a separate "video player" moment.
 *
 * Reduced motion keeps the poster only; the recording is a mute screen capture of this
 * site, so the scrub shows the site itself moving.
 */
export function VideoBand({
  id,
  src,
  poster,
  eyebrow,
  title,
  description,
  href,
  ctaLabel,
  crop,
  className,
}: VideoBandProps) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Lazy attachment: one viewport of runway before the band arrives.
  const inView = useInView(ref, { margin: "120% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [pinStart, pinEnd] = BAND_PIN_WINDOW;

  // Invisible while the previous content sheet is still on screen: the footage only
  // fades in once that sheet has scrolled past the top (the navbar zone) and the band
  // itself pins. The following sheet hides it on the way out.
  const opacity = useTransform(scrollYProgress, [...MEDIA.fadeWindow], [0, 1], {
    clamp: true,
  });
  // Downwards while the page scrolls up: the layers move in opposite directions. The
  // springs give the pinned frame the reference's scrub lag.
  const rawY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const y = useSpring(rawY, SCRUB_SPRING);
  // Push in while the band rises into view (still hidden), settle at 1 for the pin, hold
  // while the footage is alone, then dolly back out while the content sheet covers it.
  const rawScale = useTransform(
    scrollYProgress,
    [0, pinStart, BAND_COVER_START, pinEnd],
    [BAND.entryScale, 1, 1, BAND.exitScale],
  );
  const scale = useSpring(rawScale, SCRUB_SPRING);
  // Blur dissolve, two ramps summed: the reveal blur (the footage appears out of focus
  // and sharpens) and the cover defocus (it softens again under the incoming sheet).
  const enterBlurPx = useTransform(
    scrollYProgress,
    [...MEDIA.sharpenWindow],
    [MEDIA.revealBlurPx, 0],
  );
  const exitBlurPx = useTransform(
    scrollYProgress,
    [...MEDIA.defocusWindow],
    [0, MEDIA.coverBlurPx],
  );
  const rawBlurPx = useTransform(
    [enterBlurPx, exitBlurPx],
    ([enter, exit]: number[]) => enter + exit,
  );
  const blurPx = useSpring(rawBlurPx, SCRUB_SPRING);
  const blur = useMotionTemplate`blur(${blurPx}px)`;

  // The footage advances only while the frame is pinned, so it sits on its first frame
  // during the approach and holds its last frame while the content sheet covers it,
  // mirroring the reference's scrub window.
  const scrubTarget = useTransform(scrollYProgress, [...BAND_PIN_WINDOW], [0, 1], {
    clamp: true,
  });

  // Caption plate follows the same rule: it rises in shortly after the footage appears.
  const captionOpacity = useTransform(
    scrollYProgress,
    [pinStart + 0.06, pinStart + 0.2],
    [0, 1],
    { clamp: true },
  );
  const captionY = useTransform(
    scrollYProgress,
    [pinStart + 0.06, pinStart + 0.2],
    [18, 0],
    { clamp: true },
  );

  // One-time unlock: some engines only paint a fresh frame after the first play attempt.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const unlock = () => {
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
      video.removeEventListener("loadeddata", unlock);
    };
    video.addEventListener("loadeddata", unlock);
    return () => video.removeEventListener("loadeddata", unlock);
  }, [prefersReducedMotion, inView]);

  // Scrub playback: map scroll progress onto `currentTime`, throttled so sub-frame
  // deltas never issue redundant seeks. Reversible by nature — scrolling back up
  // rewinds the recording.
  useMotionValueEvent(scrubTarget, "change", (target) => {
    const video = videoRef.current;
    if (!video || !video.duration || !Number.isFinite(video.duration)) return;

    const time = target * video.duration;
    if (Math.abs(video.currentTime - time) < 0.02) return;

    try {
      video.currentTime = time;
    } catch {
      // A seek mid-buffer-change can abort; the next scroll event retries.
    }
  });

  // Keep the element paused: scrolling alone drives the footage.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;
    if (!inView) video.pause();
  }, [inView, prefersReducedMotion]);

  const cropStyle = crop
    ? { transform: `scale(${crop.scale})`, transformOrigin: crop.origin }
    : undefined;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      style={{ height: `${BAND.photoHeightSvh}svh` }}
      className={cn("relative w-full", className)}
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity }}
        className="sticky top-0 isolate h-svh w-full overflow-hidden"
      >
        {/* Oversized so the counter-drift has room and never exposes an edge. */}
        <motion.div
          style={prefersReducedMotion ? undefined : { y, scale, filter: blur }}
          className="absolute inset-[-18%]"
        >
          {/* Crop lives on this inner frame: the poster and the footage are cropped
              identically, so the hand-off from one to the other is invisible. */}
          <div className="absolute inset-0" style={cropStyle}>
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="100vw"
              quality={75}
              className={cn(
                "object-cover transition-opacity duration-700",
                isReady ? "opacity-0" : "opacity-100",
              )}
            />
            {inView && !prefersReducedMotion ? (
              <video
                ref={videoRef}
                src={src}
                poster={poster.src}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden
                onCanPlay={() => setIsReady(true)}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                  isReady ? "opacity-100" : "opacity-0",
                )}
              />
            ) : null}
          </div>
        </motion.div>

        {/* Caption plate in the same broken-white register as the photo-band captions.
            Anchored to the top: the next content sheet rises from the bottom, so the whole
            plate (including the CTA) stays readable until the cover is nearly complete. */}
        <div className="shell relative z-10 flex h-full items-start pt-28 sm:pt-32">
          <motion.div
            style={prefersReducedMotion ? undefined : { opacity: captionOpacity, y: captionY }}
            className="bg-sand-50/90 max-w-xl rounded-3xl px-6 py-6 backdrop-blur-md sm:px-8 sm:py-7"
          >
            {eyebrow ? (
              <span className="text-lagoon-700 inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.28em] uppercase">
                <span aria-hidden className="h-px w-8 bg-current opacity-60" />
                {eyebrow}
              </span>
            ) : null}

            <h2
              id={titleId}
              className="font-display text-ink-900 mt-3 text-2xl leading-tight font-bold sm:text-3xl"
            >
              {title}
            </h2>

            {description ? (
              <p className="text-ink-600 mt-3 text-sm leading-relaxed sm:text-base">
                {description}
              </p>
            ) : null}

            {href && ctaLabel ? (
              <div className="mt-6">
                <Button href={href} variant="outline">
                  {ctaLabel}
                </Button>
              </div>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
