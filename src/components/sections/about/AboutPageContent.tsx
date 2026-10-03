"use client";

import { motion } from "framer-motion";
import { ChevronRight, Eye, Target } from "lucide-react";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import type { ImageAsset, SectionBackgroundConfig } from "@/types";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useAboutStory, useCompanyValues } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

type AboutPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** ImageBand wants a plain { src, alt } pair; the shared backgrounds already are. */
const bandImage = (background: SectionBackgroundConfig, alt: string): ImageAsset => ({
  src: background.src,
  alt: background.alt || alt,
});

/**
 * About page on the shared broken-white canvas.
 *
 * Rhythm: story -> vision & mission -> values, each pair of content bands separated by a
 * full-bleed ImageBand and closed by one short invitation band. No dividers anywhere.
 */
export function AboutPageContent({ heroBackground }: AboutPageContentProps) {
  const t = useT();
  const aboutStory = useAboutStory();
  const companyValues = useCompanyValues();

  const visionMission = [
    { label: t("about.visionLabel"), text: t("about.visionText"), icon: Eye },
    { label: t("about.missionLabel"), text: t("about.missionText"), icon: Target },
  ];

  return (
    <>
      <PageHero
        eyebrow={aboutStory.eyebrow}
        title={aboutStory.title}
        description={aboutStory.lead}
        background={heroBackground}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("nav.about") },
        ]}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("about.storyEyebrow")}
          title={t("about.storyTitle")}
          description={t("about.storyDescription")}
          className="max-w-2xl"
        />

        <FadeIn delay={0.12} className="mt-8">
          <Button
            href="/services"
            variant="outline"
            icon={<ChevronRight className="h-4 w-4" aria-hidden />}
          >
            {t("about.storyCta")}
          </Button>
        </FadeIn>
      </ContentBand>

      <ImageBand
        image={bandImage(sectionBackgrounds.aboutStory, t("about.storyBandCaption"))}
        caption={t("about.storyBandCaption")}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("about.directionEyebrow")}
          title={t("about.directionTitle")}
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
          {visionMission.map(({ label, text, icon: IconComponent }) => (
            <motion.div key={label} variants={staggerItem} className="h-full">
              <InfoCard
                title={label}
                body={text}
                titleClassName="text-xl"
                icon={<IconComponent className="h-5 w-5" aria-hidden />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={bandImage(sectionBackgrounds.aboutTimeline, aboutStory.title)}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("about.valuesEyebrow")}
          title={t("about.valuesTitle")}
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((value) => (
            <motion.div key={value.title} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow={t("about.valueEyebrow")}
                title={value.title}
                body={value.description}
                icon={<Icon name={value.icon} className="h-5 w-5" />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>
    </>
  );
}
