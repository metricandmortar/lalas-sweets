import type { Metadata } from "next";
import { SEO_KEYWORDS, SITE, type PageSeo } from "@/lib/constants";

const TITLE_TEMPLATE = `%s | ${SITE.name}`;

// Site-wide defaults, set once in the root layout. metadataBase lets every
// relative canonical / OG URL below resolve against the production origin.
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Homemade Bakery in ${SITE.location}`,
    template: TITLE_TEMPLATE,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: SEO_KEYWORDS,
  category: "food",
  creator: SITE.name,
  publisher: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Per-route metadata. Next shallow-merges metadata, so openGraph/twitter are
// re-specified in full here (a child `openGraph` replaces the parent's).
// OG/Twitter images come from each segment's opengraph-image.tsx.
export function pageMetadata(seo: PageSeo): Metadata {
  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical: seo.path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.name,
      url: seo.path,
      title: seo.absoluteTitle ? seo.title : `${seo.title} | ${SITE.name}`,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.absoluteTitle ? seo.title : `${seo.title} | ${SITE.name}`,
      description: seo.description,
    },
  };
}
