import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { HighlightCarousel } from "@/components/sections/home/HighlightCarousel";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { NewsPreview } from "@/components/sections/home/NewsPreview";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightCarousel />
      <AboutPreview />
      <ServicesGrid />
      <NewsPreview />
      <CtaBanner />
    </>
  );
}
