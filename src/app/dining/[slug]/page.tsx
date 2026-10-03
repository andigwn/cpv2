import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiningVenueContent } from "@/components/sections/dining/DiningVenueContent";
import { diningHref, diningVenues, getDiningVenueBySlug } from "@/data/dining";
import { entityBackground } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

type DiningVenuePageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every restaurant page at build time. */
export function generateStaticParams() {
  return diningVenues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: DiningVenuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = getDiningVenueBySlug(slug);

  if (!venue) return { title: "Restoran tidak ditemukan" };

  return {
    title: venue.name,
    description: venue.description,
    alternates: { canonical: diningHref(venue) },
    openGraph: {
      title: venue.name + " — " + SITE.name,
      description: venue.description,
      images: [{ url: venue.image.src, alt: venue.image.alt }],
    },
  };
}

export default async function DiningVenuePage({ params }: DiningVenuePageProps) {
  const { slug } = await params;
  const venue = getDiningVenueBySlug(slug);

  if (!venue) notFound();

  return <DiningVenueContent venue={venue} heroBackground={entityBackground(venue.image)} />;
}
