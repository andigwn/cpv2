"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_WIPE, ROTATION, wipeOffset, wipeVariant, type WipeVariant } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RotationSlide = {
  src: string;
  alt: string;
};

type RotatingBackgroundProps = {
  slides: RotationSlide[];
  /** Milliseconds a photo stays on screen. */
  intervalMs?: number;
  className?: string;
  /** Gradient overlay classes; the overlay lives above both layers so contrast never flickers. */
  overlayClassName?: string;
  priority?: boolean;
};

type Layer = { index: number; token: number };

/**
 * Hero background that rotates through bright photography the way the Ayana
 * homepage does: a soft diagonal mask edge sweeps across the frame, wiping the
 * outgoing photo away from right to left while the incoming one is revealed
 * underneath the same moving edge. The Ken Burns drift alternates with each
 * photo — one pushes in, the next pulls back — so the loop never looks like a
 * single repeating move.
 *
 * The incoming photo is not faded or slid: it mounts on top of the outgoing one
 * wearing a wavy diagonal mask (`hero-wipe-mask.svg`, twice as wide as the frame)
 * whose position is animated, so the reveal edge travels straight across while
 * both photos stay fully opaque — no blank frame, no flash. Upcoming photos are
 * preloaded into the browser cache before their turn and every layer is oversized
 * inside a fixed-height container, so there is zero CLS.
 */
export function RotatingBackground({
  slides,
  intervalMs = ROTATION.intervalMs,
  className,
  overlayClassName = "bg-gradient-to-t from-ink-900/55 via-ink-900/15 to-transparent",
  priority = true,
}: RotatingBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // The rotation pointer lives inside the state object (never in a ref) so the
  // interval updater stays pure: React StrictMode double-invokes updaters in dev
  // and a side effect inside one would advance the pointer twice, skipping photos.
  const [layers, setLayers] = useState<{
    current: Layer;
    incoming: Layer | null;
    nextIndex: number;
  }>({
    current: { index: 0, token: 0 },
    incoming: null,
    nextIndex: 1,
  });

  const interval = useMemo(() => Math.max(3000, intervalMs), [intervalMs]);

  // Advance the rotation on a fixed interval: the next photo mounts on top of the
  // current one and the wipe plays. If a wipe is somehow still running, the tick is
  // skipped — the settle timeout below always promotes it shortly.
  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;

    const timer = setInterval(() => {
      setLayers((previous) => {
        if (previous.incoming) return previous;

        const nextIndex = previous.nextIndex;
        return {
          current: previous.current,
          incoming: { index: nextIndex, token: previous.current.token + 1 },
          nextIndex: (nextIndex + 1) % slides.length,
        };
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, prefersReducedMotion, slides]);

  // Once the wipe has fully played, the incoming layer has become the photo on
  // screen: promote it to base and drop the layer underneath. The element is keyed by
  // token, so React keeps it mounted and the Ken Burns push continues without a
  // restart or a flash.
  useEffect(() => {
    if (!layers.incoming) return;

    const token = layers.incoming.token;
    // The wipe's own duration, not a single global one: variants run at different speeds, and
    // promoting the layer before its wipe finishes would snap the photo in.
    const { seconds } = wipeVariant(token);
    const timeout = window.setTimeout(
      () => {
        setLayers((previous) =>
          previous.incoming?.token === token
            ? { ...previous, current: previous.incoming, incoming: null }
            : previous,
        );
      },
      seconds * 1000 + ROTATION.wipeSettleMs,
    );

    return () => window.clearTimeout(timeout);
  }, [layers.incoming]);

  // Warm the cache for the next two photos so the wipe never stutters.
  const currentIndex = layers.current.index;
  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;

    const warm = (offset: number) => {
      const target = slides[(currentIndex + offset + slides.length) % slides.length];
      if (!target) return;
      const preload = new window.Image();
      preload.decoding = "async";
      preload.src = target.src;
    };

    warm(1);
    warm(2);
  }, [currentIndex, prefersReducedMotion, slides]);

  const visibleLayers = layers.incoming ? [layers.current, layers.incoming] : [layers.current];

  return (
    <div
      aria-hidden
      className={cn(
        // Dark base, only ever seen for the moment before the first photo decodes.
        "bg-ink-900 pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {visibleLayers.map((layer, position) => (
        <WipeLayer
          key={layer.token}
          slide={slides[layer.index]}
          token={layer.token}
          isEntering={layers.incoming?.token === layer.token}
          isTop={position > 0}
          priority={priority}
          variant={wipeVariant(layer.token)}
        />
      ))}

      {/* Single overlay above every layer: headline contrast stays constant during the wipe. */}
      <div className={cn("absolute inset-0 z-30", overlayClassName)} />
    </div>
  );
}

type WipeLayerProps = {
  slide: RotationSlide;
  token: number;
  isEntering: boolean;
  isTop: boolean;
  priority: boolean;
  /**
   * The hand-over this layer performs. Derived from its token, which never changes, so a
   * layer keeps the same wipe and Ken Burns direction for its whole life — including after it
   * is promoted to base, which is what makes that promotion invisible.
   */
  variant: WipeVariant;
};

