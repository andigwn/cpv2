import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about/AboutPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Sejarah, visi-misi, nilai, dan tim kepemimpinan ${SITE.legalName} — grup hospitality yang mengelola hotel resort, waterpark, dan convention centre di Indonesia.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageContent heroBackground={sectionBackgrounds.aboutIntro} />;
}
