"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Tag } from "lucide-react";
import type { ImageAsset, Service } from "@/types";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { services } from "@/data/services";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { PageHero } from "@/components/sections/PageHero";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

const MAX_FEATURES = 6;
const MAX_SPECS = 5;

/** Keeps the opening band to one readable breath. */
function firstSentence(text: string) {
  const end = text.indexOf(". ");
  return end > 0 ? text.slice(0, end + 1) : text;
}

/**
 * Detail page for a single service (prd.md sitemap: /services/[slug]).
 *
 * The gallery photos become full-bleed ImageBands so the page alternates
 * intro -> foto -> fitur -> foto -> spesifikasi -> foto -> layanan lain.
 */
export function ServiceDetailContent({
  service,
  heroBackground,
}: {
  service: Service;
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const gallery: ImageAsset[] = service.gallery.length ? service.gallery : [service.image];
  const intro = firstSentence(service.description[0] ?? service.summary);

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

      <ContentBand>
        <SectionTitle
          eyebrow={service.category}
          title={service.tagline}
          description={intro}
          className="max-w-2xl"
        />
      </ContentBand>

      <ImageBand image={gallery[0]} />

      <ContentBand>
        <SectionTitle eyebrow="Termasuk" title="Yang termasuk dalam layanan" className="max-w-2xl" />

        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.slice(0, MAX_FEATURES).map((feature) => (
            <motion.div key={feature} variants={staggerItem} className="h-full">
              <InfoCard
                icon={<Check className="text-leaf-600 h-5 w-5" aria-hidden />}
                eyebrow="Termasuk"
                title={feature}
                titleClassName="text-base"
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={gallery[1]} />

      <ContentBand>
        <SectionTitle eyebrow="Detail operasional" title="Informasi singkat" className="max-w-2xl" />

        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.specs.slice(0, MAX_SPECS).map((spec) => (
            <motion.div key={spec.label} variants={staggerItem} className="h-full">
              <InfoCard eyebrow={spec.label} title={spec.value} titleClassName="text-xl" />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={gallery[2]} />

      <ContentBand>
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
            <Card
              key={item.slug}
              variants={staggerItem}
              image={item.image}
              title={item.name}
              description={item.tagline}
              eyebrow={item.category}
              href={"/services/" + item.slug}
              accent="lagoon"
            />
          ))}
        </StaggerContainer>
      </ContentBand>
    </>
  );
}