/**
 * One photo in the stack.
 *
 * A layer that mounts as the incoming photo wears the wipe mask and is revealed exactly once;
 * when it is later promoted to the base layer it keeps its settled state (the element identity
 * survives the promotion and the mask rests fully open, so nothing visually changes).
 *
 * ## Wipe choreography
 *
 * `variant` decides how this hand-over plays, and `ROTATION.wipes` cycles through the variants
 * so consecutive hand-overs never repeat. The frame can fill from the right or from the left —
 * that is what `hero-wipe-mask.svg` and its mirror `hero-wipe-mask-alt.svg` are for — and each
 * direction gets a relaxed and a quicker timing. The Ken Burns direction comes from the same
 * variant, deliberately not in strict alternation, so the wipe and the zoom do not feel welded
 * into one repeating move.
 *
 * ## Fitting
 *
 * The hero is deliberately exempt from the phone rule the rest of the site follows (see
 * `photoFrame`). Everywhere else an uncropped photograph wins, because a band or a page header
 * is content and cropping it loses something. The hero is not content — it is an immersive
 * opener, and a short landscape strip above a large dark panel reads as a broken layout rather
 * than a photograph. So the hero fills the frame on every screen and `object-cover` keeps it
 * that way; on a portrait phone that means the picture is cropped to a tall slice, which for
 * this photography falls on sky, water and foliage rather than on the subject.
 *
 * The Ken Burns drift stays off below `sm`, where the layer has no oversized bleed to hide the
 * scaling — a zoom there would only add crop.
 */
function WipeLayer({ slide, token, isEntering, isTop, priority, variant }: WipeLayerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Captured once, on mount: `isEntering` only describes the layer's first role.
  const [enteredAsIncoming] = useState(isEntering);
  // Captured once as well: a layer's zoom direction never flips, so a promoted
  // layer keeps pushing in (or pulling back) without a visible reset.
  const [zoomsIn] = useState(variant.zoom === "in");

  /**
 * Ken Burns range.
 *
 * Deliberately not gated on the width query. Framer reads `initial` on a layer's *first* render,
 * and a layer mounts seconds into the page's life, long after hydration — so on that render
 * `useMediaQuery` still reports its `false` default and nothing distinguishes "this is a phone"
 * from "the width is not measured yet". Gating on it applied the phone's scale of 1 everywhere,
 * which left the zoom-out layers animating from 1 to 1: no movement at all, so half the photos
 * sat perfectly still.
 *
 * Reduced motion is safe to branch on because it is a settled user preference rather than a
 * layout measurement, and because it only ever turns the motion *off*.
 *
 * Running on phones too costs a sliver of extra crop on a hero that is already a narrow slice;
 * the alternative was an animation that silently did nothing on half the photos.
 */
  const startScale = prefersReducedMotion ? 1 : zoomsIn ? ROTATION.zoom.from : ROTATION.zoom.to;
  const endScale = prefersReducedMotion ? 1 : zoomsIn ? ROTATION.zoom.to : ROTATION.zoom.from;

  const wipe = useMotionValue(enteredAsIncoming ? 0 : 1);

  // The mask is twice the frame wide with its opaque side running from a wavy edge out to the
  // far edge of the tile, so sliding the tile drags that edge across the frame and the opaque
  // side decides which way the frame fills. Each variant states where the edge starts and ends
  // (in percent across the frame) and `wipeOffset` turns that into the mask offsets to slide
  // between; the ends sit outside 0-100 so the layer begins fully hidden and finishes fully open.
  useEffect(() => {
    if (!enteredAsIncoming || prefersReducedMotion) return;

    const controls = animate(wipe, 1, {
      duration: variant.seconds,
      ease: EASE_WIPE,
    });

    return () => controls.stop();
    // `variant` is fixed for this layer's lifetime, so it is safe to leave out of the deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredAsIncoming, prefersReducedMotion, wipe]);

  const wipeX = useTransform(wipe, [0, 1], [
    wipeOffset(variant.fill, variant.edge[0]),
    wipeOffset(variant.fill, variant.edge[1]),
  ]);
  const maskPosition = useMotionTemplate`${wipeX} 0%`;

  const wipeStyle = enteredAsIncoming
    ? {
        WebkitMaskImage: `url(/images/${
          variant.fill === "left" ? "hero-wipe-mask-alt.svg" : "hero-wipe-mask.svg"
        })`,
        maskImage: `url(/images/${
          variant.fill === "left" ? "hero-wipe-mask-alt.svg" : "hero-wipe-mask.svg"
        })`,
        WebkitMaskSize: "200% 100%",
        maskSize: "200% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: maskPosition,
        maskPosition,
        willChange: "mask-position",
      }
    : undefined;

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : wipeStyle}
      className={cn("absolute inset-0 sm:inset-[-12%]", isTop && "z-10")}
    >
      <motion.div
        initial={{ scale: startScale }}
        animate={{ scale: endScale }}
        transition={{
          duration: prefersReducedMotion ? 0 : ROTATION.zoom.seconds,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority={priority && token === 0}
          loading={priority && token === 0 ? undefined : "eager"}
          // The hero is the LCP image and already sits under a contrast overlay;
          // 75 matches the site-wide default and is ~15% lighter than 82.
          quality={75}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
