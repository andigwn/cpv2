"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, MapPin, Tag } from "lucide-react";
import type { Service } from "@/types";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { services } from "@/data/services";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

/** Detail page for a single service (prd.md sitemap: /services/[slug]). */
export function ServiceDetailContent({
  service,
  heroBackground,
}: {
  service: Service;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.name}
        description={service.summary}
        background={heroBackground}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Layanan", href: "/services" },
          { label: service.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Reservasi layanan ini
          </Button>
          <span className="border-lagoon-200 text-ink-700 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm backdrop-blur-md">
            <Tag className="text-lagoon-600 h-4 w-4" aria-hidden />
            Mulai dari <strong className="text-lagoon-700">{service.priceFrom}</strong>
          </span>
        </div>
      </PageHero>

      {/* ---------------- Intro + specs ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.detailPage} />

        <div className="shell relative z-10 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <div className="flex flex-col gap-5">
              {service.description.map((paragraph, index) => (
                <FadeIn key={index} delay={index * 0.06}>
                  <p className="text-ink-600 text-sm leading-relaxed sm:text-base">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.15} className="mt-10">
              <h2 className="text-xl">Yang termasuk</h2>
              <StaggerContainer className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={staggerItem}
                    className="text-ink-700 flex list-none items-start gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 text-sm backdrop-blur-sm"
                  >
                    <Check className="text-leaf-600 mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {feature}
                  </motion.li>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>

          <aside className="flex flex-col gap-6">
            <FadeIn className="rounded-3xl border border-white/70 bg-white/90 p-7 backdrop-blur-sm">
              <h2 className="text-lg">Detail operasional</h2>
              <dl className="divide-ink-100 mt-5 flex flex-col divide-y">
                {service.specs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-6 py-3">
                    <dt className="text-ink-500 text-xs tracking-[0.14em] uppercase">
                      {spec.label}
                    </dt>
                    <dd className="text-ink-800 text-right text-sm font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="text-ink-500 mt-6 flex flex-col gap-3 text-xs">
                <span className="inline-flex items-center gap-2">
                  <Clock className="text-lagoon-600 h-3.5 w-3.5" aria-hidden />
                  Konfirmasi pemesanan dalam 2 jam kerja
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="text-lagoon-600 h-3.5 w-3.5" aria-hidden />
                  Qubu Resort, Tanjung Benoa, Bali
                </span>
              </div>

              <Button href="/contact" className="mt-7" fullWidth>
                Tanya ketersediaan
              </Button>
            </FadeIn>

            <ParallaxImage
              image={service.gallery[0] ?? service.image}
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
            title={`Sekilas suasana ${service.name}`}
            className="max-w-2xl"
          />

          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.gallery.map((image, index) => (
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
                <div
                  aria-hidden
                  className="from-ink-900/45 absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Related ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.ctaBand} />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow="Layanan lain"
              title="Lengkapi pengalaman Anda"
              className="max-w-xl"
              titleClassName="text-2xl sm:text-3xl"
            />
            <Button
              href="/services"
              variant="outline"
              icon={<ArrowLeft className="h-4 w-4" aria-hidden />}
              iconPosition="left"
            >
              Semua layanan
            </Button>
          </div>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <motion.div key={item.slug} variants={staggerItem}>
                <Link
                  href={`/services/${item.slug}`}
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
                    <h3 className="text-lg">{item.name}</h3>
                    <p className="text-ink-600 mt-2 text-sm leading-relaxed">{item.tagline}</p>
                    <span className="text-lagoon-700 mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold">
                      Lihat detail
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
