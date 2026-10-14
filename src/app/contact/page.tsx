import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactFormWithParams } from "@/components/sections/ContactFormWithParams";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_PAGE_CONTENT, CONTACT_SEO } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(CONTACT_SEO);

export default function ContactPage() {
  const { hero, channelsHeading, channels, form } = CONTACT_PAGE_CONTENT;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: CONTACT_SEO.path },
        ])}
      />
      <PageHero {...hero} />

      <section className="bg-cream-50 py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
          {/* min-w-0 lets grid columns shrink below their content's
              min-width — long product names in the form's chip/select would
              otherwise widen the track past the mobile viewport. */}
          <Reveal className="min-w-0 lg:col-span-4">
            <ContactChannels heading={channelsHeading} channels={channels} />
            <div className="mt-8">
              <TrustBadges variant="inline" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
            <div className="rounded-[2rem] border border-blush-200/80 bg-surface p-5 shadow-card sm:p-10">
              <h2 className="font-display text-3xl font-semibold text-espresso-900">
                {form.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-muted">{form.description}</p>
              <div className="mt-8">
                {/* Static shell renders the plain form; deep-link prefill
                    (?inquiry= / ?product= / ?package=) streams in at request time. */}
                <Suspense fallback={<ContactForm content={form} />}>
                  <ContactFormWithParams content={form} />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
