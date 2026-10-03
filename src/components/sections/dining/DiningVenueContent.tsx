"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import type { DiningVenue } from "@/types";
import { diningHref } from "@/data/dining";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { UnitGallery } from "@/components/sections/units/UnitGallery";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useDiningVenues, useLocalizedDiningVenue } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

type DiningVenueContentProps = {
  venue: DiningVenue;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/**
 * Detail page for one restaurant (route: /dining/[slug]).
 *
 * Rhythm follows the business-unit pages: hero → profile & signature points → photo beat
 * → hours & location → photo beat → gallery → the other restaurants.
 */
export function DiningVenueContent({ venue, heroBackground }: DiningVenueContentProps) {
  const t = useT();
  const diningVenues = useDiningVenues();
  const localized = useLocalizedDiningVenue(venue);
  const others = diningVenues.filter((item) => item.slug !== localized.slug);
  const [first, second] = localized.gallery;

  return (
    <>
      <PageHero
        eyebrow={localized.type}
        title={localized.name}
        description={localized.description}
        background={heroBackground}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("nav.destinations"), href: "/unit-bisnis" },
          { label: t("nav.dining") },
          { label: localized.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ChevronRight className="h-4 w-4" aria-hidden />}>
            {t("dining.reserveCta")}
          </Button>
          <span className="border-lagoon-200 text-ink-700 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-md">
            <Clock className="text-lagoon-600 h-4 w-4" aria-hidden />
            {localized.hours}
          </span>
        </div>
      </PageHero>

      {/* Profil & poin andalan */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("dining.aboutEyebrow")}
          title={t("dining.aboutTitle", { name: localized.name })}
          description={t("dining.aboutDescription", { name: localized.name })}
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {localized.features.map((feature) => (
            <motion.div key={feature} variants={staggerItem} className="h-full">
              <InfoCard
                title={feature}
                icon={<UtensilsCrossed className="h-5 w-5" aria-hidden />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      {/* Foto suasana */}
      <ImageBand
        image={second ?? first ?? localized.image}
        caption={t("dining.atmosphereCaption", { name: localized.name })}
      />

      {/* Jam buka & lokasi */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("dining.practicalEyebrow")}
          title={t("dining.practicalTitle")}
          description={t("dining.practicalDescription", { name: localized.name })}
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow={t("dining.hoursLabel")}
              title={localized.hours}
              body={t("dining.hoursNote", { name: localized.name })}
              icon={<Clock className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow={t("dining.locationLabel")}
              title={localized.location}
              body={t("dining.locationNote", { name: localized.name })}
              icon={<MapPin className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
        </StaggerContainer>
      </ContentBand>

      {/* Galeri */}
      {localized.gallery.length > 1 ? (
        <>
          <ImageBand
            image={first ?? localized.image}
            caption={t("dining.galleryBandCaption", { name: localized.name })}
          />

          <ContentBand id="galeri">
            <SectionTitle
              eyebrow={t("dining.galleryEyebrow")}
              title={t("dining.galleryTitle", { name: localized.name })}
              description={t("dining.galleryDescription", { name: localized.name })}
              className="max-w-2xl"
            />
            <UnitGallery
              slides={localized.gallery}
              label={t("dining.galleryTitle", { name: localized.name })}
            />
          </ContentBand>
        </>
      ) : null}

      {/* Reservasi */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("dining.ctaEyebrow")}
          title={t("dining.ctaTitle")}
          description={t("dining.ctaDescription")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-8 flex justify-center">
          <Button href="/contact" icon={<ChevronRight className="h-4 w-4" aria-hidden />}>
            {t("dining.ctaButton")}
          </Button>
        </div>
      </ContentBand>

      {/* Restoran lainnya */}
      {others.length ? (
        <ContentBand>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow={t("dining.othersEyebrow")}
              title={t("dining.othersTitle")}
              className="max-w-xl"
              titleClassName="text-2xl sm:text-3xl"
            />
            <Button
              href="/unit-bisnis"
              variant="outline"
              icon={<ChevronLeft className="h-4 w-4" aria-hidden />}
              iconPosition="left"
            >
              {t("common.allDestinations")}
            </Button>
          </div>
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
            {others.map((item) => (
              <Card
                key={item.slug}
                variants={staggerItem}
                image={item.image}
                eyebrow={item.type}
                title={item.name}
                description={item.description}
                href={diningHref(item)}
                ctaLabel={t("dining.viewVenue", { name: item.name })}
              />
            ))}
          </StaggerContainer>
        </ContentBand>
      ) : null}
    </>
  );
}
