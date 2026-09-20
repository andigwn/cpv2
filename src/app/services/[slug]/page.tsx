import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/sections/services/ServiceDetailContent";
import { getServiceBySlug, services } from "@/data/services";
import { entityBackground } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every service detail route at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Layanan tidak ditemukan" };

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${SITE.name}`,
      description: service.summary,
      images: [{ url: service.image.src, alt: service.image.alt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <ServiceDetailContent service={service} heroBackground={entityBackground(service.image)} />
  );
}
