import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { services } from "@/data/services";
import { newsPosts } from "@/data/news";
import { businessUnits } from "@/data/units";

/** Basic sitemap covering every static route plus dynamic detail pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/unit-bisnis`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const unitRoutes: MetadataRoute.Sitemap = businessUnits.map((unit) => ({
    url: `${base}/unit-bisnis/${unit.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const outletRoutes: MetadataRoute.Sitemap = businessUnits.flatMap((unit) =>
    unit.outlets.map((outlet) => ({
      url: `${base}/unit-bisnis/${unit.slug}/${outlet.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${base}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...unitRoutes, ...outletRoutes, ...newsRoutes];
}
