"use client";

import { motion } from "framer-motion";
import { ArrowRight, Store } from "lucide-react";
import { businessUnits, outletHref, unitHref } from "@/data/units";
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

type UnitsPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** ImageBand only needs a still, so the shared section background photos are reused. */
function still(bg: SectionBackgroundConfig, alt: string): ImageAsset {
  return { src: bg.src, alt: bg.type === "image-loop" ? bg.alt : alt };
}

/** Overview of every building owned by the group (route: /unit-bisnis). */
export function UnitsPageContent({ heroBackground }: UnitsPageContentProps) {
  // Every outlet that operates inside a building, flattened for the card grid.
  const outletRows = businessUnits.flatMap((unit) =>
    unit.outlets.map((outlet) => ({ unit, outlet })),
  );

  return (
    <>
      <PageHero
        eyebrow="Unit Bisnis"
        title="Satu grup, enam bangunan, banyak pengalaman"
        description="Dari hotel dan convention centre sampai waterpark dan area pemancingan keluarga."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Unit Bisnis" }]}
      >
        <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
          Rencanakan kunjungan
        </Button>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow="Daftar bangunan"
          title="Jelajahi setiap unit bisnis"
          description="Pilih bangunan untuk melihat fasilitas dan unit bisnis di dalamnya."
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
              ctaLabel={"Lihat " + unit.name}
            />
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={still(sectionBackgrounds.worksGrid, "Tampak udara kawasan Q")}
        caption="Kawasan Q dari udara"
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Outlet di dalam gedung"
          title="Siapa beroperasi di mana"
          description="Enam unit bisnis berjalan di dalam bangunan kawasan Q."
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outletRows.map(({ unit, outlet }) => (
            <motion.div key={outlet.slug} variants={staggerItem} className="h-full">
              <InfoCard
                href={outletHref(unit, outlet)}
                eyebrow={unit.name + " · " + outlet.type}
                title={outlet.name}
                body={outlet.tagline}
                icon={<Store className="h-5 w-5" aria-hidden />}
                footer={
                  <span className="text-sm font-semibold text-lagoon-700">Lihat detail</span>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
        <div className="mt-10">
          <Button href="/contact" variant="outline">
            Hubungi tim reservasi
          </Button>
        </div>
      </ContentBand>
    </>
  );
}
