"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Users } from "lucide-react";
import { services, serviceCategories, stayPackages } from "@/data/services";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";
import { FadeIn } from "@/components/animations/FadeIn";
import type { ServiceCategory } from "@/types";

/** Services listing page with a live category filter (prd.md sitemap: /services). */
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

  return (
    <>
      <PageHero
        eyebrow="Layanan & Fasilitas"
        title="Satu kawasan, delapan pengalaman berbeda"
        description="Hotel, waterpark, beach club, spa, empat restoran, kids club, convention centre, dan layanan transportasi — semuanya dikelola tim internal Qubu Resort."
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

      <section className="relative overflow-hidden py-16 lg:py-20">
        <SectionBackground {...sectionBackgrounds.servicesIntro} />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionTitle
              eyebrow="Katalog"
              title="Pilih kategori layanan"
              className="max-w-xl"
              titleClassName="text-2xl sm:text-3xl"
            />

            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter kategori layanan"
            >
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

          <motion.p
            key={`count-${activeCategory}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-ink-500 mt-6 text-sm"
          >
            Menampilkan <strong className="text-ink-800">{filtered.length}</strong> dari{" "}
            {services.length} layanan.
          </motion.p>

          <StaggerContainer
            key={`grid-${activeCategory}`}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((service) => (
              <Card
                key={service.slug}
                variants={staggerItem}
                image={service.image}
                title={service.name}
                description={service.summary}
                eyebrow={service.tagline}
                href={`/services/${service.slug}`}
                accent={service.featured ? "sunshine" : "lagoon"}
                meta={
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {service.specs[2]?.value ?? "Fleksibel"}
                  </span>
                }
                footer={
                  <div className="border-ink-100 flex items-center justify-between border-t pt-3">
                    <span className="text-ink-500 text-xs">Mulai dari</span>
                    <span className="text-lagoon-700 text-sm font-semibold">
                      {service.priceFrom}
                    </span>
                  </div>
                }
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Packages ---------------- */}
      <section id="paket" className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.homeCta} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Paket menginap"
            title="Paket siap pesan untuk liburan keluarga"
            description="Semua paket sudah termasuk akses fasilitas kawasan dan gratis pembatalan hingga 72 jam sebelum kedatangan."
            align="center"
            className="mx-auto items-center text-center"
          />

          <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
            {stayPackages.map((pack) => (
              <motion.div
                key={pack.name}
                variants={staggerItem}
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 backdrop-blur-sm transition-shadow duration-500",
                  pack.highlight
                    ? "border-lagoon-300 to-lagoon-50 bg-linear-to-b from-white shadow-[0_35px_80px_-50px_rgba(34,135,205,0.8)]"
                    : "border-white/70 bg-white/85 hover:shadow-[0_30px_70px_-45px_rgba(19,25,34,0.5)]",
                )}
              >
                {pack.highlight ? (
                  <span className="bg-lagoon-600 absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Paling populer
                  </span>
                ) : null}

                <h3 className="text-xl">{pack.name}</h3>
                <p className="text-ink-500 mt-1 text-xs tracking-[0.16em] uppercase">
                  {pack.nights} malam
                </p>
                <p className="font-display text-ink-900 mt-5 text-3xl font-bold">{pack.price}</p>
                <p className="text-ink-500 text-xs">untuk 2 dewasa & 2 anak</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {pack.perks.map((perk) => (
                    <li key={perk} className="text-ink-600 flex items-start gap-3 text-sm">
                      <Users className="text-leaf-600 mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      {perk}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  className="mt-7"
                  variant={pack.highlight ? "primary" : "outline"}
                  fullWidth
                >
                  Pesan {pack.name}
                </Button>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2} className="text-ink-500 mt-10 text-center text-xs">
            Harga sudah termasuk pajak dan service charge. Ketersediaan paket bergantung pada
            periode menginap.{" "}
            <Link href="/contact" className="text-lagoon-700 font-semibold underline">
              Hubungi tim reservasi
            </Link>{" "}
            untuk grup di atas 10 kamar.
          </FadeIn>
        </div>
      </section>
    </>
  );
}
