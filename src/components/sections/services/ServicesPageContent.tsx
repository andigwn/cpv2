"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Moon, Sparkles } from "lucide-react";
import { services, serviceCategories, stayPackages } from "@/data/services";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import type { ImageAsset, SectionBackgroundConfig, ServiceCategory } from "@/types";
import { cn } from "@/lib/utils";
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

/** Listing pages stay scannable: never more than six cards, the rest become text links. */
const MAX_LISTED = 6;

const bandImage = (background: SectionBackgroundConfig, alt: string): ImageAsset =>
  background.type === "video"
    ? { src: background.poster, alt }
    : { src: background.src, alt: background.alt };

/**
 * Services listing page: a filtered catalogue of six cards, the stay packages, and one
 * short reservation band — separated by full-bleed ImageBands on the shared canvas.
 */
export function ServicesPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? services
        : services.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const visible = filtered.slice(0, MAX_LISTED);
  const remaining = filtered.slice(MAX_LISTED);

  return (
    <>
      <PageHero
        eyebrow="Layanan & Fasilitas"
        title="Satu kawasan, delapan pengalaman berbeda"
        description="Hotel, waterpark, beach club, spa, restoran, kids club, convention centre, dan transportasi — semuanya dikelola tim internal Qubu Resort."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Layanan" }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Minta penawaran
          </Button>
          <Button href="#paket" variant="outline">
            Lihat paket menginap
          </Button>
        </div>
      </PageHero>

      <ContentBand>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionTitle
            eyebrow="Katalog"
            title="Pilih kategori layanan"
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori layanan">
            {serviceCategories.map((category) => (
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
          {visible.map((service) => (
            <Card
              key={service.slug}
              variants={staggerItem}
              image={service.image}
              title={service.name}
              description={service.summary}
              eyebrow={service.tagline}
              href={"/services/" + service.slug}
              accent={service.featured ? "sunshine" : "lagoon"}
              meta={
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {service.specs[2]?.value ?? "Fleksibel"}
                </span>
              }
              footer={
                <div className="flex items-center justify-between">
                  <span className="text-ink-500 text-xs">Mulai dari</span>
                  <span className="text-lagoon-700 text-sm font-semibold">{service.priceFrom}</span>
                </div>
              }
            />
          ))}
        </StaggerContainer>

        {remaining.length ? (
          <p className="text-ink-500 mt-8 text-sm">
            Layanan lainnya:{" "}
            {remaining.map((service, index) => (
              <span key={service.slug}>
                <Link
                  href={"/services/" + service.slug}
                  className="text-lagoon-700 font-semibold underline"
                >
                  {service.name}
                </Link>
                {index < remaining.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        ) : null}
      </ContentBand>

      <ImageBand
        image={bandImage(
          sectionBackgrounds.servicesIntro,
          "Beach club Qubu Resort dengan kursi santai di tepi pantai",
        )}
        caption="Delapan layanan dalam satu kawasan."
      />

      <ContentBand id="paket">
        <SectionTitle
          eyebrow="Paket menginap"
          title="Paket siap pesan untuk liburan keluarga"
          description="Gratis pembatalan hingga 72 jam sebelum kedatangan."
          align="center"
          className="mx-auto items-center text-center"
        />

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stayPackages.map((pack) => (
            <motion.div key={pack.name} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow={pack.nights + " malam"}
                title={pack.name}
                body={pack.perks[0]}
                icon={
                  pack.highlight ? (
                    <Sparkles className="h-5 w-5" aria-hidden />
                  ) : (
                    <Moon className="h-5 w-5" aria-hidden />
                  )
                }
                className={cn(
                  pack.highlight &&
                    "border-lagoon-300 from-white to-lagoon-50 bg-linear-to-b shadow-[0_35px_80px_-50px_rgba(11,108,60,0.6)]",
                )}
                footer={
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-ink-900 text-xl font-bold">
                        {pack.price}
                      </span>
                      {pack.highlight ? (
                        <span className="bg-lagoon-600 rounded-full px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase">
                          Paling populer
                        </span>
                      ) : null}
                    </div>
                    <Button
                      href="/contact"
                      size="sm"
                      fullWidth
                      variant={pack.highlight ? "primary" : "outline"}
                    >
                      Pesan {pack.name}
                    </Button>
                  </div>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={bandImage(sectionBackgrounds.homeCta, "Kolam resort dengan payung putih di siang hari")}
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Reservasi"
          title="Butuh paket khusus untuk grup besar?"
          description="Tim reservasi kami menyusun penawaran untuk grup di atas 10 kamar."
          className="max-w-2xl"
        />

        <div className="mt-8">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Hubungi tim reservasi
          </Button>
        </div>
      </ContentBand>
    </>
  );
}
