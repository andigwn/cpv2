"use client";

import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { HomeUnits } from "@/components/sections/home/HomeUnits";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { NewsPreview } from "@/components/sections/home/NewsPreview";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { ImageBand } from "@/components/sections/ImageBand";
import { useT } from "@/i18n/useTranslation";

/**
 * Home rhythm: hero, then a photo band, then a short content sheet, then more photo
 * bands, and so on. Every band shares the same broken-white canvas and the sheets slide
 * over the pinned media, so the page never shows a hard section divider; the closing sheet
 * is the photo + message finale.
 *
 * Kept as a client component so the band captions and alt texts follow the active
 * language; the route file stays a server component that owns metadata.
 */
export function HomePageContent() {
  const t = useT();

  return (
    <>
      <HeroSection />

      <AboutPreview />

      {/* Photo band: pins and dollies back the same way as the other bands, with the
          next content sheet sliding over it. The home bands float in 3D and tip
          toward the cursor. */}
      <ImageBand
        image={{
          src: "/images/qubu-resort-2.jpeg",
          alt: t("home.bandGateAlt"),
        }}
        caption={t("home.bandCaption")}
        tilt3d
        float3d
      />

      <HomeUnits />

      <ImageBand
        image={{
          src: "/images/qhall-5.jpeg",
          alt: t("home.bandBallroomAlt"),
        }}
        tilt3d
        float3d
      />

      <ServicesGrid />

      <ImageBand
        image={{
          src: "/images/spa-gym-1.jpeg",
          alt: t("home.bandSpaAlt"),
        }}
        tilt3d
        float3d
      />

      <NewsPreview />

      <CtaBanner />
    </>
  );
}
