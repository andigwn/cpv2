"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MapPin, Send } from "lucide-react";
import { careerBenefits, hiringSteps, jobOpenings } from "@/data/careers";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";
import { staggerItem, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

/** Careers page (prd.md sitemap: /careers). */
export function CareersPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  return (
    <>
      <PageHero
        eyebrow="Karir"
        title="Tumbuh bersama tim hospitality yang hangat"
        description="Lebih dari 1.700 orang bekerja di lima destinasi kami. Kami mencari rekan yang percaya bahwa keramahan adalah keterampilan yang bisa dipelajari dan dirayakan."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Karir" }]}
      >
        <Button
          href={`mailto:${SITE.contact.careerEmail}`}
          icon={<Send className="h-4 w-4" aria-hidden />}
          iconPosition="left"
        >
          Kirim lamaran
        </Button>
      </PageHero>

      {/* ---------------- Benefits ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.careersIntro} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Yang kami sediakan"
            title="Tunjangan yang membuat tim betah"
            description="Kami meninjau paket tunjangan setiap tahun bersama perwakilan karyawan dari tiap properti."
          />

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careerBenefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={staggerItem}
                className="rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_-45px_rgba(19,25,34,0.5)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon-100 to-sunshine-100 text-lagoon-700">
                  <Icon name={benefit.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{benefit.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------------- Openings ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.aboutTimeline} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Lowongan terbuka"
            title="Enam posisi sedang kami cari"
            description="Semua posisi berbasis di Bali kecuali disebutkan lain. Kirim CV dan portfolio ke career@quburesort.id dengan subjek nama posisi."
            className="max-w-3xl"
          />

          <div className="mt-12 flex flex-col gap-5">
            {jobOpenings.map((job, index) => (
              <motion.article
                key={job.slug}
                id={job.slug}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="group overflow-hidden rounded-3xl border border-white/70 bg-white/88 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_70px_-48px_rgba(19,25,34,0.5)]"
              >
                <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_1.4fr] lg:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-lagoon-50 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-lagoon-700 uppercase">
                        <Briefcase className="h-3 w-3" aria-hidden />
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs text-ink-500">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {job.location}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl">{job.title}</h3>
                    <p className="mt-1 text-xs tracking-[0.14em] text-ink-500 uppercase">
                      {job.level} · {job.type}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-600">{job.description}</p>

                    <Button
                      href={`mailto:${SITE.contact.careerEmail}?subject=${encodeURIComponent(job.title)}`}
                      className="mt-6"
                      size="sm"
                      variant="outline"
                      icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                    >
                      Lamar posisi ini
                    </Button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-ink-900 uppercase">
                        Tanggung jawab
                      </h4>
                      <ul className="mt-3 flex list-disc flex-col gap-2 pl-4 text-xs leading-relaxed text-ink-600">
                        {job.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold tracking-[0.16em] text-ink-900 uppercase">
                        Kualifikasi
                      </h4>
                      <ul className="mt-3 flex list-disc flex-col gap-2 pl-4 text-xs leading-relaxed text-ink-600">
                        {job.requirements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.aboutValues} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Proses rekrutmen"
            title="Empat langkah, rata-rata selesai dalam dua pekan"
            align="center"
            className="mx-auto items-center text-center"
          />

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className="relative rounded-3xl border border-white/70 bg-white/88 p-6 backdrop-blur-sm"
              >
                <span className="font-display text-3xl font-bold text-lagoon-200">{step.step}</span>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2} className="mt-12 rounded-3xl border border-white/70 bg-gradient-to-r from-lagoon-50 via-white to-sunshine-50 p-8 text-center backdrop-blur-sm">
            <h3 className="text-xl">Tidak menemukan posisi yang cocok?</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-600">
              Kirim CV Anda sebagai lamaran umum. Kami menyimpan berkas selama 12 bulan dan
              menghubungi Anda saat posisi yang relevan dibuka.
            </p>
            <Button
              href={`mailto:${SITE.contact.careerEmail}?subject=Lamaran Umum`}
              className="mt-6"
              icon={<Send className="h-4 w-4" aria-hidden />}
              iconPosition="left"
            >
              Kirim lamaran umum
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
