import type { Metadata } from "next";
import { UnitsPageContent } from "@/components/sections/units/UnitsPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { businessUnits, unitHref } from "@/data/units";
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
  return (
    <>
      <UnitsPageContent heroBackground={sectionBackgrounds.servicesIntro} />
      {/* Hidden structured list keeps every destination discoverable by crawlers. */}
      <nav aria-label="Daftar destinasi" className="sr-only">
        <ul>
          {businessUnits.map((unit) => (
            <li key={unit.slug}>
              <a href={unitHref(unit)}>{unit.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
