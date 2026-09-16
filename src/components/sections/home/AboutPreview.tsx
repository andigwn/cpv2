"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Compass, Sun } from "lucide-react";
import { aboutStats } from "@/data/about";
import { brandPromises } from "@/data/meta";
import { companyStats } from "@/data/meta";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { SectionBackground } from "@/components/animations/SectionBackground";

/** About preview block on the Home page: story teaser, parallax photo and key numbers. */
export function AboutPreview() {
  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28">
      <SectionBackground {...sectionBackgrounds.homeAbout} />

      <div className="shell relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <ParallaxImage
            image={{
              src: "/images/about-resort-aerial.jpg",
              alt: "Pemandangan udara kawasan Q dengan kolam dan taman tropis",
            }}
            className="aspect-4/5 w-full"
            sizes="(max-width: 1024px) 100vw, 45vw"
            distance={40}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="absolute -right-4 bottom-6 w-56 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_30px_70px_-45px_rgba(19,25,34,0.6)] backdrop-blur-md sm:-right-8"
          >
            <div className="flex items-center gap-3">
              <span className="bg-sunshine-100 text-sunshine-700 flex h-11 w-11 items-center justify-center rounded-2xl">
                <Sun className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-ink-900 text-2xl leading-none font-bold">11,4 ha</p>
                <p className="text-ink-500 text-xs">Kawasan terpadu</p>
              </div>
            </div>
            <p className="text-ink-600 mt-4 text-xs leading-relaxed">
              Hotel, waterpark, beach club, spa, dan convention centre dalam satu lokasi.
            </p>
          </motion.div>
        </div>

        <div>
          <SectionTitle
            eyebrow="Tentang Qubu Resort"
            title="Hospitality keluarga yang tumbuh dari satu hotel 64 kamar"
            description="Sejak 2009 kami membangun kawasan liburan terpadu di Tanjung Benoa: tempat anak-anak bermain air seharian sementara orang tua menikmati spa, sunset deck, dan kuliner nusantara."
          />

          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-3">
            {brandPromises.map((promise) => (
              <motion.div
                key={promise.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/70 bg-white/80 p-5 backdrop-blur-sm"
              >
                <span className="bg-lagoon-50 text-lagoon-700 flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon name={promise.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base">{promise.title}</h3>
                <p className="text-ink-600 mt-2 text-xs leading-relaxed">{promise.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn
            delay={0.2}
            className="border-ink-200/70 mt-10 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4"
          >
            {companyStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-lagoon-700 text-3xl font-bold">{stat.value}</p>
                <p className="text-ink-500 mt-1 text-xs leading-snug">{stat.label}</p>
              </div>
            ))}
          </FadeIn>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/about" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
              Cerita lengkap kami
            </Button>
            <Button
              href="/works"
              variant="outline"
              icon={<Compass className="h-4 w-4" aria-hidden />}
            >
              Lihat portfolio
            </Button>
          </div>

          <FadeIn delay={0.3} className="bg-leaf-50 mt-8 flex items-start gap-3 rounded-2xl p-4">
            <BadgeCheck className="text-leaf-600 mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p className="text-leaf-900 text-xs leading-relaxed">
              {aboutStats[3].value} karyawan kami berasal dari kabupaten tempat properti beroperasi
              — bagian dari komitmen pertumbuhan bersama komunitas lokal.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
