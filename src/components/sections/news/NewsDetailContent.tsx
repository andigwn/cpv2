"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, User } from "lucide-react";
import type { NewsPost } from "@/types";
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
import { useLocalizedNewsPost, useNewsPosts } from "@/i18n/useContent";
import { useLocale, useT, useTList } from "@/i18n/useTranslation";

/**
 * Article detail page (prd.md sitemap: /news/[slug]).
 *
 * Rhythm: PageHero (cover photo) -> intro -> photo -> body -> photo -> body -> photo -> body
 * -> photo -> related news. The sidebar was collapsed into the leading meta card row and a
 * full-width "More news" band at the end.
 */
export function NewsDetailContent({ post }: { post: NewsPost }) {
  const t = useT();
  const locale = useLocale();
  const newsPosts = useNewsPosts();
  const localized = useLocalizedNewsPost(post);
  const bodySectionTitles = useTList("news.detailSections");
  const others = newsPosts.filter((item) => item.slug !== post.slug);
  const related = others.slice(0, 3);
  const body = localized.body;

  return (
    <article>
      <PageHero
        eyebrow={localized.category}
        title={localized.title}
        background={{
          src: localized.image.src,
          alt: localized.image.alt,
        }}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("news.heroEyebrow"), href: "/news" },
          { label: localized.category },
        ]}
      />

      {/* ---- Intro ---- */}
      <ContentBand width="narrow" spacing="tight">
        <FadeIn>
          <p className="font-display text-ink-800 text-xl leading-relaxed sm:text-2xl">
            {localized.excerpt}
          </p>
        </FadeIn>
        <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow={t("news.detailAuthor")}
              title={localized.author}
              icon={<User className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow={t("news.detailPublished")}
              title={formatDate(localized.publishedAt, locale)}
              icon={<CalendarDays className="h-5 w-5" aria-hidden />}
            />
          </motion.div>
          <motion.div variants={staggerItem} className="h-full">
            <InfoCard
              eyebrow={t("news.detailReadingTime")}
              title={t("news.detailMinutes", { count: localized.readingMinutes })}
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
          text={bodySectionTitles[0] ?? ""}
          className="text-2xl leading-tight sm:text-3xl"
        />
        <FadeIn className="mt-6">
          <p className="text-ink-700 text-base leading-[1.9]">{body[0]}</p>
        </FadeIn>
      </ContentBand>

      <ImageBand image={others[1].image} />

      <ContentBand width="narrow" spacing="tight">
        <AnimatedText
          as="h2"
          text={bodySectionTitles[1] ?? ""}
          className="text-2xl leading-tight sm:text-3xl"
        />
        <FadeIn className="mt-6">
          <p className="text-ink-700 text-base leading-[1.9]">{body[1]}</p>
        </FadeIn>
      </ContentBand>

      <ImageBand image={others[2].image} />

      <ContentBand width="narrow" spacing="tight">
        <AnimatedText
          as="h2"
          text={bodySectionTitles[2] ?? ""}
          className="text-2xl leading-tight sm:text-3xl"
        />
        <FadeIn className="mt-6">
          <p className="text-ink-700 text-base leading-[1.9]">{body[2]}</p>
        </FadeIn>
      </ContentBand>

      <ImageBand image={others[3].image} />

      {/* ---- Related ---- */}
      <ContentBand>
        <SectionTitle
          eyebrow={t("news.detailRelatedEyebrow")}
          title={t("news.detailRelatedTitle")}
        />
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
                  {formatDate(item.publishedAt, locale)}
                </span>
              }
            />
          ))}
        </StaggerContainer>
        <div className="mt-10">
          <Button href="/news" variant="outline">
            {t("common.allNews")}
          </Button>
        </div>
      </ContentBand>
    </article>
  );
}
