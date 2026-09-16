import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services/ServicesPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { services } from "@/data/services";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Layanan & Fasilitas",
  description: `Delapan lini layanan ${SITE.name}: kamar & suite, waterpark, beach club, spa, empat restoran, kids club, convention centre, dan transportasi.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesPageContent heroBackground={sectionBackgrounds.servicesIntro} />
      {/* Hidden structured list keeps every service discoverable by crawlers. */}
      <nav aria-label="Daftar layanan" className="sr-only">
        <ul>
          {services.map((service) => (
            <li key={service.slug}>
              <a href={`/services/${service.slug}`}>{service.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
