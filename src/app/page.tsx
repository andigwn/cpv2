import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { HomeUnits } from "@/components/sections/home/HomeUnits";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { NewsPreview } from "@/components/sections/home/NewsPreview";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { ImageBand } from "@/components/sections/ImageBand";
import { VideoBand } from "@/components/sections/VideoBand";
import { resortTourVideo } from "@/data/media";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

/**
 * Home rhythm: hero, then the living video band, then a short content sheet, then photo
 * bands, and so on. Every band shares the same broken-white canvas and the sheets slide
 * over the pinned media, so the page never shows a hard section divider; the closing sheet
 * is the photo + message finale.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <AboutPreview />

      {/* Living video band: plays like a photograph that happens to move, with the same
          pin/counter-drift/push-in rhythm as the photo bands around it. */}
      <VideoBand {...resortTourVideo} />

      <HomeUnits />

      <ImageBand
        image={{
          src: "/images/qhall-5.jpeg",
          alt: "Ballroom QHall dengan dekorasi acara dan lampu gantung",
        }}
      />

      <ServicesGrid />

      <ImageBand
        image={{
          src: "/images/spa-gym-1.jpeg",
          alt: "Ruang perawatan spa dengan dua tempat tidur dan tanaman",
        }}
      />

      <NewsPreview />

      <CtaBanner />
    </>
  );
}
