"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BedDouble, Check, Clock, LayoutGrid } from "lucide-react";
import type { BusinessUnit } from "@/types";
import { businessUnits, unitHref } from "@/data/units";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { RoomTypeCard } from "@/components/ui/RoomTypeCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { UnitGallery } from "@/components/sections/units/UnitGallery";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

type UnitDetailContentProps = {
  unit: BusinessUnit;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** "Jenis Kamar" → "kamar", "Jenis Ruangan" → "ruangan", "Jenis Kolam" → "kolam". */
function groupNoun(label?: string) {
  if (!label) return "kamar";
  return label.replace(/^Jenis\s+/i, "").toLowerCase();
}

/** Call-to-action copy differs between lodging, venues and the waterpark. */
function roomCtaLabel(unit: BusinessUnit) {
  if (unit.slug === "qhall") return "Diskusikan acara Anda";
  if (unit.slug === "paradis-q") return "Tanya tiket & jadwal";
  return "Tanya ketersediaan";
}

/**
 * Detail page for one business unit. The rhythm follows the brief:
 * profile → room/venue/pool categories → supporting facilities → photo gallery.
 */
export function UnitDetailContent({ unit, heroBackground }: UnitDetailContentProps) {
  const others = businessUnits.filter((item) => item.slug !== unit.slug).slice(0, 3);
  const [first, second, third] = unit.gallery;
  const noun = groupNoun(unit.roomTypesLabel);

  return (
    <>
      <PageHero
        eyebrow={unit.type}
        title={unit.name}
        description={unit.summary}
        background={heroBackground}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Destinasi", href: "/unit-bisnis" },
          { label: unit.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Hubungi unit ini
          </Button>
          <span className="border-lagoon-200 text-ink-700 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-md">
            <Clock className="text-lagoon-600 h-4 w-4" aria-hidden />
            {unit.hours}
          </span>
        </div>
      </PageHero>

      {/* Profil */}
      <ContentBand>
        <SectionTitle
          eyebrow="Profil"
          title={"Sekilas " + unit.name}
          description={unit.description[0]}
          className="max-w-2xl"
        />

        {unit.description.length > 1 ? (
          <div className="text-ink-600 mt-6 flex max-w-3xl flex-col gap-4 text-sm leading-relaxed sm:text-base">
            {unit.description.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {unit.specs.map((spec) => (
            <motion.div key={spec.label} variants={staggerItem} className="h-full">
              <InfoCard eyebrow={spec.label} title={spec.value} />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={first ?? unit.image} caption={"Suasana " + unit.name} />

      {/* Jenis kamar / ruangan / kolam */}
      {unit.roomTypes?.length ? (
        <ContentBand>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow={unit.roomTypesLabel ?? "Tipe kamar"}
              title={"Pilihan " + noun + " di " + unit.name}
              description={
                "Setiap pilihan memiliki ukuran, kapasitas, dan fasilitas yang berbeda."
              }
              className="max-w-2xl"
            />
            <span className="border-lagoon-200 text-ink-700 inline-flex w-fit items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-md">
              <BedDouble className="text-lagoon-600 h-4 w-4" aria-hidden />
              {unit.roomTypes.length + " " + noun}
            </span>
          </div>

          <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-2">
            {unit.roomTypes.map((roomType, index) => (
              <motion.div
                key={roomType.slug}
                id={roomType.slug}
                variants={staggerItem}
                className="h-full scroll-mt-32"
              >
                <RoomTypeCard
                  roomType={roomType}
                  index={index}
                  fallbackImage={unit.image}
                  ctaLabel={roomCtaLabel(unit)}
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </ContentBand>
      ) : null}

      {/* Fasilitas pendukung */}
      <ImageBand image={second ?? first ?? unit.image} caption={"Kawasan " + unit.name} />

      <ContentBand>
        <SectionTitle
          eyebrow="Fasilitas Pendukung"
          title={
            unit.facilities.length
              ? "Yang melengkapi kunjungan Anda"
              : "Yang tersedia di " + unit.name
          }
          description={
            unit.facilities.length
              ? "Fasilitas yang beroperasi di dalam dan sekitar " + unit.name + "."
              : "Fasilitas utama yang bisa dinikmati tamu " + unit.name + "."
          }
          className="max-w-2xl"
        />

        {unit.facilities.length ? (
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unit.facilities.map((facility) =>
              facility.image ? (
                <Card
                  key={facility.slug}
                  variants={staggerItem}
                  image={facility.image}
                  eyebrow={facility.type}
                  title={facility.name}
                  description={facility.description}
                />
              ) : (
                <motion.div key={facility.slug} variants={staggerItem} className="h-full">
                  <InfoCard
                    eyebrow={facility.type}
                    title={facility.name}
                    body={facility.description}
                    icon={<LayoutGrid className="h-5 w-5" aria-hidden />}
                  />
                </motion.div>
              ),
            )}
          </StaggerContainer>
        ) : (
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unit.features.map((feature) => (
              <motion.div key={feature} variants={staggerItem} className="h-full">
                <InfoCard title={feature} icon={<Check className="h-5 w-5" aria-hidden />} />
              </motion.div>
            ))}
          </StaggerContainer>
        )}
      </ContentBand>

      {/* Galeri */}
      <ImageBand image={third ?? second ?? first ?? unit.image} caption={"Sudut lain " + unit.name} />

      <ContentBand id="galeri">
        <SectionTitle
          eyebrow="Galeri"
          title={"Galeri foto " + unit.name}
          description="Foto berganti otomatis setiap 2,5 detik — gunakan tombol panah atau geser foto untuk berpindah."
          className="max-w-2xl"
        />
        <UnitGallery slides={unit.gallery} label={"Galeri foto " + unit.name} />
      </ContentBand>

      {/* Destinasi lain */}
      <ContentBand>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Destinasi lain"
            title="Destinasi lain di kawasan Q"
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />
          <Button
            href="/unit-bisnis"
            variant="outline"
            icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            Semua destinasi
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
