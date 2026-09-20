"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { companyStats } from "@/data/meta";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/ui/InfoCard";
import { ContentBand } from "@/components/sections/ContentBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

/** About band on the Home page: one line of copy plus the key numbers as cards. */
export function AboutPreview() {
  return (
    <ContentBand id="about">
      <SectionTitle
        eyebrow="Tentang Qubu Resort"
        title="Enam unit bisnis, satu kawasan"
        description="Hotel, convention centre, waterpark, dan rekreasi keluarga dalam satu lokasi di Tanjung Benoa."
        className="max-w-2xl"
      />

      <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {companyStats.map((stat) => (
          <motion.div key={stat.label} variants={staggerItem}>
            <InfoCard
              title={stat.value}
              body={stat.label}
              titleClassName="text-3xl text-lagoon-700 sm:text-4xl"
            />
          </motion.div>
        ))}
      </StaggerContainer>

      <FadeIn delay={0.15} className="mt-14">
        <Button href="/about" variant="outline" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
          Cerita lengkap
        </Button>
      </FadeIn>
    </ContentBand>
  );
}
