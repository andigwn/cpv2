"use client";

import { motion } from "framer-motion";
import { ArrowRight, Store } from "lucide-react";
import { businessUnits, unitHref } from "@/data/units";
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

/** Overview of every business unit owned by the group (route: /unit-bisnis). */
export function UnitsPageContent({ heroBackground }: UnitsPageContentProps) {
  // Supporting facilities flattened across the five units, each linking back to its unit.
  const facilityRows = businessUnits.flatMap((unit) =>
    unit.facilities.map((facility) => ({ unit, facility })),
  );

  return (
    <>
      <PageHero
        eyebrow="Destinasi"
        title="Lima destinasi, satu kawasan terpadu"
        description="Dari hotel dan convention centre sampai waterpark dan villa privat — semuanya berjarak beberapa menit berjalan kaki."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinasi" }]}
      >
        <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
          Rencanakan kunjungan
        </Button>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow="Daftar destinasi"
          title="Jelajahi setiap destinasi"
          description="Pilih destinasi untuk melihat profil, jenis kamar atau ruangan, fasilitas pendukung, dan galeri fotonya."
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
          eyebrow="Fasilitas pendukung"
          title="Restoran, spa, ruang rapat, dan lainnya"
          description="Fasilitas yang beroperasi di dalam setiap destinasi Qubu Resort."
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilityRows.map(({ unit, facility }) => (
            <motion.div key={unit.slug + "-" + facility.slug} variants={staggerItem} className="h-full">
              <InfoCard
                href={unitHref(unit)}
                eyebrow={unit.name + " · " + facility.type}
                title={facility.name}
                body={facility.description}
                icon={<Store className="h-5 w-5" aria-hidden />}
                footer={
                  <span className="text-lagoon-700 text-sm font-semibold">Lihat detail</span>
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
