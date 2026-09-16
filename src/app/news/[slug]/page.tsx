import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailContent } from "@/components/sections/news/NewsDetailContent";
import { getNewsBySlug, newsPosts } from "@/data/news";
import { SITE } from "@/lib/constants";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);

  if (!post) return { title: "Artikel tidak ditemukan" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
    keywords: post.tags,
    authors: [{ name: post.author }],
    publisher: SITE.legalName,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);

  if (!post) notFound();

  return <NewsDetailContent post={post} />;
}
