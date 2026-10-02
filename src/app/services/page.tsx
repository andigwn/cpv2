import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services/ServicesPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Layanan & Fasilitas",
  description: `Delapan lini layanan ${SITE.name}: kamar & suite, waterpark, beach club, spa, empat restoran, kids club, convention centre, dan transportasi.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesPageContent heroBackground={sectionBackgrounds.servicesIntro} />;
}
