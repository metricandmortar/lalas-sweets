import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { StorySection } from "@/components/sections/StorySection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ABOUT_PAGE_CONTENT, ABOUT_SEO } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(ABOUT_SEO);

export default function AboutPage() {
  const { hero, ctaBand } = ABOUT_PAGE_CONTENT;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: ABOUT_SEO.path },
        ])}
      />
      <PageHero {...hero} />
      <StorySection />
      <TrustBadges />
      <CtaBand {...ctaBand} />
    </>
  );
}
