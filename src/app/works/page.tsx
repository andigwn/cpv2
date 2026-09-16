import type { Metadata } from "next";
import { WorksPageContent } from "@/components/sections/works/WorksPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Portfolio Proyek",
  description: `Dua belas proyek hospitality ${SITE.name}: hotel, waterpark, resort, dan masterplan kawasan di lima destinasi Indonesia.`,
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return <WorksPageContent heroBackground={sectionBackgrounds.worksGrid} />;
}
