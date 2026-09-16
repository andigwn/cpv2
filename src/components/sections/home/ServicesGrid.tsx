"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { services } from "@/data/services";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

const homeServices = services.filter((service) => service.featured).slice(0, 6);

/** Facility / service grid on the Home page. */
export function ServicesGrid() {
  return (
    <section id="services" className="relative overflow-hidden py-20 lg:py-28">
      <SectionBackground {...sectionBackgrounds.homeServices} />

      <div className="shell relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Fasilitas & Layanan"
            title="Semua yang dibutuhkan untuk liburan lengkap"
            description="Dari kamar dengan balkon laut sampai ballroom 1.800 m² — setiap fasilitas dikelola tim internal kami dengan standar operasional yang sama."
            className="max-w-2xl"
          />
          <Button
            href="/services"
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" aria-hidden />}
            className="shrink-0"
          >
            Semua layanan
          </Button>
        </div>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service) => (
            <Card
              key={service.slug}
              variants={staggerItem}
              image={service.image}
              title={service.name}
              description={service.summary}
              eyebrow={service.category}
              href={`/services/${service.slug}`}
              meta={
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {service.specs[2]?.value ?? "08.00 – 21.00 WITA"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    Tanjung Benoa
                  </span>
                </>
              }
              footer={
                <div className="flex items-center justify-between border-t border-ink-100 pt-3">
                  <span className="text-xs text-ink-500">Mulai dari</span>
                  <span className="text-sm font-semibold text-lagoon-700">{service.priceFrom}</span>
                </div>
              }
            />
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 grid gap-4 rounded-3xl border border-white/70 bg-white/80 p-6 backdrop-blur-sm sm:grid-cols-3"
        >
          {[
            { label: "Tiket waterpark", value: "Rp 275.000 / orang" },
            { label: "Kamar mulai", value: "Rp 1.450.000 / malam" },
            { label: "Ballroom", value: "Rp 42.000.000 / hari" },
          ].map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="text-xs tracking-[0.18em] text-ink-500 uppercase">{item.label}</p>
              <p className="mt-1 font-display text-lg font-bold text-ink-900">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
