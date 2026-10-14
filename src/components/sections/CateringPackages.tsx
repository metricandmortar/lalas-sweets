import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cateringInquiryHref, type CateringPageContent } from "@/lib/constants";

interface CateringPackagesProps {
  content: CateringPageContent["packages"];
}

export function CateringPackages({ content }: CateringPackagesProps) {
  const { eyebrow, heading, paragraph, idealForLabel, quoteLabel, ctaLabel, items } = content;

  return (
    <section aria-labelledby="packages-heading" className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
            {eyebrow}
          </p>
          <h2
            id="packages-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso-900 sm:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{paragraph}</p>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <RevealItem
              as="li"
              key={item.slug}
              index={index}
              className="flex flex-col overflow-hidden rounded-card border border-blush-200/80 bg-surface shadow-card transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-glow"
            >
              <div className="relative aspect-[3/2] bg-blush-100">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <span className="glass absolute right-4 top-4 rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-700">
                  {quoteLabel}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <h3 className="font-display text-3xl font-semibold text-espresso-900">
                  {item.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                <p className="mt-4 text-sm text-espresso-700">
                  <span className="font-semibold text-rose-700">{idealForLabel}: </span>
                  {item.idealFor}
                </p>

                <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-blush-200 pt-5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-espresso-700">
                      <Check className="mt-0.5 size-4 shrink-0 text-rose-600" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Deep link pre-selects "Catering" and pre-fills the message
                    with this package's name. */}
                <ButtonLink
                  href={cateringInquiryHref(item.slug)}
                  ariaLabel={`${ctaLabel} for ${item.name}`}
                  width="full"
                  className="mt-7"
                >
                  {ctaLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
