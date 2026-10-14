import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { PageHeroContent } from "@/lib/constants";

interface PageHeroProps extends PageHeroContent {
  // Optional CTA row rendered beneath the paragraph.
  actions?: ReactNode;
}

// Compact interior-page hero: blush gradient + faint leopard wash, centered
// copy, and the page's single h1.
export function PageHero({ eyebrow, heading, headingAccent, paragraph, actions }: PageHeroProps) {
  return (
    <section className="bg-leopard-faint overflow-hidden bg-gradient-to-b from-blush-100 via-blush-50 to-cream-50">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-14 text-center sm:px-8 md:pb-20 md:pt-20">
        <Reveal y={16}>
          <p className="inline-flex items-center gap-2 rounded-pill border border-blush-200 bg-cream-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
            <Heart className="size-3.5 fill-rose-500 text-rose-500" />
            {eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-espresso-900 sm:text-5xl lg:text-6xl">
            {heading}
            {headingAccent && (
              <span className="block italic text-rose-600">{headingAccent}</span>
            )}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {paragraph}
          </p>
        </Reveal>

        {actions && (
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {actions}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
