"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { businessUnits, unitHref } from "@/data/units";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/ui/InfoCard";
import { ContentBand } from "@/components/sections/ContentBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

/** The six buildings, as cards with their opening line. */
export function HomeUnits() {
  return (
    <ContentBand id="unit-bisnis" overlap>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Unit Bisnis"
          title="Yang ada di kawasan ini"
          className="max-w-xl"
          titleClassName="text-3xl sm:text-4xl"
        />
        <Button
          href="/unit-bisnis"
          variant="outline"
          className="shrink-0"
          icon={<ArrowRight className="h-4 w-4" aria-hidden />}
        >
          Semua unit
        </Button>
      </div>

      <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businessUnits.map((unit) => (
          <motion.div key={unit.slug} variants={staggerItem} className="h-full">
            <InfoCard
              href={unitHref(unit)}
              eyebrow={unit.type}
              title={unit.name}
              body={unit.tagline}
              icon={
                <Image
                  src={unit.image.src}
                  alt={unit.image.alt}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              }
              footer={
                <span className="text-xs text-ink-500">
                  {unit.outlets.length
                    ? unit.outlets.length + " unit bisnis di dalam"
                    : "Unit tunggal"}
                </span>
              }
            />
          </motion.div>
        ))}
      </StaggerContainer>
    </ContentBand>
  );
}
