import {
  CATERING_PAGE_CONTENT,
  MENU_PAGE_CONTENT,
  PRODUCTS,
  SITE,
  SITEMAP_ROUTES,
} from "@/lib/constants";

// /llms.txt — a plain-Markdown brief for AI answer engines (llmstxt.org
// convention), generated from the same constants as the site so it can
// never drift from what's published on-page.
function buildLlmsTxt() {
  const menu = MENU_PAGE_CONTENT.categories
    .map((category) => {
      const items = PRODUCTS.filter((product) => product.category === category.id)
        .map((product) => `  - ${product.name}: ${product.shortDescription}`)
        .join("\n");
      return `- ${category.label}\n${items}`;
    })
    .join("\n");

  const catering = CATERING_PAGE_CONTENT.packages.items
    .map((item) => `- ${item.name}: ${item.description} Ideal for: ${item.idealFor}.`)
    .join("\n");

  const faq = CATERING_PAGE_CONTENT.faq.items
    .map((item) => `### ${item.question}\n${item.answer}`)
    .join("\n\n");

  const pages = SITEMAP_ROUTES.map(
    ({ seo }) => `- [${seo.title}](${SITE.url}${seo.path}): ${seo.description}`,
  ).join("\n");

  return `# ${SITE.name}

> ${SITE.description}

${SITE.name} is a homemade, made-to-order bakery in ${SITE.location}, ${SITE.address.regionName}. Mission: "${SITE.mission}" Tagline: "${SITE.tagline}."

## Contact
- Phone (call or text): ${SITE.phone}
- Email: ${SITE.email}
- Instagram: ${SITE.instagram.handle} (${SITE.instagram.url})
- Location: ${SITE.location}, ${SITE.address.regionName} (home-based; pickup details confirmed when ordering)
- Ordering: by inquiry — pricing and availability are provided per order.

## Menu
${menu}

## Catering (custom quotes on ${SITE.address.island})
${catering}
- Pop-ups: available for markets, fundraisers, church events, and community gatherings.

## FAQ
${faq}

## Pages
${pages}
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
