import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { legalDocs } from "@/lib/legal";
import { servicePages } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    "/services/credit-optimization",
    ...servicePages.map((p) => `/services/${p.slug}`),
    "/inner-circle",
    "/score-check",
    "/results",
    "/education",
    ...articles.map((a) => `/education/${a.slug}`),
    "/founder",
    "/affiliate",
    "/careers",
    "/contact",
    ...legalDocs.map((d) => `/legal/${d.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path.startsWith("/legal") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/legal") ? 0.2 : 0.7,
  }));
}
