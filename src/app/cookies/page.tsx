import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";
import { COOKIE_POLICY_CONTENT, COOKIES_SEO } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(COOKIES_SEO);

export default function CookiePolicyPage() {
  const { hero, effectiveDate, sections } = COOKIE_POLICY_CONTENT;

  return (
    <>
      <PageHero {...hero} />
      <LegalContent effectiveDate={effectiveDate} sections={sections} />
    </>
  );
}
