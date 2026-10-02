"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_WIPE, ROTATION } from "@/lib/animations";
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
    const timeout = window.setTimeout(
      () => {
        setLayers((previous) =>
          previous.incoming?.token === token
            ? { ...previous, current: previous.incoming, incoming: null }
            : previous,
        );
      },
      ROTATION.wipeSeconds * 1000 + ROTATION.wipeSettleMs,
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
        "bg-lagoon-100 pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {visibleLayers.map((layer, position) => (
        <WipeLayer
          key={layer.token}
          slide={slides[layer.index]}
          index={layer.index}
          token={layer.token}
          isEntering={layers.incoming?.token === layer.token}
          isTop={position > 0}
          priority={priority}
        />
      ))}

      {/* Single overlay above every layer: headline contrast stays constant during the wipe. */}
      <div className={cn("absolute inset-0 z-30", overlayClassName)} />
    </div>
  );
}

type WipeLayerProps = {
  slide: RotationSlide;
  /** Position in the rotation; even indexes zoom in, odd indexes zoom out. */
  index: number;
  token: number;
  isEntering: boolean;
  isTop: boolean;
  priority: boolean;
};

/**
 * One photo in the stack.
 *
 * A layer that mounts as the incoming photo wears the diagonal mask and is wiped
 * in exactly once; when it is later promoted to the base layer it keeps its
 * settled state (the element identity survives the promotion and the mask rests
 * fully open, so nothing visually changes).
 *
 * The Ken Burns direction alternates with the slide index: even photos push in
 * (1 → 1.1), odd photos pull back (1.1 → 1), so the loop never reads as a
 * single repeating move.
 */
function WipeLayer({ slide, index, token, isEntering, isTop, priority }: WipeLayerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Captured once, on mount: `isEntering` only describes the layer's first role.
  const [enteredAsIncoming] = useState(isEntering);
  // Captured once as well: a layer's zoom direction never flips, so a promoted
  // layer keeps pushing in (or pulling back) without a visible reset.
  const [zoomsIn] = useState(index % 2 === 0);

  const wipe = useMotionValue(enteredAsIncoming ? 0 : 1);

  // The mask is twice the frame width with its visible region on the right of the
  // wavy edge; sweeping the position from -50% to 100% drags that edge across the
  // frame from right to left, revealing the photo underneath it.
  useEffect(() => {
    if (!enteredAsIncoming || prefersReducedMotion) return;

    const controls = animate(wipe, 1, {
      duration: ROTATION.wipeSeconds,
      ease: EASE_WIPE,
    });

    return () => controls.stop();
  }, [enteredAsIncoming, prefersReducedMotion, wipe]);

  const wipeX = useTransform(wipe, [0, 1], ["-50%", "100%"]);
  const maskPosition = useMotionTemplate`${wipeX} 0%`;

  const wipeStyle = enteredAsIncoming
    ? {
        WebkitMaskImage: "url(/images/hero-wipe-mask.svg)",
        maskImage: "url(/images/hero-wipe-mask.svg)",
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
      className={cn("absolute inset-[-12%]", isTop && "z-10")}
    >
      <motion.div
        initial={prefersReducedMotion ? undefined : { scale: zoomsIn ? ROTATION.zoom.from : ROTATION.zoom.to }}
        animate={prefersReducedMotion ? undefined : { scale: zoomsIn ? ROTATION.zoom.to : ROTATION.zoom.from }}
        transition={{ duration: ROTATION.zoom.seconds, ease: "linear" }}
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
          className="object-cover object-center"
        />
      </motion.div>
    </motion.div>
  );
}
