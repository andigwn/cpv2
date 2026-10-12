"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";
import {
  BAND,
  BAND_CAPTION_WINDOW_PHONE,
  BAND_FLOAT,
  BAND_PIN_WINDOW,
  BAND_TILT,
  EASE_IN_OUT,
  SCRUB_SPRING,
} from "@/lib/animations";
import { photoRatio, type AspectRatioStyle } from "@/lib/photoFrame";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { MEDIA_QUERIES, useMediaQuery } from "@/hooks/useMediaQuery";

type ImageBandProps = {
  image: ImageAsset;
  /** Optional single short line over the photo. */
  caption?: string;
  priority?: boolean;
  align?: "center" | "left";
  /** Edge fade into the page canvas. Off by default in the band rhythm. */
  fade?: "both" | "bottom" | "none";
  /** Tip the photo toward the cursor while it moves across the pinned frame. */
  tilt3d?: boolean;
  /** Sway the photo gently in perspective on its own, without any cursor input. */
  float3d?: boolean;
  className?: string;
};

/**
 * The still photo that the next ContentBand slides over.
 *
 * The section is TALLER than the viewport on purpose — that extra height is what gives
 * the photo a moment on its own. The photo itself lives in a sticky frame, so:
 *
 * 1. it rises with the page and is visible from the first pixel, so the band always
 *    shows its OWN photo instead of the sticky hero behind the page showing through;
 * 2. once the band reaches the top (the navbar zone) it pins — always sharp, no blur
 *    dissolve;
 * 3. the following ContentBand — pulled up by `BAND_OVERLAP` — then rises from the
 *    bottom while the photo is STILL pinned and covers it completely. The photo
 *    never fades out on its own: it is hidden by an opaque sheet, exactly like the
 *    reference site hides a pinned video behind the next section.
 *
 * Per the revision the scroll-linked push-in/zoom was removed; a gentle counter-drift
 * and the ambient Ken Burns loop keep the frame alive without any scroll zoom. Bands
 * may opt into a mouse-follow 3D tilt (`tilt3d`) and/or an ambient 3D float
 * (`float3d`) that move only the photo itself.
 *
 * ## Fitting
 *
 * From `sm` up the frame is a full-viewport bleed inside a section taller than the viewport,
 * and the photo covers it inside the oversized drift frame — the desktop composition, untouched.
 *
 * On a phone that composition is impossible: the frame is portrait and the photography is
 * landscape, so `object-cover` has to discard most of the picture (the resort shot collapses
 * to a strip of pool) while `object-contain` leaves the picture small and floating in an empty
 * box. Instead the phone frame simply **takes the photograph's own aspect ratio**, so the photo
 * is edge to edge and exactly as tall as it needs to be: it fills the frame completely and no
 * part of the subject is ever cut. `object-cover` and `object-contain` become the same thing
 * there, which is why no per-image art direction is needed.
 *
 * A landscape photograph at phone width is a fraction of the viewport tall, so on a phone the
 * band stops pretending to be a pinned full-screen frame: the section is exactly as tall as the
 * photograph, the frame never actually pins, and the sheet below butts up against the photo's
 * edge. That keeps the phone page free of the dead scroll — and the empty canvas — that faking
 * the desktop pin at this height would cost. Every continuous loop stays off below `sm` as
 * well: there is no oversized edge left to hide, so the drift, the Ken Burns zoom and the 3D
 * tilt would only work against the picture.
 */
