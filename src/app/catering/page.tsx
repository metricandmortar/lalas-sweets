import type { Metadata } from "next";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { CateringPackages } from "@/components/sections/CateringPackages";
import { PopUpEvents } from "@/components/sections/PopUpEvents";
import { CateringProcess } from "@/components/sections/CateringProcess";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CATERING_PAGE_CONTENT, CATERING_SEO, SITE } from "@/lib/constants";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(CATERING_SEO);

export default function CateringPage() {
  const { hero, packages, popUps, process, faq, ctaBand } = CATERING_PAGE_CONTENT;

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faq.items),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Catering", path: CATERING_SEO.path },
          ]),
        ]}
      />
      <PageHero
        {...hero}
        actions={
          <>
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={`tel:${SITE.phoneTel}`} variant="secondary">
              <Phone className="size-4" />
              <span className="lining-nums">{SITE.phone}</span>
            </ButtonLink>
          </>
        }
      />
      <TrustBadges />
      <CateringPackages content={packages} />
      <PopUpEvents content={popUps} />
      <CateringProcess content={process} />
      <FAQ eyebrow={faq.eyebrow} heading={faq.heading} items={faq.items} />
      <CtaBand {...ctaBand} />
    </>
  );
}
