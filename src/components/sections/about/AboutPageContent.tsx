"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { aboutStats, aboutStory, companyValues, timeline } from "@/data/about";
import { companyStats, testimonials } from "@/data/meta";
import { facilityShowcase } from "@/data/facilities";
import { team } from "@/data/team";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { SectionBackground } from "@/components/animations/SectionBackground";

type AboutPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

export function AboutPageContent({ heroBackground }: AboutPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow={aboutStory.eyebrow}
        title={aboutStory.title}
        description={aboutStory.lead}
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tentang" }]}
      >
        <div className="flex flex-wrap gap-6 text-sm">
          {companyStats.map((stat) => (
            <div key={stat.label} className="min-w-[9rem]">
              <p className="font-display text-2xl font-bold text-lagoon-700">{stat.value}</p>
              <p className="text-xs text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ---------------- Story ---------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.aboutStory} />

        <div className="shell relative z-10 grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <SectionTitle
              eyebrow="Cerita kami"
              title="Dari 38 karyawan menjadi 1.700 lebih"
              description="Perjalanan kami dibangun bertahap, satu properti dan satu pelajaran pada satu waktu."
            />

            <AnimatedText
              as="p"
              text="Kami percaya liburan terbaik lahir dari detail kecil yang dikerjakan konsisten."
              className="mt-8 font-display text-xl leading-snug font-semibold text-ink-800 sm:text-2xl"
              stagger={0.035}
            />

            <div className="mt-8 flex flex-col gap-5">
              {aboutStory.paragraphs.map((paragraph, index) => (
                <FadeIn key={index} delay={index * 0.08}>
                  <p className="text-sm leading-relaxed text-ink-600 sm:text-base">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <FadeIn className="rounded-3xl border border-lagoon-100 bg-lagoon-50/80 p-6">
                <h3 className="text-sm font-semibold tracking-[0.18em] text-lagoon-700 uppercase">
                  Misi
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{aboutStory.mission}</p>
              </FadeIn>
              <FadeIn delay={0.1} className="rounded-3xl border border-sunshine-100 bg-sunshine-50/80 p-6">
                <h3 className="text-sm font-semibold tracking-[0.18em] text-sunshine-700 uppercase">
                  Visi
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{aboutStory.vision}</p>
              </FadeIn>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <ParallaxImage
              image={{
                src: "/images/about-hospitality-team.jpg",
                alt: "Tim hospitality Qubu Resort melayani tamu di area publik",
              }}
              className="aspect-[3/4]"
              sizes="(max-width: 1024px) 50vw, 25vw"
              distance={30}
            />
            <div className="flex flex-col gap-6">
              <ParallaxImage
                image={{
                  src: "/images/about-heritage.jpg",
                  alt: "Area resort dengan kolam dan pepohonan tropis",
                }}
                className="aspect-square"
                sizes="(max-width: 1024px) 50vw, 25vw"
                distance={20}
              />
              <FadeIn className="rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm">
                <p className="font-display text-3xl font-bold text-ink-900">32%</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">
                  Target pasokan listrik kawasan dari panel surya 4,2 MWp pada 2028.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.aboutValues} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Nilai yang kami pegang"
            title="Empat prinsip yang menentukan keputusan harian kami"
            align="center"
            className="mx-auto items-center text-center"
          />

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="group rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_-45px_rgba(19,25,34,0.5)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon-100 to-leaf-100 text-lagoon-700">
                  <Icon name={value.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{value.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Timeline ---------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.aboutTimeline} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Perjalanan"
            title="Tonggak penting Qubu Resort"
            description="Setiap ekspansi kami awali dengan studi kelayakan dan pelatihan tim lokal sebelum properti dibuka."
          />

          <div className="relative mt-14">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-[0.6rem] w-px bg-gradient-to-b from-lagoon-300 via-leaf-300 to-transparent md:left-1/2"
            />

            <ol className="flex flex-col gap-10">
              {timeline.map((entry, index) => (
                <motion.li
                  key={entry.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={cn(
                    "relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0",
                    index % 2 === 1 && "md:[&>*:first-child]:order-2",
                  )}
                >
                  <div className={cn("md:pr-12 md:text-right", index % 2 === 1 && "md:pl-12 md:text-left")}>
                    <span className="font-display text-2xl font-bold text-lagoon-700">
                      {entry.year}
                    </span>
                    <h3 className="mt-2 text-lg">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {entry.description}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-lagoon-400 bg-white md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-lagoon-500" />
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- Facilities ---------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.aboutIntro} />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Yang kami kelola"
              title="Enam lini operasional dalam satu kawasan"
              description="Setiap lini punya tim, standar, dan indikator kinerja sendiri — namun berbagi satu pengalaman tamu yang utuh."
              className="max-w-2xl"
            />
            <Button
              href="/services"
              variant="outline"
              icon={<ArrowRight className="h-4 w-4" aria-hidden />}
              className="shrink-0"
            >
              Detail layanan
            </Button>
          </div>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilityShowcase.map((facility) => (
              <Card
                key={facility.slug}
                variants={staggerItem}
                image={facility.image}
                title={facility.title}
                description={facility.description}
                accent="leaf"
                meta={
                  <span className="inline-flex items-center gap-2">
                    <Icon name={facility.iconKey} className="h-4 w-4 text-lagoon-600" />
                    {facility.hours}
                  </span>
                }
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Team ---------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.aboutTeam} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Tim kepemimpinan"
            title="Orang-orang di balik standar layanan kami"
            description="Tim inti kami rata-rata memiliki lebih dari 12 tahun pengalaman di industri hospitality dan pengembangan properti."
            align="center"
            className="mx-auto items-center text-center"
          />

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <motion.article
                key={member.name}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_-45px_rgba(19,25,34,0.5)]"
              >
                {member.image ? (
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <MonogramAvatar name={member.name} />
                )}

                <h3 className="text-lg">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-lagoon-700 uppercase">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{member.bio}</p>
              </motion.article>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-ink-500">
            <CheckCircle2 className="h-4 w-4 text-leaf-600" aria-hidden />
            Catatan: kartu tim memakai monogram karena foto kepala asli belum tersedia — ganti
            melalui <code className="rounded bg-ink-100 px-1.5 py-0.5">data/team.ts</code>.
          </FadeIn>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <SectionBackground {...sectionBackgrounds.ctaBand} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Kata tamu & mitra"
            title="Kepercayaan yang kami jaga setiap hari"
            align="center"
            className="mx-auto items-center text-center"
          />

          <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <motion.blockquote
                key={item.name}
                variants={staggerItem}
                className="flex h-full flex-col gap-6 rounded-3xl border border-white/70 bg-white/90 p-7 backdrop-blur-sm"
              >
                <span aria-hidden className="font-display text-5xl leading-none text-lagoon-200">
                  &ldquo;
                </span>
                <p className="text-sm leading-relaxed text-ink-700">{item.quote}</p>
                <footer className="mt-auto flex items-center gap-4 border-t border-ink-100 pt-5">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink-900">{item.name}</span>
                    <span className="block text-xs text-ink-500">{item.role}</span>
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </StaggerContainer>

          <div className="mt-14 grid gap-6 rounded-3xl border border-white/70 bg-white/85 p-8 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-lagoon-700">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** Branded fallback avatar used when a team member has no headshot yet. */
function MonogramAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden
      className="mb-5 flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon-100 via-white to-leaf-100"
    >
      <span className="font-display text-4xl font-bold tracking-tight text-lagoon-700">
        {initials}
      </span>
    </div>
  );
}
