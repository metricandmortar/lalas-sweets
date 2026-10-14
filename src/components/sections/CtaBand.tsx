import { ArrowRight, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SITE, type CtaBandContent } from "@/lib/constants";

// Closing conversion band: rose panel with leopard accents and dual CTAs.
export function CtaBand({ heading, paragraph, primaryCta, showPhone }: CtaBandContent) {
  return (
    <section className="bg-cream-50 px-5 py-20 sm:px-8 lg:py-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-blush-200 bg-blush-100 px-6 py-14 text-center shadow-soft sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="bg-leopard pointer-events-none absolute inset-0 opacity-40"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-espresso-900 sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {paragraph}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            {showPhone && (
              <ButtonLink href={`tel:${SITE.phoneTel}`} variant="secondary">
                <Phone className="size-4" />
                {SITE.phone}
              </ButtonLink>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
