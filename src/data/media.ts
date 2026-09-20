import type { VideoBandContent } from "@/types";

/**
 * Home page living video band — the video twin of `ImageBand`.
 *
 * `video1.mp4` is a screen recording of this site, so the frame is cropped to the page
 * area (browser chrome would otherwise show). The band scrubs the recording with the
 * scroll (the reference's pinned-video beat): scrolling forward plays it forward,
 * scrolling back rewinds it. When proper resort footage lands, drop it in `public/videos/`
 * and point `src` at it, then remove `crop` — it is only needed for recordings.
 */
export const resortTourVideo: VideoBandContent = {
  id: "tur",
  src: "/videos/video1.mp4",
  poster: {
    src: "/images/qubu-resort-2.jpeg",
    alt: "Gerbang kawasan Qubu Resort dengan patung burung",
  },
  eyebrow: "Tur Singkat",
  title: "Satu kawasan, enam pengalaman",
  description:
    "Dari kolam laguna dan waterpark sampai convention centre dan suite — semuanya berjarak beberapa menit berjalan kaki.",
  href: "/unit-bisnis",
  ctaLabel: "Jelajahi unit bisnis",
  crop: { scale: 1.3, origin: "50% 56.5%" },
};
