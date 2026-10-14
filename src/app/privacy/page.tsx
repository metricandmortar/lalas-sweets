import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";
import { PRIVACY_POLICY_CONTENT, PRIVACY_SEO } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PRIVACY_SEO);

export default function PrivacyPolicyPage() {
  const { hero, effectiveDate, sections } = PRIVACY_POLICY_CONTENT;

  return (
    <>
      <PageHero {...hero} />
      <LegalContent effectiveDate={effectiveDate} sections={sections} />
    </>
  );
}
