"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Presentation,
  Send,
  Users,
} from "lucide-react";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useCareerBenefits, useHiringSteps, useJobOpenings } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";
import type { ImageAsset } from "@/types";

/** Pulls a photo out of the shared background library as an ImageBand asset. */
function bandImage(key: keyof typeof sectionBackgrounds): ImageAsset {
  const background = sectionBackgrounds[key];
  return { src: background.src, alt: background.alt };
}

/** One lucide icon per hiring step, in order (the data carries only the step label). */
const stepIcons = [CheckCircle2, Users, Presentation, CalendarCheck] as const;

/**
 * Careers page (prd.md sitemap: /careers).
 *
 * Rhythm: PageHero -> benefits -> photo -> openings -> photo -> hiring steps -> photo -> CTA.
 * Benefits, openings and hiring steps are all card grids; the responsibilities/requirements
 * lists live nowhere else now.
 */
export function CareersPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const t = useT();
  const openings = useJobOpenings().slice(0, 6);
  const benefits = useCareerBenefits().slice(0, 4);
  const steps = useHiringSteps().slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={t("careers.heroEyebrow")}
        title={t("careers.heroTitle")}
        description={t("careers.heroDescription")}
        background={heroBackground}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("nav.careers") },
        ]}
      >
        <Button
          href={`mailto:${SITE.contact.careerEmail}`}
          icon={<Send className="h-4 w-4" aria-hidden />}
          iconPosition="left"
        >
          {t("careers.heroCta")}
        </Button>
      </PageHero>

      {/* ---- Benefits ---- */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("careers.benefitsEyebrow")}
          title={t("careers.benefitsTitle")}
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <motion.div key={benefit.title} variants={staggerItem} className="h-full">
              <InfoCard
                title={benefit.title}
                body={benefit.description}
                icon={<Icon name={benefit.icon} className="h-6 w-6" />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={bandImage("servicesIntro")} />

      {/* ---- Openings ---- */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("careers.openingsEyebrow")}
          title={t("careers.openingsTitle")}
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {openings.map((job) => (
            <motion.div key={job.slug} id={job.slug} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow={job.department}
                title={job.title}
                body={job.description}
                icon={<MapPin className="h-5 w-5" aria-hidden />}
                footer={
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-ink-500 text-xs">
                      {job.location} · {job.level} · {job.type}
                    </span>
                    <Button
                      href={`mailto:${SITE.contact.careerEmail}?subject=${encodeURIComponent(job.title)}`}
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                      icon={<ChevronRight className="h-4 w-4" aria-hidden />}
                    >
                      {t("careers.apply")}
                    </Button>
                  </div>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={bandImage("aboutTeam")} />

      {/* ---- Hiring steps ---- */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("careers.stepsEyebrow")}
          title={t("careers.stepsTitle")}
          align="center"
          className="mx-auto"
        />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const StepIcon = stepIcons[index] ?? CheckCircle2;
            return (
              <motion.div key={step.step} variants={staggerItem} className="h-full">
                <InfoCard
                  eyebrow={step.step}
                  title={step.title}
                  body={step.description}
                  icon={<StepIcon className="h-5 w-5" aria-hidden />}
                />
              </motion.div>
            );
          })}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={bandImage("contactForm")} />

      {/* ---- Open application ---- */}
      <ContentBand width="narrow" className="text-center">
        <SectionTitle
          eyebrow={t("careers.openEyebrow")}
          title={t("careers.openTitle")}
          description={t("careers.openDescription")}
          align="center"
          className="mx-auto"
        />
        <FadeIn delay={0.1} className="mt-8 flex justify-center">
          <Button
            href={`mailto:${SITE.contact.careerEmail}?subject=${encodeURIComponent(
              t("careers.openSubject"),
            )}`}
            icon={<Send className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            {t("careers.openCta")}
          </Button>
        </FadeIn>
      </ContentBand>
    </>
  );
}
