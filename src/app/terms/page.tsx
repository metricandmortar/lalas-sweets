import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";
import { TERMS_CONTENT, TERMS_SEO } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(TERMS_SEO);

export default function TermsPage() {
  const { hero, effectiveDate, sections } = TERMS_CONTENT;

  return (
    <>
      <PageHero {...hero} />
      <LegalContent effectiveDate={effectiveDate} sections={sections} />
    </>
  );
}
