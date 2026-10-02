import type { Metadata } from "next";
import { UnitsPageContent } from "@/components/sections/units/UnitsPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Destinasi",
  description:
    "Lima destinasi " +
    SITE.name +
    ": Hotel Qubu Suites, Hotel Q, The Q Hall Convention Center, Paradis-Q Waterpark, dan Villa Town House.",
  alternates: { canonical: "/unit-bisnis" },
};

export default function UnitsPage() {
  return <UnitsPageContent heroBackground={sectionBackgrounds.servicesIntro} />;
}
