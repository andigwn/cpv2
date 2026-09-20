"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye, Target } from "lucide-react";
import { aboutStory, companyValues } from "@/data/about";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import type { ImageAsset, SectionBackgroundConfig } from "@/types";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

type AboutPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/** ImageBand wants a plain { src, alt } pair; the background union also carries a video shape. */
const bandImage = (background: SectionBackgroundConfig, alt: string): ImageAsset =>
  background.type === "video"
    ? { src: background.poster, alt }
    : { src: background.src, alt: background.alt };

/** Two statements trimmed from the long-form story so each band stays a single breath. */
const visionMission = [
  {
    label: "Visi",
    text: "Menjadi grup hospitality keluarga paling dipercaya di Asia Tenggara pada 2030.",
    icon: Eye,
  },
  {
    label: "Misi",
    text: "Menghadirkan liburan yang cerah, aman, dan berkesan bagi setiap tamu.",
    icon: Target,
  },
];

/**
 * About page on the shared broken-white canvas.
 *
 * Rhythm: cerita -> visi & misi -> nilai, each pair of content bands separated by a
 * full-bleed ImageBand and closed by one short invitation band. No dividers anywhere.
 */
export function AboutPageContent({ heroBackground }: AboutPageContentProps) {
  return (
    <>
      <PageHero
        eyebrow={aboutStory.eyebrow}
        title={aboutStory.title}
        description={aboutStory.lead}
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tentang" }]}
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Cerita kami"
          title="Dari 38 karyawan menjadi 1.700 lebih"
          description="Kami memulai pada 2009 dari satu hotel 64 kamar di Tanjung Benoa, lalu tumbuh perlahan ke lima destinasi."
          className="max-w-2xl"
        />

        <FadeIn delay={0.12} className="mt-8">
          <Button
            href="/services"
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            Lihat layanan kami
          </Button>
        </FadeIn>
      </ContentBand>

      <ImageBand
        image={bandImage(
          sectionBackgrounds.aboutStory,
          "Kawasan resort Qubu dengan kolam dan pepohonan tropis",
        )}
        caption="Satu kawasan, satu standar layanan."
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Arah kami"
          title="Visi & misi yang menuntun keputusan harian"
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
          {visionMission.map(({ label, text, icon: IconComponent }) => (
            <motion.div key={label} variants={staggerItem} className="h-full">
              <InfoCard
                title={label}
                body={text}
                titleClassName="text-xl"
                icon={<IconComponent className="h-5 w-5" aria-hidden />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand
        image={bandImage(
          sectionBackgrounds.aboutTimeline,
          "Masterplan kawasan resort dilihat dari udara",
        )}
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Nilai yang kami pegang"
          title="Empat prinsip yang menentukan keputusan harian kami"
          className="max-w-2xl"
        />

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((value) => (
            <motion.div key={value.title} variants={staggerItem} className="h-full">
              <InfoCard
                eyebrow="Nilai inti"
                title={value.title}
                body={value.description}
                icon={<Icon name={value.icon} className="h-5 w-5" />}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      {/* <ImageBand
        image={bandImage(
          sectionBackgrounds.aboutTeam,
          "Tim hospitality Qubu Resort di area publik",
        )}
      />

      <ContentBand>
        <SectionTitle
          eyebrow="Bekerja bersama kami"
          title="Tumbuh bersama tim dan destinasi lokal"
          description="78% karyawan kami berasal dari kabupaten tempat properti beroperasi."
          className="max-w-2xl"
        />

        <FadeIn delay={0.12} className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Hubungi tim kami
          </Button>
          <Button href="/works" variant="outline">
            Lihat portfolio
          </Button>
        </FadeIn>
      </ContentBand> */}
    </>
  );
}
