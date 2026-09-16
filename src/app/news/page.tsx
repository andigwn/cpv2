import type { Metadata } from "next";
import { NewsPageContent } from "@/components/sections/news/NewsPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Berita & Promo",
  description: `Newswire ${SITE.name}: promo musiman, agenda event waterpark, pembaruan fasilitas, dan kabar keberlanjutan.`,
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return <NewsPageContent heroBackground={sectionBackgrounds.newsGrid} />;
}
