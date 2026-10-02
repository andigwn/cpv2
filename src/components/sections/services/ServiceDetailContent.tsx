"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Tag } from "lucide-react";
import type { ImageAsset, Service } from "@/types";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { PageHero } from "@/components/sections/PageHero";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useLocalizedService, useServiceCategories, useServices } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

const MAX_FEATURES = 6;
const MAX_SPECS = 5;

/** Keeps the opening band to one readable breath. */
function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end > 0 ? text.slice(0, end + 1) : text;
}

/**
 * Detail page for a single service (prd.md sitemap: /services/[slug]).
 *
 * The gallery photos become full-bleed ImageBands so the page alternates
 * intro -> foto -> fitur -> foto -> spesifikasi -> foto -> layanan lain.
 */
export function ServiceDetailContent({
  service,
  heroBackground,
}: {
  service: Service;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const t = useT();
  const services = useServices();
  const categories = useServiceCategories();
  const localized = useLocalizedService(service);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const gallery: ImageAsset[] = localized.gallery.length
    ? localized.gallery
    : [localized.image];
  const intro = firstSentence(localized.description[0] ?? localized.summary);
  const categoryLabel =
    categories.find((category) => category.value === localized.category)?.label ??
    localized.category;

  return (
    <>
      <PageHero
        eyebrow={categoryLabel}
        title={localized.name}
        description={localized.summary}
        background={heroBackground}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("services.heroEyebrow"), href: "/services" },
          { label: localized.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            {t("services.detailReserveCta")}
          </Button>
          <span className="border-lagoon-200 text-ink-700 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-md">
            <Tag className="text-lagoon-600 h-4 w-4" aria-hidden />
            {t("common.startingFrom")}{" "}
            <strong className="text-lagoon-700">{localized.priceFrom}</strong>
          </span>
        </div>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow={categoryLabel}
          title={localized.tagline}
          description={intro}
          className="max-w-2xl"
        />
      </ContentBand>

      <ImageBand image={gallery[0]} />

      <ContentBand>
        <SectionTitle
          eyebrow={t("services.detailIncludedEyebrow")}
          title={t("services.detailIncludedTitle")}
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localized.features.slice(0, MAX_FEATURES).map((feature) => (
            <motion.div key={feature} variants={staggerItem} className="h-full">
              <InfoCard
                icon={<Check className="text-leaf-600 h-5 w-5" aria-hidden />}
                eyebrow={t("services.detailIncludedEyebrow")}
                title={feature}
                titleClassName="text-base"
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={gallery[1] ?? gallery[0]} />

      <ContentBand>
        <SectionTitle
          eyebrow={t("services.detailSpecsEyebrow")}
          title={t("services.detailSpecsTitle")}
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localized.specs.slice(0, MAX_SPECS).map((spec) => (
            <motion.div key={spec.label} variants={staggerItem} className="h-full">
              <InfoCard eyebrow={spec.label} title={spec.value} titleClassName="text-xl" />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={gallery[2] ?? gallery[0]} />

      <ContentBand>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow={t("services.detailOthersEyebrow")}
            title={t("services.detailOthersTitle")}
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />
          <Button
            href="/services"
            variant="outline"
            icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            {t("common.allServices")}
          </Button>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <Card
              key={item.slug}
              variants={staggerItem}
              image={item.image}
              title={item.name}
              description={item.tagline}
              eyebrow={
                categories.find((category) => category.value === item.category)?.label ??
                item.category
              }
              href={"/services/" + item.slug}
              accent="lagoon"
            />
          ))}
        </StaggerContainer>
      </ContentBand>
    </>
  );
}
