import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BAND_OVERLAP } from "@/lib/animations";

type ContentBandProps = {
  children: ReactNode;
  id?: string;
  /** Vertical breathing room for the content. */
  spacing?: "tight" | "default" | "loose";
  width?: "narrow" | "default" | "wide";
  /**
   * Pull the sheet up over the tail of the ImageBand above it so the content slides
   * over the still-pinned photo instead of only meeting its edge (the reference's
   * signature hand-off). Only use directly after an ImageBand.
   *
   * From `sm` up, where the band is a pinned full-screen frame. A phone band is only as
   * tall as its photograph (see `photoFrame`), so the same overlap would swallow the whole
   * picture before the visitor ever saw it; there the sheet simply starts at the photo's
   * lower edge.
   */
  overlap?: boolean;
  className?: string;
};

const spacingClasses = {
  tight: "py-16 sm:py-20 lg:py-24",
  default: "py-24 sm:py-28 lg:py-36",
  loose: "py-32 sm:py-36 lg:py-48",
} as const;

const shellClasses = {
  narrow: "shell",
  default: "shell",
  wide: "shell-wide",
} as const;

const innerClasses = {
  narrow: "mx-auto max-w-3xl",
  default: "",
  wide: "",
} as const;

/**
 * A solid sheet that slides up over the pinned photo above it.
 *
 * Deliberately kept at its natural height — just the content plus its padding — but with
 * `overlap` it is at least one viewport tall and is pulled up by `BAND.overlapSvh`, so it
 * rises over the photo band while that photo is still pinned and covers it completely.
 * It is opaque and sits at `z-10`, so it always paints above the photos. The sheet meets
 * the band above/below with a clean, sharp edge — no soft gradient seam.
 *
 * Scroll-linked scaling was removed per the revision: the layout no longer zooms while
 * scrolling, only the smooth momentum scrolling stays.
 */
export function ContentBand({
  children,
  id,
  spacing = "default",
  width = "default",
  overlap = false,
  className,
}: ContentBandProps) {
  return (
    <section
      id={id}
      style={overlap ? ({ "--band-overlap": BAND_OVERLAP } as CSSProperties) : undefined}
      className={cn("bg-sand-100 relative z-10", overlap && "sm:-mt-(--band-overlap)", className)}
    >
      <div
        className={cn(
          "flex flex-col",
          overlap && "min-h-svh justify-center",
          spacingClasses[spacing],
        )}
      >
        <div className={shellClasses[width]}>
          <div className={innerClasses[width]}>{children}</div>
        </div>
      </div>
    </section>
  );
}
