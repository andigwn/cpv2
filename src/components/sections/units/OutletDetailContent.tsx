"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Store, Tag } from "lucide-react";
import type { BusinessUnit, UnitOutlet } from "@/types";
import { outletHref, unitHref } from "@/data/units";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

type OutletDetailContentProps = {
  unit: BusinessUnit;
  outlet: UnitOutlet;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** Detail page for a business unit inside a building, with a way back to its parent. */
export function OutletDetailContent({ unit, outlet, heroBackground }: OutletDetailContentProps) {
  const siblings = unit.outlets.filter((item) => item.slug !== outlet.slug).slice(0, 3);
  const specs = outlet.specs.slice(0, 4);
  const features = outlet.features.slice(0, 6);
  const [first, second] = outlet.gallery;

  return (
    <>
      <PageHero
        eyebrow={unit.name + " · " + outlet.type}
        title={outlet.name}
        description={outlet.summary}
        background={heroBackground}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Unit Bisnis", href: "/unit-bisnis" },
          { label: unit.name, href: unitHref(unit) },
          { label: outlet.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Reservasi
          </Button>
          {outlet.priceFrom ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-lagoon-200 bg-white/80 px-4 py-2 text-sm text-ink-700 backdrop-blur-md">
              <Tag className="h-4 w-4 text-lagoon-600" aria-hidden />
              Mulai dari <strong className="text-lagoon-700">{outlet.priceFrom}</strong>
            </span>
          ) : null}
        </div>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow="Tentang"
          title={"Sekilas " + outlet.name}
          description={outlet.description[0]}
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec) => (
            <motion.div key={spec.label} variants={staggerItem} className="h-full">
              <InfoCard eyebrow={spec.label} title={spec.value} />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={first ?? outlet.image} caption={"Suasana " + outlet.name} />

      <ContentBand>
        <SectionTitle
          eyebrow="Yang tersedia"
          title="Fasilitas dan layanan"
          className="max-w-2xl"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature} variants={staggerItem} className="h-full">
              <InfoCard title={feature} icon={<Check className="h-5 w-5" aria-hidden />} />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={second ?? outlet.image} caption={"Sudut lain " + outlet.name} />

      <ContentBand>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow={unit.name}
            title={siblings.length ? "Unit lain di gedung ini" : "Kembali ke gedung"}
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />
          <Button
            href={unitHref(unit)}
            variant="outline"
            icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            Lihat {unit.name}
          </Button>
        </div>
        {siblings.length ? (
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((item) => (
              <motion.div key={item.slug} variants={staggerItem} className="h-full">
                <InfoCard
                  href={outletHref(unit, item)}
                  eyebrow={item.type}
                  title={item.name}
                  body={item.tagline}
                  icon={<Store className="h-5 w-5" aria-hidden />}
                  footer={
                    <span className="text-sm font-semibold text-lagoon-700">Lihat detail</span>
                  }
                />
              </motion.div>
            ))}
          </StaggerContainer>
        ) : (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-600">
            {outlet.name} adalah satu-satunya unit bisnis di {unit.name}.
          </p>
        )}
      </ContentBand>
    </>
  );
}
