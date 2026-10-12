"use client";

import { motion } from "framer-motion";
import { BedDouble, Check, ChevronLeft, ChevronRight, Clock, LayoutGrid } from "lucide-react";
import type { BusinessUnit } from "@/types";
import { unitHref } from "@/data/units";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { RoomTypeCard } from "@/components/ui/RoomTypeCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DestinationHero } from "@/components/sections/DestinationHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { UnitGallery } from "@/components/sections/units/UnitGallery";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { useBusinessUnits, useLocalizedUnit } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

type UnitDetailContentProps = {
  unit: BusinessUnit;
};

/** Call-to-action copy differs between lodging, venues and the waterpark. */
function roomCtaLabel(unit: BusinessUnit, t: ReturnType<typeof useT>) {
  if (unit.sectionCopy?.rooms?.ctaLabel) return unit.sectionCopy.rooms.ctaLabel;
  if (unit.slug === "qhall") return t("common.askVenueAvailability");
  if (unit.slug === "paradis-q") return t("common.askTickets");
  return t("common.askAvailability");
}

/**
 * Detail page for one business unit. The rhythm follows the brief:
 * profile → room/venue/pool categories → supporting facilities → photo gallery.
 */
export function UnitDetailContent({ unit }: UnitDetailContentProps) {
  const t = useT();
  const units = useBusinessUnits();
  const localized = useLocalizedUnit(unit);
  const others = units.filter((item) => item.slug !== unit.slug).slice(0, 3);
  const [first, second, third] = localized.gallery;
  const noun = localized.roomTypesNoun ?? localized.roomTypesLabel?.toLowerCase() ?? "";
  // Read from the localized unit so the hero's alt text follows the language, not just the copy.
  const hero = localized.heroImage ?? localized.image;

  // Destinations whose brief fixes its own wording override the shared headings here; the
  // rest keep the generic ones from the dictionary.
  const copy = localized.sectionCopy;

  return (
    <>
      <DestinationHero
        eyebrow={localized.type}
        title={localized.name}
        description={localized.summary}
        background={hero}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ChevronRight className="h-4 w-4" aria-hidden />}>
            {copy?.heroCtaLabel ?? t("unit.contactCta")}
          </Button>
          <span className="bg-ink-900/40 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-white/90">
            <Clock className="text-sunshine-300 h-4 w-4" aria-hidden />
            {copy?.heroNote ?? localized.hours}
          </span>
        </div>
      </DestinationHero>

      {/* Profil */}
      <ContentBand>
        <SectionTitle
          eyebrow={copy?.profile?.eyebrow ?? t("unit.aboutEyebrow")}
          title={copy?.profile?.title ?? t("unit.aboutTitle", { name: localized.name })}
          description={copy?.profile?.description ?? localized.description[0]}
          className="max-w-2xl"
        />

        {localized.description.length > 1 ? (
          <div className="text-ink-600 mt-6 flex max-w-3xl flex-col gap-4 text-sm leading-relaxed sm:text-base">
            {localized.description.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localized.specs.map((spec) => (
            <motion.div key={spec.label} variants={staggerItem} className="h-full">
              <InfoCard eyebrow={spec.label} title={spec.value} />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      {/* Photo beat that opens the "jenis kamar / ruangan / kolam" chapter. Units without
          room types (e.g. Villa Town House) skip it, so two photo bands never sit back
          to back. */}
      {localized.roomTypes?.length ? (
        <ImageBand
          image={first ?? localized.image}
          caption={t("unit.roomsCaption", { name: localized.name })}
        />
      ) : null}

      {/* Jenis kamar / ruangan / kolam */}
      {localized.roomTypes?.length ? (
        <ContentBand>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow={copy?.rooms?.eyebrow ?? localized.roomTypesLabel ?? ""}
              title={copy?.rooms?.title ?? t("unit.roomsTitle", { noun, name: localized.name })}
              description={copy?.rooms?.description ?? t("unit.roomsDescription")}
              className="max-w-2xl"
            />
            <span className="border-lagoon-200 text-ink-700 inline-flex w-fit items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-md">
              <BedDouble className="text-lagoon-600 h-4 w-4" aria-hidden />
              {localized.roomTypes.length + " " + noun}
            </span>
          </div>

          <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-2">
            {localized.roomTypes.map((roomType, index) => (
              <motion.div
                key={roomType.slug}
                id={roomType.slug}
                variants={staggerItem}
                className="h-full scroll-mt-32"
              >
                <RoomTypeCard
                  roomType={roomType}
                  index={index}
                  fallbackImage={localized.image}
                  ctaLabel={roomCtaLabel(localized, t)}
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </ContentBand>
      ) : null}

{/* Fasilitas pendukung. Destinations that have nothing of their own to list here
          (Hotel Q) opt out, so the photo beat never sits between two blocks of text. */}
      {localized.showFacilitiesSection !== false ? (
        <>
          <ImageBand
            image={second ?? first ?? localized.image}
            caption={t("unit.groundsCaption", { name: localized.name })}
          />

          <ContentBand>
            <SectionTitle
              eyebrow={copy?.facilities?.eyebrow ?? t("unit.facilitiesEyebrow")}
              title={
                copy?.facilities?.title ??
                (localized.facilities.length
                  ? t("unit.facilitiesTitleWith")
                  : t("unit.facilitiesTitleWithout", { name: localized.name }))
              }
              description={
                copy?.facilities?.description ??
                (localized.facilities.length
                  ? t("unit.facilitiesDescriptionWith")
                  : t("unit.facilitiesDescriptionWithout", { name: localized.name }))
              }
              className="max-w-2xl"
            />

            {localized.facilities.length ? (
              <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {localized.facilities.map((facility) => (
                  // The wrapper carries the anchor the navbar submenu links to, plus the
                  // offset that clears the fixed navbar — same treatment as the room cards.
                  <motion.div
                    key={facility.slug}
                    id={facility.slug}
                    variants={staggerItem}
                    className="h-full scroll-mt-32"
                  >
                    {facility.image ? (
                      <Card
                        image={facility.image}
                        eyebrow={facility.type}
                        title={facility.name}
                        description={facility.description}
                        highlights={facility.highlights}
                        note={facility.note}
                        variants={staggerItem}
                      />
                    ) : (
                      <InfoCard
                        eyebrow={facility.type}
                        title={facility.name}
                        body={facility.description}
                        icon={<LayoutGrid className="h-5 w-5" aria-hidden />}
                        variants={staggerItem}
                      />
                    )}
                  </motion.div>
                ))}
              </StaggerContainer>
            ) : (
              <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {localized.features.map((feature) => (
                  <motion.div key={feature} variants={staggerItem} className="h-full">
                    <InfoCard title={feature} icon={<Check className="h-5 w-5" aria-hidden />} />
                  </motion.div>
                ))}
              </StaggerContainer>
            )}
          </ContentBand>
        </>
      ) : null}

      {/* Galeri */}
      <ImageBand
        image={third ?? second ?? first ?? localized.image}
        caption={t("unit.galleryCaption", { name: localized.name })}
      />

      <ContentBand id="galeri">
        <SectionTitle
          eyebrow={copy?.gallery?.eyebrow ?? t("unit.galleryEyebrow")}
          title={copy?.gallery?.title ?? t("unit.galleryTitle", { name: localized.name })}
          description={copy?.gallery?.description ?? t("unit.galleryDescription")}
          className="max-w-2xl"
        />
        <UnitGallery
          slides={localized.gallery}
          label={copy?.gallery?.title ?? t("unit.galleryTitle", { name: localized.name })}
        />
      </ContentBand>

      {/* Closing CTA: only rendered for destinations that declare one in their brief. */}
      {copy?.closing ? (
        <ContentBand>
          <SectionTitle
            eyebrow={t("unit.closingEyebrow")}
            title={copy.closing.title}
            description={copy.closing.description}
            align="center"
            className="mx-auto"
          />
          <div className="mt-8 flex justify-center">
            <Button href="/contact" icon={<ChevronRight className="h-4 w-4" aria-hidden />}>
              {copy.closing.ctaLabel}
            </Button>
          </div>
        </ContentBand>
      ) : null}

      {/* Destinasi lain */}
      <ContentBand>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow={t("unit.othersEyebrow")}
            title={t("unit.othersTitle")}
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
              ctaLabel={t("common.seeDestination", { name: item.name })}
            />
          ))}
        </StaggerContainer>
      </ContentBand>
    </>
  );
}
