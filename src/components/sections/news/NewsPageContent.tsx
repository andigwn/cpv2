"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { newsPosts } from "@/data/news";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { formatDate } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

/**
 * Newswire listing (prd.md sitemap: /news).
 *
 * Rhythm: PageHero -> featured band -> photo band -> archive band -> photo band -> CTA band.
 * The category filter and keyword search were removed so the archive stays a compact card grid.
 */
export function NewsPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const [lead, ...rest] = newsPosts;
  const listed = rest.slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="Newswire"
        title="Berita, promo, dan agenda Qubu Resort"
        description="Kabar terbaru dari properti kami."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Berita" }]}
      />

      {/* ---- Featured ---- */}
      <ContentBand width="narrow">
        <SectionTitle eyebrow={lead.category} title={lead.title} description={lead.excerpt} />
        <div className="mt-8">
          <Button
            href={`/news/${lead.slug}`}
            icon={<ArrowRight className="h-4 w-4" aria-hidden />}
          >
            Baca selengkapnya
          </Button>
        </div>
      </ContentBand>

      <ImageBand image={lead.image} />

      {/* ---- Archive ---- */}
      <ContentBand>
        <SectionTitle eyebrow="Arsip" title="Berita terbaru" />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listed.map((post) => (
            <motion.div key={post.slug} variants={staggerItem} className="h-full">
              <InfoCard
                href={`/news/${post.slug}`}
                eyebrow={post.category}
                title={post.title}
                body={post.excerpt}
                icon={
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                }
                footer={
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-500">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {formatDate(post.publishedAt)}
                  </span>
                }
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </ContentBand>

      <ImageBand image={listed[0].image} />

      {/* ---- Closing ---- */}
      <ContentBand width="narrow">
        <SectionTitle
          eyebrow="Rencanakan"
          title="Punya pertanyaan tentang kunjungan Anda?"
          description="Tim kami membantu pemesanan kamar, tiket, dan agenda acara."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact">Hubungi kami</Button>
          <Button href="/services" variant="outline">
            Lihat fasilitas
          </Button>
        </div>
      </ContentBand>
    </>
  );
}
