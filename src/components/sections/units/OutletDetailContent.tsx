"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, MapPin, Tag } from "lucide-react";
import type { BusinessUnit, UnitOutlet } from "@/types";
import { outletHref, unitHref } from "@/data/units";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

type OutletDetailContentProps = {
  unit: BusinessUnit;
  outlet: UnitOutlet;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** Detail page for a business unit inside a building. */
export function OutletDetailContent({ unit, outlet, heroBackground }: OutletDetailContentProps) {
  const siblings = unit.outlets.filter((item) => item.slug !== outlet.slug);

  return (
    <>
      <PageHero
        eyebrow={unit.name + " · " + outlet.type}
        title={outlet.name}
        description={outlet.summary}
        background={heroBackground}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Unit Bisnis", href: "/unit-bisnis" },
          { label: unit.name, href: unitHref(unit) },
          { label: outlet.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Reservasi
          </Button>
          {outlet.priceFrom ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-lagoon-200 bg-white/80 px-4 py-2 text-sm text-ink-700 backdrop-blur-md">
              <Tag className="h-4 w-4 text-lagoon-600" aria-hidden />
              Mulai dari <strong className="text-lagoon-700">{outlet.priceFrom}</strong>
            </span>
          ) : null}
        </div>
      </PageHero>

      {/* ---------------- Intro + specs ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.detailPage} />

        <div className="shell relative z-10 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <div className="flex flex-col gap-5">
              {outlet.description.map((paragraph, index) => (
                <FadeIn key={index} delay={index * 0.06}>
                  <p className="text-sm leading-relaxed text-ink-600 sm:text-base">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.15} className="mt-10">
              <h2 className="text-xl">Yang tersedia</h2>
              <StaggerContainer className="mt-5 grid gap-3 sm:grid-cols-2">
                {outlet.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={staggerItem}
                    className="flex list-none items-start gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 text-sm text-ink-700 backdrop-blur-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" aria-hidden />
                    {feature}
                  </motion.li>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>

          <aside className="flex flex-col gap-6">
            <FadeIn className="rounded-3xl border border-white/70 bg-white/90 p-7 backdrop-blur-sm">
              <h2 className="text-lg">Detail operasional</h2>
              <dl className="mt-5 flex flex-col divide-y divide-ink-100">
                {outlet.specs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-6 py-3">
                    <dt className="text-xs tracking-[0.14em] text-ink-500 uppercase">{spec.label}</dt>
                    <dd className="text-right text-sm font-medium text-ink-800">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col gap-3 text-xs text-ink-500">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
                  {outlet.hours}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
                  {unit.name}, Kawasan Q, Tanjung Benoa
                </span>
              </div>

              <Button href="/contact" className="mt-7" fullWidth>
                Tanya ketersediaan
              </Button>
            </FadeIn>

            <ParallaxImage
              image={outlet.gallery[0] ?? outlet.image}
              className="aspect-4/3"
              sizes="(max-width: 1024px) 100vw, 35vw"
              distance={30}
            />
          </aside>
        </div>
      </section>

      {/* ---------------- Gallery ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.servicesIntro} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Galeri"
            title={"Sekilas suasana " + outlet.name}
            className="max-w-2xl"
          />

          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {outlet.gallery.map((image, index) => (
              <motion.div
                key={image.src + index}
                variants={staggerItem}
                className="group relative aspect-4/3 overflow-hidden rounded-3xl border border-white/70"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Siblings + back to building ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.ctaBand} />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow={unit.name}
              title={siblings.length ? "Unit lain di gedung ini" : "Kembali ke gedung"}
              className="max-w-xl"
              titleClassName="text-2xl sm:text-3xl"
            />
            <Button
              href={unitHref(unit)}
              variant="outline"
              icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
              iconPosition="left"
            >
              Lihat {unit.name}
            </Button>
          </div>

          {siblings.length ? (
            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((item) => (
                <motion.div key={item.slug} variants={staggerItem}>
                  <Link
                    href={outletHref(unit, item)}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_-45px_rgba(19,25,34,0.5)]"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                        {item.type}
                      </span>
                      <h3 className="mt-2 text-lg">{item.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.tagline}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn className="mt-8 max-w-2xl rounded-3xl border border-white/70 bg-white/85 p-8 text-sm leading-relaxed text-ink-600 backdrop-blur-sm">
              {outlet.name} adalah satu-satunya unit bisnis di {unit.name}. Kunjungi halaman gedung
              untuk melihat fasilitas lengkapnya.
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
