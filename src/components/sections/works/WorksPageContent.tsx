"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, ClipboardList, HardHat, MapPin, PencilRuler } from "lucide-react";
import { workCategories, works } from "@/data/works";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import type { ImageAsset, SectionBackgroundConfig } from "@/types";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { PageHero } from "@/components/sections/PageHero";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

type WorkCategory = (typeof workCategories)[number]["value"];

/** The listing shows six projects at a time; metrics and scope blocks stay out of it. */
const MAX_LISTED = 6;

const bandImage = (background: SectionBackgroundConfig, alt: string): ImageAsset =>
  background.type === "video"
    ? { src: background.poster, alt }
    : { src: background.src, alt: background.alt };

/** Reused from the first project: the four stages every Qubu development goes through. */
const workingScope = works[0]?.scope.slice(0, 4) ?? [];

/** One icon per stage so the four steps read as a sequence rather than a list. */
const stepIcons = [ClipboardList, PencilRuler, HardHat, Building2] as const;

/**
 * Portfolio grid with a category filter (prd.md sitemap: /works).
 *
 * Six cards under a working filter, then one short scope band and one invitation band,
 * with full-bleed ImageBands in between so the page never needs a divider.
 */
export function WorksPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("all");

  const filtered = useMemo(
    () => (activeCategory === "all" ? works : works.filter((work) => work.category === activeCategory)),
    [activeCategory],
  );

  const visible = filtered.slice(0, MAX_LISTED);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Proyek yang kami kembangkan dan kelola"
        description="Dari masterplan kawasan sampai renovasi kamar, di lima destinasi Indonesia."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <ContentBand>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionTitle
            eyebrow="Portfolio"
            title="Telusuri berdasarkan jenis proyek"
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter portfolio">
            {workCategories.map((category) => (
              <Chip
                key={category.value}
                label={category.label}
                isActive={activeCategory === category.value}
                onClick={() => setActiveCategory(category.value)}
              />
            ))}
          </div>
        </div>

        <StaggerContainer
          key={"grid-" + activeCategory}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((work) => (
            <Card
              key={work.slug}
              variants={staggerItem}
              image={work.image}
              title={work.title}
              description={work.summary}
              eyebrow={work.category}
              href={"/works#" + work.slug}
              accent="none"
              meta={
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {work.location}
                </span>
              }
            />
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={bandImage(
          sectionBackgrounds.highlights,
          "Kolam laguna dengan taman tropis di kawasan resort",
        )}
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Cara kami bekerja"
          title="Dari studi kelayakan sampai operasional"
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workingScope.map((item, index) => {
            const StepIcon = stepIcons[index % stepIcons.length];
            return (
              <motion.div key={item} variants={staggerItem} className="h-full">
                <InfoCard
                  eyebrow={"Langkah " + String(index + 1).padStart(2, "0")}
                  title={item}
                  icon={<StepIcon className="h-5 w-5" aria-hidden />}
                />
              </motion.div>
            );
          })}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={bandImage(
          sectionBackgrounds.aboutIntro,
          "Pemandangan udara kawasan resort dengan kolam dan taman",
        )}
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Mulai proyek"
          title="Butuh pengembangan properti serupa?"
          description="Kirimkan ringkasan proyek Anda untuk diskusi awal tanpa biaya."
          className="max-w-2xl"
        />

        <div className="mt-8">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Mulai diskusi proyek
          </Button>
        </div>
      </ContentBand>
    </>
  );
}
