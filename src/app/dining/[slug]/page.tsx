import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiningVenueContent } from "@/components/sections/dining/DiningVenueContent";
import { diningHref, diningVenues, getDiningVenueBySlug } from "@/data/dining";
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

  // Social cards use the hero frame, not the card thumbnail: it is the shot the page opens on.
  const hero = venue.heroImage ?? venue.image;

  return {
    title: venue.name,
    description: venue.description,
    alternates: { canonical: diningHref(venue) },
    openGraph: {
      title: venue.name + " — " + SITE.name,
      description: venue.description,
      images: [{ url: hero.src, alt: hero.alt }],
    },
  };
}

export default async function DiningVenuePage({ params }: DiningVenuePageProps) {
  const { slug } = await params;
  const venue = getDiningVenueBySlug(slug);

  if (!venue) notFound();

  // The hero photograph is resolved inside `DiningVenueContent` from the *localized* venue,
  // so switching to English also swaps the hero's alt text, not just its copy.
  return <DiningVenueContent venue={venue} />;
}
