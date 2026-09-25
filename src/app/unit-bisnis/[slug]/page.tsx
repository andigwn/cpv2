import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnitDetailContent } from "@/components/sections/units/UnitDetailContent";
import { businessUnits, getUnitBySlug } from "@/data/units";
import { entityBackground } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

type UnitPageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every building page at build time. */
export function generateStaticParams() {
  return businessUnits.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: UnitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);

  if (!unit) return { title: "Destinasi tidak ditemukan" };

  return {
    title: unit.name,
    description: unit.summary,
    alternates: { canonical: "/unit-bisnis/" + unit.slug },
    openGraph: {
      title: unit.name + " — " + SITE.name,
      description: unit.summary,
      images: [{ url: unit.image.src, alt: unit.image.alt }],
    },
  };
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);

  if (!unit) notFound();

  return <UnitDetailContent unit={unit} heroBackground={entityBackground(unit.image)} />;
}
