"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Clock, MapPin } from "lucide-react";
import { businessUnits, outletCount, outletHref, unitHref } from "@/data/units";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

type UnitsPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** Overview of every building owned by the group (route: /unit-bisnis). */
export function UnitsPageContent({ heroBackground }: UnitsPageContentProps) {
  const buildingsWithOutlets = businessUnits.filter((unit) => unit.outlets.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Unit Bisnis"
        title="Satu grup, enam bangunan, banyak pengalaman"
        description="Setiap bangunan di kawasan Q menjalankan unit bisnisnya sendiri, dari restoran dan pusat kebugaran sampai waterpark dan area pemancingan keluarga."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Unit Bisnis" }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Rencanakan kunjungan
          </Button>
          <span className="inline-flex items-center gap-2 rounded-full border border-lagoon-200 bg-white/80 px-4 py-2 text-sm text-ink-700 backdrop-blur-md">
            <Building2 className="h-4 w-4 text-lagoon-600" aria-hidden />
            <strong className="text-lagoon-700">{businessUnits.length} bangunan</strong> ·
            {outletCount} unit bisnis
          </span>
        </div>
      </PageHero>

      {/* ---------------- Building grid ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.servicesIntro} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Daftar bangunan"
            title="Jelajahi setiap unit bisnis"
            description="Klik salah satu bangunan untuk melihat fasilitas, jam operasional, dan unit bisnis yang beroperasi di dalamnya."
            className="max-w-2xl"
          />

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessUnits.map((unit) => (
              <Card
                key={unit.slug}
                variants={staggerItem}
                image={unit.image}
                eyebrow={unit.type}
                title={unit.name}
                description={unit.summary}
                href={unitHref(unit)}
                ctaLabel={"Lihat " + unit.name}
                meta={
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
                    {unit.hours}
                  </span>
                }
                footer={
                  unit.outlets.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {unit.outlets.map((outlet) => (
                        <li key={outlet.slug}>
                          <span className="inline-flex items-center rounded-full border border-lagoon-100 bg-lagoon-50/70 px-3 py-1 text-xs font-medium text-lagoon-700">
                            {outlet.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-ink-400">Unit tunggal tanpa outlet</p>
                  )
                }
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Outlets grouped by building ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.aboutValues} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Outlet di dalam gedung"
            title="Siapa beroperasi di mana"
            description="Daftar lengkap unit bisnis yang berjalan di dalam setiap bangunan beserta halaman detailnya."
            className="max-w-2xl"
          />

          <div className="mt-10 flex flex-col gap-6">
            {buildingsWithOutlets.map((unit, index) => (
              <FadeIn key={unit.slug} delay={index * 0.05}>
                <div className="rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-lagoon-700 uppercase">
                        {unit.type}
                      </span>
                      <h3 className="mt-2 text-2xl">{unit.name}</h3>
                    </div>
                    <Link
                      href={unitHref(unit)}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-lagoon-700 hover:text-lagoon-800"
                    >
                      Lihat gedung
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </div>

                  <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {unit.outlets.map((outlet) => (
                      <motion.div key={outlet.slug} variants={staggerItem}>
                        <Link
                          href={outletHref(unit, outlet)}
                          className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white/80 p-5 transition-shadow duration-500 hover:shadow-[0_28px_60px_-40px_rgba(19,25,34,0.5)]"
                        >
                          <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                            {outlet.type}
                          </span>
                          <span className="mt-2 text-lg font-semibold text-ink-900 transition-colors group-hover:text-lagoon-700">
                            {outlet.name}
                          </span>
                          <span className="mt-2 text-sm leading-relaxed text-ink-600">
                            {outlet.tagline}
                          </span>
                          <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-lagoon-700">
                            Lihat detail
                            <ArrowRight
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                              aria-hidden
                            />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.homeCta} />

        <div className="shell relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionTitle
            eyebrow="Kunjungan"
            title="Butuh bantuan memilih unit bisnis?"
            description="Tim reservasi kami membantu menyusun jadwal kunjungan, pemesanan venue, maupun kerja sama bisnis."
            className="max-w-xl"
            titleClassName="text-2xl sm:text-3xl"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/contact" size="lg">
              Hubungi kami
            </Button>
            <span className="inline-flex items-center gap-2 text-sm text-ink-600">
              <MapPin className="h-4 w-4 text-lagoon-600" aria-hidden />
              Kawasan Q, Tanjung Benoa
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
