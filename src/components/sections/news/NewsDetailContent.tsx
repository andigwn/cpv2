"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, User } from "lucide-react";
import type { NewsPost } from "@/types";
import { newsPosts } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

/** The three prose chunks carry no per-paragraph title, so each band gets a short label. */
const bodySectionTitles = ["Kabar utama", "Rincian", "Informasi lanjutan"] as const;

/**
 * Article detail page (prd.md sitemap: /news/[slug]).
 *
 * Rhythm: PageHero (cover photo) -> intro -> photo -> body -> photo -> body -> photo -> body
 * -> photo -> related news. The sidebar was collapsed into the leading meta card row and a
 * full-width "Berita lain" band at the end.
 */
export function NewsDetailContent({ post }: { post: NewsPost }) {
  const others = newsPosts.filter((item) => item.slug !== post.slug);
  const related = others.slice(0, 3);

  return (
    <article>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        background={{
          type: "image-loop",
          src: post.image.src,
          alt: post.image.alt,
          loopVariant: "zoom",
        }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Berita", href: "/news" },
          { label: post.category },
        ]}
      />

      {/* ---- Intro ---- */}
      <ContentBand width="narrow" spacing="tight">
        <FadeIn>
          <p className="font-display text-xl leading-relaxed text-ink-800 sm:text-2xl">
            {post.excerpt}
          </p>
        </FadeIn>
        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow="Penulis"
              title={post.author}
              icon={<User className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow="Tanggal terbit"
              title={formatDate(post.publishedAt)}
              icon={<CalendarDays className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow="Waktu baca"
              title={`${post.readingMinutes} menit`}
              icon={<Clock className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
        </StaggerContainer>
      </ContentBand>

      {/* ---- Body: each paragraph keeps its own band, now with an animated heading ---- */}
      <ImageBand image={others[0].image} />

      <ContentBand width="narrow" spacing="tight">
        <AnimatedText
          as="h2"
          text={bodySectionTitles[0]}
          className="text-2xl leading-tight sm:text-3xl"
        />
        <FadeIn className="mt-6">
          <p className="text-base leading-[1.9] text-ink-700">{post.body[0]}</p>
        </FadeIn>
      </ContentBand>

      <ImageBand image={others[1].image} />

      <ContentBand width="narrow" spacing="tight">
        <AnimatedText
          as="h2"
          text={bodySectionTitles[1]}
          className="text-2xl leading-tight sm:text-3xl"
        />
        <FadeIn className="mt-6">
          <p className="text-base leading-[1.9] text-ink-700">{post.body[1]}</p>
        </FadeIn>
      </ContentBand>

      <ImageBand image={others[2].image} />

      <ContentBand width="narrow" spacing="tight">
        <AnimatedText
          as="h2"
          text={bodySectionTitles[2]}
          className="text-2xl leading-tight sm:text-3xl"
        />
        <FadeIn className="mt-6">
          <p className="text-base leading-[1.9] text-ink-700">{post.body[2]}</p>
        </FadeIn>
      </ContentBand>

      <ImageBand image={others[3].image} />

      {/* ---- Related ---- */}
      <ContentBand>
        <SectionTitle eyebrow="Lanjut membaca" title="Berita lain" />
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <Card
              key={item.slug}
              variants={staggerItem}
              href={`/news/${item.slug}`}
              image={item.image}
              eyebrow={item.category}
              title={item.title}
              ratio="aspect-[16/10]"
              meta={
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                  {formatDate(item.publishedAt)}
                </span>
              }
            />
          ))}
        </StaggerContainer>
        <div className="mt-10">
          <Button href="/news" variant="outline">
            Semua berita
          </Button>
        </div>
      </ContentBand>
    </article>
  );
}
