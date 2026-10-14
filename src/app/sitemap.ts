import type { MetadataRoute } from "next";
import { SITE, SITEMAP_ROUTES } from "@/lib/constants";

// lastModified is intentionally omitted: a build-time `new Date()` would
// claim every page changed on every deploy, which crawlers learn to ignore.
export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map(({ seo, priority }) => ({
    url: `${SITE.url}${seo.path === "/" ? "" : seo.path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
