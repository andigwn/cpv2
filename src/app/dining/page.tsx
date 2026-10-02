import type { Metadata } from "next";
import { DiningPageContent } from "@/components/sections/dining/DiningPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Patio Bistro dan Embun Resto: dua restoran di kawasan " +
    SITE.name +
    " dengan menu nusantara, Asia, dan Western.",
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return <DiningPageContent heroBackground={sectionBackgrounds.dining} />;
}
