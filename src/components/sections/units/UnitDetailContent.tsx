"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import type { BusinessUnit } from "@/types";
import { businessUnits, outletHref, unitHref } from "@/data/units";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

type UnitDetailContentProps = {
  unit: BusinessUnit;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** Detail page for one building: a short intro, features, outlets and related links. */
export function UnitDetailContent({ unit, heroBackground }: UnitDetailContentProps) {
  const others = businessUnits.filter((item) => item.slug !== unit.slug).slice(0, 3);
  const specs = unit.specs.slice(0, 4);
  const features = unit.features.slice(0, 6);
  const [first, second, third] = unit.gallery;

  return (
    <>
      <PageHero
        eyebrow={unit.type}
        title={unit.name}
        description={unit.summary}
        background={heroBackground}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Unit Bisnis", href: "/unit-bisnis" },
          { label: unit.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Hubungi unit ini
          </Button>
          <span className="inline-flex items-center gap-2 rounded-full border border-lagoon-200 bg-white/80 px-4 py-2 text-sm text-ink-700 backdrop-blur-md">
            <Clock className="h-4 w-4 text-lagoon-600" aria-hidden />
            {unit.hours}
          </span>
        </div>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow="Tentang"
          title={"Sekilas " + unit.name}
          description={unit.description[0]}
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

      <ImageBand image={first ?? unit.image} caption={"Suasana " + unit.name} />

      <ContentBand>
        <SectionTitle eyebrow="Fasilitas" title="Yang tersedia di gedung ini" className="max-w-2xl" />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature} variants={staggerItem} className="h-full">
              <InfoCard title={feature} icon={<Check className="h-5 w-5" aria-hidden />} />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={second ?? unit.image} caption={"Kawasan " + unit.name} />

      <ContentBand>
        <SectionTitle
          eyebrow="Unit bisnis di dalam"
          title={unit.outlets.length ? "Yang beroperasi di gedung ini" : "Unit tunggal"}
          description={
            unit.outlets.length
              ? "Setiap outlet memiliki halaman sendiri."
              : "Bangunan ini dijalankan sebagai satu unit bisnis."
          }
          className="max-w-2xl"
        />
        {unit.outlets.length ? (
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unit.outlets.map((outlet) => (
              <Card
                key={outlet.slug}
                variants={staggerItem}
                image={outlet.image}
                eyebrow={outlet.type}
                title={outlet.name}
                description={outlet.tagline}
                href={outletHref(unit, outlet)}
                ctaLabel={"Lihat " + outlet.name}
              />
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn className="mt-8 max-w-2xl rounded-3xl bg-white/70 p-6 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-ink-600">
              {unit.tagline}. Seluruh layanan {unit.name} ditangani langsung oleh tim unit ini.
            </p>
          </FadeIn>
        )}
      </ContentBand>

      <ImageBand image={third ?? unit.image} caption={"Sudut lain " + unit.name} />

      <ContentBand>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Unit bisnis lain"
            title="Bangunan lain di kawasan Q"
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />
          <Button
            href="/unit-bisnis"
            variant="outline"
            icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            Semua unit bisnis
          </Button>
        </div>
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <Card
              key={item.slug}
              variants={staggerItem}
              image={item.image}
              eyebrow={item.type}
              title={item.name}
              description={item.tagline}
              href={unitHref(item)}
              ctaLabel={"Lihat " + item.name}
            />
          ))}
        </StaggerContainer>
      </ContentBand>
    </>
  );
}
