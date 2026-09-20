import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OutletDetailContent } from "@/components/sections/units/OutletDetailContent";
import { businessUnits, getOutlet, getUnitBySlug } from "@/data/units";
import { entityBackground } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

type OutletPageProps = {
  params: Promise<{ slug: string; outlet: string }>;
};

/** Pre-render every outlet page at build time. */
export function generateStaticParams() {
  return businessUnits.flatMap((unit) =>
    unit.outlets.map((outlet) => ({ slug: unit.slug, outlet: outlet.slug })),
  );
}

export async function generateMetadata({ params }: OutletPageProps): Promise<Metadata> {
  const { slug, outlet: outletSlug } = await params;
  const unit = getUnitBySlug(slug);
  const outlet = getOutlet(slug, outletSlug);

  if (!unit || !outlet) return { title: "Unit bisnis tidak ditemukan" };

  return {
    title: outlet.name + " — " + unit.name,
    description: outlet.summary,
    alternates: { canonical: "/unit-bisnis/" + unit.slug + "/" + outlet.slug },
    openGraph: {
      title: outlet.name + " — " + SITE.name,
      description: outlet.summary,
      images: [{ url: outlet.image.src, alt: outlet.image.alt }],
    },
  };
}

export default async function OutletPage({ params }: OutletPageProps) {
  const { slug, outlet: outletSlug } = await params;
  const unit = getUnitBySlug(slug);
  const outlet = getOutlet(slug, outletSlug);

  if (!unit || !outlet) notFound();

  return (
    <OutletDetailContent
      unit={unit}
      outlet={outlet}
      heroBackground={entityBackground(outlet.image)}
    />
  );
}
