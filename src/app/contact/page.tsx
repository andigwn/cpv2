import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/contact/ContactPageContent";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { SITE } from "@/lib/constants";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Kontak & Reservasi",
  description: `Hubungi ${SITE.name}: reservasi kamar, tiket waterpark, MICE, dan kemitraan. ${SITE.contact.phone} · ${SITE.contact.email}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Pantai Q No. 88, Tanjung Benoa",
      addressLocality: "Badung",
      addressRegion: "Bali",
      postalCode: "80361",
      addressCountry: "ID",
    },
    image: `${SITE.url}/images/qubu-resort-1.jpeg`,
    priceRange: "Rp 275.000 - Rp 42.000.000",
  };

  return (
    <>
      <ContactPageContent heroBackground={sectionBackgrounds.contactIntro} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </>
  );
}
