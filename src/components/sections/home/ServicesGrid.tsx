"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/ui/InfoCard";
import { ContentBand } from "@/components/sections/ContentBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

const homeServices = services.slice(0, 6);

/** Service offering as cards instead of a plain text list. */
export function ServicesGrid() {
  return (
    <ContentBand id="services" overlap>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Layanan"
          title="Yang bisa Anda pesan"
          className="max-w-xl"
          titleClassName="text-3xl sm:text-4xl"
        />
        <Button
          href="/services"
          variant="outline"
          className="shrink-0"
          icon={<ArrowRight className="h-4 w-4" aria-hidden />}
        >
          Semua layanan
        </Button>
      </div>

      <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeServices.map((service) => (
          <motion.div key={service.slug} variants={staggerItem} className="h-full">
            <InfoCard
              href={"/services/" + service.slug}
              eyebrow={service.category}
              title={service.name}
              body={service.tagline}
              footer={
                <span className="text-sm font-semibold text-lagoon-700">{service.priceFrom}</span>
              }
            />
          </motion.div>
        ))}
      </StaggerContainer>
    </ContentBand>
  );
}
