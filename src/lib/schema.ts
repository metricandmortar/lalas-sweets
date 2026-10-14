import {
  CATERING_PAGE_CONTENT,
  PRODUCTS,
  SITE,
  type FaqItem,
} from "@/lib/constants";

// schema.org JSON-LD builders. Rules (agency standard):
// - Only mark up facts that are visible on the site.
// - No AggregateRating/Review for the business's own LocalBusiness entity.
// - No openingHoursSpecification: the bakery is by-inquiry/made-to-order and
//   has no published hours. Add it only once real hours are shown on-page.
// - City-level address only — home-based business, no street address.

type JsonLd = Record<string, unknown>;

const absolute = (path: string) => `${SITE.url}${path}`;

export const BAKERY_ID = absolute("/#bakery");
const WEBSITE_ID = absolute("/#website");

export function bakerySchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": BAKERY_ID,
    name: SITE.name,
    slogan: SITE.tagline,
    description: SITE.description,
    url: absolute("/"),
    telephone: SITE.phoneTel,
    email: SITE.email,
    image: absolute("/opengraph-image"),
    logo: absolute("/images/logo.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { "@type": "City", name: `${SITE.address.locality}, ${SITE.address.regionName}` },
      { "@type": "Place", name: `${SITE.address.island}, ${SITE.address.regionName}` },
    ],
    servesCuisine: ["Desserts", "Baked goods"],
    hasMenu: absolute("/menu"),
    acceptsReservations: false,
    sameAs: [SITE.instagram.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: SITE.phoneTel,
      email: SITE.email,
      areaServed: "US-HI",
      availableLanguage: "English",
    },
    makesOffer: CATERING_PAGE_CONTENT.packages.items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${item.name} catering`,
        description: item.description,
        areaServed: `${SITE.address.island}, ${SITE.address.regionName}`,
      },
    })),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: absolute("/"),
    inLanguage: "en-US",
    publisher: { "@id": BAKERY_ID },
  };
}

// The full catalog as an ItemList of Products, linked back to the bakery.
// Offers are omitted until prices are published on the menu.
export function menuSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} Menu`,
    url: absolute("/menu"),
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.shortDescription,
        image: absolute(product.image.src),
        category: product.category,
        brand: { "@type": "Brand", name: SITE.name },
        manufacturer: { "@id": BAKERY_ID },
      },
    })),
  };
}

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}
