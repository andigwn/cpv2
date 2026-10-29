import type { CSSProperties } from "react";
import { IMAGE_RATIOS } from "@/data/imageRatios";

/** 16:9, the shape most of this site's photography already uses. */
const FALLBACK = { width: 16, height: 9 } as const;

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

function normalize(src: string): string {
  return src.split(/[?#]/, 1)[0] ?? src;
}

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

export function photoFrameStyle(src: string, variable: string): AspectRatioStyle {
  return { [variable]: photoRatio(src).css } as AspectRatioStyle;
}
