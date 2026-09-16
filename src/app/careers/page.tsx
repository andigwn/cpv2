import type { Metadata } from "next";
import { CareersPageContent } from "@/components/sections/careers/CareersPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { jobOpenings } from "@/data/careers";
import { SITE } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Karir",
  description: `Lowongan kerja di ${SITE.legalName}: front office, waterpark operations, executive chef, spa therapist, digital marketing, dan management trainee.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Lowongan karir ${SITE.name}`,
    itemListElement: jobOpenings.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: job.title,
      description: job.description,
    })),
  };

  return (
    <>
      <CareersPageContent heroBackground={sectionBackgrounds.careersIntro} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </>
  );
}
