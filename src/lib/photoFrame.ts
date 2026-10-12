import type { CSSProperties } from "react";
import { IMAGE_RATIOS } from "@/data/imageRatios";

/**
 * Intrinsic aspect-ratio lookup for the photography in `public/images/`.
 *
 * ## Why a frame has to match the picture
 *
 * Every full-bleed photo frame on this site is a box with a shape of its own: a full-viewport
 * hero, a pinned band, a card. The photographs, on the other hand, are landscape (16:9 and 3:2).
 * On a desktop those two facts are compatible — the frame is wide, so `object-cover` fills it
 * and the small crop off the sides falls on scenery. On a phone the frame is *taller than it is
 * wide* and `object-cover` has to throw away most of the picture to fill it: a resort photo
 * collapses to a band of pool water and the subject is gone.
 *
 * `object-contain` fixes the crop but introduces the opposite failure — the picture shrinks into
 * a short strip floating inside a tall empty box. Filling that leftover space with a blurred,
 * scaled copy of the same photo (the previous approach) hides the letterbox but replaces a clean
 * layout with a smear, costs a second full-size image request, and still leaves the picture small.
 *
 * The only arrangement that satisfies both requirements — the image fills the frame completely
 * *and* the subject is never cut — is to make the frame take the picture's own aspect ratio. The
 * frame is then exactly as tall as the picture needs at full width: edge to edge, zero empty
 * space, zero cropping. `object-cover` then behaves identically to `object-contain`, which is why
 * no art-direction per image is required.
 *
 * ## Where the numbers come from
 *
 * `next/image` cannot report the intrinsic size of a `/public` path at runtime, and the content
 * data does not carry dimensions, so they are measured once by `_tools/generate-image-ratios.mjs`
 * into `src/data/imageRatios.ts`. Re-run `npm run images:ratios` after touching the image folder.
 */

/** 16:9, the shape most of this site's photography already uses. */
const FALLBACK = { width: 16, height: 9 } as const;

/**
 * A `style` object carrying an aspect-ratio custom property. Components spread it onto the frame
 * element and read it back with Tailwind's custom-property shorthand (`aspect-(--name)`).
 */
export type AspectRatioStyle = CSSProperties & Record<`--${string}`, string>;

export type PhotoRatio = {
  /** Intrinsic width in pixels, or the fallback's when the path is unknown. */
  width: number;
  /** Intrinsic height in pixels, or the fallback's when the path is unknown. */
  height: number;
  /** Width divided by height. */
  ratio: number;
  /** Ready-made CSS `aspect-ratio` value, e.g. `"1600 / 900"`. */
  css: string;
  /** False when the path was not in the generated map and the fallback was used. */
  exact: boolean;
};

/** Strips any query string or fragment so `?w=1` style paths still resolve. */
function normalize(src: string): string {
  return src.split(/[?#]/, 1)[0] ?? src;
}

/**
 * Resolves a public image path to its intrinsic aspect ratio.
 *
 * Unknown paths (a remote URL, or an asset added without re-running the generator) fall back to
 * 16:9, so a missing entry costs a mild crop rather than a broken layout.
 */
export function photoRatio(src: string): PhotoRatio {
  const entry: readonly [number, number] | undefined =
    IMAGE_RATIOS[normalize(src) as keyof typeof IMAGE_RATIOS];
  const [width, height] = entry ?? FALLBACK;

  return {
    width,
    height,
    ratio: width / height,
    css: `${width} / ${height}`,
    exact: entry !== undefined,
  };
}

/** Convenience wrapper: the `style` spread for a frame, ready to hand to the element. */
export function photoFrameStyle(src: string, variable: string): AspectRatioStyle {
  return { [variable]: photoRatio(src).css } as AspectRatioStyle;
}