export function ImageBand({
  image,
  caption,
  priority = false,
  align = "center",
  fade = "none",
  tilt3d = false,
  float3d = false,
  className,
}: ImageBandProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isWide = useMediaQuery(MEDIA_QUERIES.sm);
  // Below `sm` the section collapses to the photo's own height and nothing pins, so the
  // caption has no "frame reached the navbar" moment to wait for. Gated on hydration so the
  // server keeps emitting the desktop mapping and no phone ever sees the pinned timing.
  const isPhoneLayout = useIsHydrated() && !isWide;

  // The phone frame's shape. Read from the generated size map, so it is exact and known at
  // first paint — the frame reserves its final height before the photo arrives (no CLS).
  const ratio = photoRatio(image.src);
  const sectionStyle: AspectRatioStyle = {
    "--band-ar": ratio.css,
    "--band-height": `${BAND.photoHeightSvh}svh`,
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [pinStart] = BAND_PIN_WINDOW;

  // Downwards while the page scrolls up: the layers move in opposite directions. The
  // spring gives the pinned frame a scrub lag — it trails the scroll slightly instead of
  // being welded to it, so the camera feels heavy and physical. No scale: the revision
  // removed every scroll-linked zoom.
  const rawY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const y = useSpring(rawY, SCRUB_SPRING);

  // Mouse-follow 3D tilt: the photo tips toward the cursor while it moves across the
  // frame and springs back to flat on leave. Only the photo tilts — captions and fades
  // stay still, and reduced-motion visitors get the flat photo.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, BAND_TILT.spring);
  const rotateY = useSpring(tiltY, BAND_TILT.spring);
  const tiltEnabled = tilt3d && !prefersReducedMotion && isWide;

  // Ambient 3D float: the photo sways on its own layer so it never fights the
  // mouse tilt. Rotation only — no zoom — and off for reduced-motion visitors.
  const floatEnabled = float3d && !prefersReducedMotion && isWide;
  const threeDEnabled = (tilt3d || float3d) && !prefersReducedMotion && isWide;

  // Every continuous loop stays off on phones: below `sm` the photo is shown whole and
  // centred, so there are no oversized edges for the drift or the zoom to hide.
  const driftEnabled = !prefersReducedMotion && isWide;
  const kenBurnsEnabled = !prefersReducedMotion && isWide;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!tiltEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(ny * BAND_TILT.maxDegrees);
    tiltY.set(-nx * BAND_TILT.maxDegrees);
  }

  function handleMouseLeave() {
    if (!tiltEnabled) return;
    tiltX.set(0);
    tiltY.set(0);
  }

  // Caption follows the frame: once the pinned frame has settled (sm and up), or as the
  // photo itself arrives on a phone.
  const captionWindow = isPhoneLayout
    ? [...BAND_CAPTION_WINDOW_PHONE]
    : [pinStart + 0.06, pinStart + 0.2];
  const captionOpacity = useTransform(scrollYProgress, captionWindow, [0, 1], { clamp: true });
  const captionY = useTransform(scrollYProgress, captionWindow, [18, 0], { clamp: true });

  const showTop = fade === "both";
  const showBottom = fade !== "none";

  return (
    <section
      ref={ref}
      style={sectionStyle}
      className={cn("relative w-full sm:h-(--band-height)", className)}
    >
      <div
        className="sticky top-0 isolate aspect-(--band-ar) w-full overflow-hidden sm:aspect-auto sm:h-svh"
        style={threeDEnabled ? { perspective: BAND_TILT.perspective } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Phone: the whole photograph, filling a frame shaped like the photograph. Nothing
            is cropped and nothing is left empty, so no second blurred copy is needed. */}
        <div className="absolute inset-0 sm:hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            quality={75}
            className="object-cover"
          />
        </div>

        {/* Oversized so the counter-drift, the 3D tilt and the 3D float have room and
            never expose an edge. 3D bands get a little extra bleed for the corners. */}
        <motion.div
          style={{
            ...(driftEnabled ? { y } : {}),
            ...(tiltEnabled ? { rotateX, rotateY } : {}),
          }}
          className={cn(
            "hidden sm:block",
            tilt3d || float3d ? "absolute inset-[-22%]" : "absolute inset-[-18%]",
          )}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              floatEnabled
                ? {
                    rotateX: [BAND_FLOAT.rotateX, -BAND_FLOAT.rotateX, BAND_FLOAT.rotateX],
                    rotateY: [-BAND_FLOAT.rotateY, BAND_FLOAT.rotateY, -BAND_FLOAT.rotateY],
                  }
                : undefined
            }
            transition={{ duration: BAND_FLOAT.seconds, repeat: Infinity, ease: EASE_IN_OUT }}
          >
            <motion.div
              className="absolute inset-0"
              animate={kenBurnsEnabled ? { scale: [1, BAND.kenBurnsScale, 1] } : undefined}
              transition={{ duration: BAND.kenBurnsSeconds, repeat: Infinity, ease: EASE_IN_OUT }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority={priority}
                loading={priority ? undefined : "lazy"}
                quality={75}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {showTop ? (
          <div
            aria-hidden
            className="from-sand-100 via-sand-100/70 absolute inset-x-0 top-0 h-12 bg-linear-to-b to-transparent sm:h-36"
          />
        ) : null}
        {showBottom ? (
          <div
            aria-hidden
            className="from-sand-100 via-sand-100/70 absolute inset-x-0 bottom-0 h-12 bg-linear-to-t to-transparent sm:h-36"
          />
        ) : null}

        {caption ? (
          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center",
              align === "center" ? "justify-center" : "justify-start",
            )}
          >
            <div className="shell">
              <motion.p
                style={prefersReducedMotion ? undefined : { opacity: captionOpacity, y: captionY }}
                className="font-display bg-sand-50/95 text-ink-800 max-w-md rounded-3xl px-6 py-5 text-lg leading-snug shadow-[0_18px_50px_-34px_rgba(19,25,34,0.45)] sm:text-xl"
              >
                {caption}
              </motion.p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
