import type { Metadata } from "next";
import { UnitsPageContent } from "@/components/sections/units/UnitsPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { businessUnits, outletHref, unitHref } from "@/data/units";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Unit Bisnis",
  description:
    "Enam unit bisnis " +
    SITE.name +
    ": Hotel Q, QHall, Paradis Q, Hotel Qubu Suites, Villa, dan Pemancingan — lengkap dengan outlet yang beroperasi di dalamnya.",
  alternates: { canonical: "/unit-bisnis" },
};

export default function UnitsPage() {
  return (
    <>
      <UnitsPageContent heroBackground={sectionBackgrounds.servicesIntro} />
      {/* Hidden structured list keeps every building and outlet discoverable by crawlers. */}
      <nav aria-label="Daftar unit bisnis" className="sr-only">
        <ul>
          {businessUnits.map((unit) => (
            <li key={unit.slug}>
              <a href={unitHref(unit)}>{unit.name}</a>
              {unit.outlets.length ? (
                <ul>
                  {unit.outlets.map((outlet) => (
                    <li key={outlet.slug}>
                      <a href={outletHref(unit, outlet)}>{outlet.name}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
