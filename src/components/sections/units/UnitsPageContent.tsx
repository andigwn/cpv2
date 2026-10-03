"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Store } from "lucide-react";
import { unitHref } from "@/data/units";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import type { ImageAsset, SectionBackgroundConfig } from "@/types";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useBusinessUnits } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

type UnitsPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** ImageBand only needs a still, so the shared section background photos are reused. */
function still(bg: SectionBackgroundConfig, alt: string): ImageAsset {
  return { src: bg.src, alt: bg.alt || alt };
}

/** Overview of every business unit owned by the group (route: /unit-bisnis). */
export function UnitsPageContent({ heroBackground }: UnitsPageContentProps) {
  const t = useT();
  const businessUnits = useBusinessUnits();

  // Supporting facilities flattened across the five units, each linking back to its unit.
  const facilityRows = businessUnits.flatMap((unit) =>
    unit.facilities.map((facility) => ({ unit, facility })),
  );

  return (
    <>
      <PageHero
        eyebrow={t("units.heroEyebrow")}
        title={t("units.heroTitle")}
        description={t("units.heroDescription")}
        background={heroBackground}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("nav.destinations") },
        ]}
      >
        <Button href="/contact" icon={<ChevronRight className="h-4 w-4" aria-hidden />}>
          {t("common.planVisit")}
        </Button>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow={t("units.listEyebrow")}
          title={t("units.listTitle")}
          description={t("units.listDescription")}
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessUnits.map((unit) => (
            <Card
              key={unit.slug}
              variants={staggerItem}
              image={unit.image}
              eyebrow={unit.type}
              title={unit.name}
              description={unit.tagline}
              href={unitHref(unit)}
              ctaLabel={t("common.seeDestination", { name: unit.name })}
            />
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.unitsBand, t("units.bandCaption"))}
        caption={t("units.bandCaption")}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("units.facilitiesEyebrow")}
          title={t("units.facilitiesTitle")}
          description={t("units.facilitiesDescription")}
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilityRows.map(({ unit, facility }) => (
            <motion.div
              key={unit.slug + "-" + facility.slug}
              variants={staggerItem}
              className="h-full"
            >
              <InfoCard
                href={unitHref(unit)}
                eyebrow={unit.name + " · " + facility.type}
                title={facility.name}
                body={facility.description}
                icon={<Store className="h-5 w-5" aria-hidden />}
                footer={
                  <span className="text-lagoon-700 text-sm font-semibold">
                    {t("common.viewDetail")}
                  </span>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
        <div className="mt-10">
          <Button href="/contact" variant="outline">
            {t("common.contactReservation")}
          </Button>
        </div>
      </ContentBand>

      {/* Hidden structured list keeps every destination discoverable by crawlers. */}
      <nav aria-label={t("a11y.destinationsList")} className="sr-only">
        <ul>
          {businessUnits.map((unit) => (
            <li key={unit.slug}>
              <Link href={unitHref(unit)}>{unit.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
