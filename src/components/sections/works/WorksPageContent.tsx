"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import { workCategories, works } from "@/data/works";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Chip } from "@/components/ui/Chip";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

type WorkCategory = (typeof workCategories)[number]["value"];

/** Portfolio grid with category filter (prd.md sitemap: /works). */
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

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Proyek yang kami kembangkan dan kelola"
        description="Dari masterplan kawasan sampai renovasi kamar: dua belas proyek hospitality di lima destinasi Indonesia."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.worksGrid} />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionTitle
              eyebrow="Filter"
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

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((work, index) => (
                  <motion.article
                    key={work.slug}
                    variants={staggerItem}
                    className={cn(
                      "group relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_35px_80px_-50px_rgba(19,25,34,0.55)]",
                      index === 0 && filtered.length > 2 && "sm:col-span-2",
                    )}
                  >
                    <Link href={`/works#${work.slug}`} className="block h-full">
                      <div
                        className={cn(
                          "relative overflow-hidden",
                          index === 0 && filtered.length > 2 ? "aspect-[16/9]" : "aspect-[4/3]",
                        )}
                      >
                        <Image
                          src={work.image.src}
                          alt={work.image.alt}
                          fill
                          sizes={
                            index === 0 && filtered.length > 2
                              ? "(max-width: 640px) 100vw, 66vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          }
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                        />

                        <span className="absolute top-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-ink-700 uppercase backdrop-blur-md">
                          {work.category}
                        </span>

                        <div className="absolute inset-x-5 bottom-5">
                          <p className="text-xs font-medium tracking-[0.16em] text-white/80 uppercase">
                            {work.client}
                          </p>
                          <h3 className="mt-1 text-xl leading-tight text-white sm:text-2xl">
                            {work.title}
                          </h3>
                        </div>

                        <span className="absolute right-5 bottom-5 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white/90 text-ink-800 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </span>
                      </div>

                      <div className="flex flex-col gap-4 p-6">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-500">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" aria-hidden />
                            {work.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" aria-hidden />
                            {work.year}
                          </span>
                        </div>

                        <p className="text-sm leading-relaxed text-ink-600">{work.summary}</p>

                        <dl className="grid grid-cols-3 gap-3 border-t border-ink-100 pt-4">
                          {work.metrics.map((metric) => (
                            <div key={metric.label}>
                              <dt className="text-[0.65rem] tracking-[0.12em] text-ink-400 uppercase">
                                {metric.label}
                              </dt>
                              <dd className="mt-0.5 text-sm font-semibold text-ink-800">
                                {metric.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>

          <FadeIn delay={0.2} className="mt-12 rounded-3xl border border-white/70 bg-white/85 p-8 backdrop-blur-sm">
            <h2 className="text-xl">Butuh pengembangan properti serupa?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
              Tim development kami membantu studi kelayakan, perencanaan konsep, manajemen
              konstruksi, sampai pre-opening dan operasional. Kirimkan ringkasan proyek Anda untuk
              diskusi awal tanpa biaya.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lagoon-700"
            >
              Mulai diskusi proyek
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
