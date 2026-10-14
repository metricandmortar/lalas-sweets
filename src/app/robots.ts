import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Open to all crawlers, including AI answer-engine bots (GPTBot,
// OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended), which the
// wildcard rule already allows — visibility in AI answers is a goal here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
