import { ArrowRight, Heart } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { HERO_CONTENT } from "@/lib/constants";

export function Hero() {
  const { eyebrow, heading, headingAccent, paragraph, primaryCta, secondaryCta, image, badge } =
    HERO_CONTENT;

  return (
    <section className="bg-leopard-faint overflow-hidden bg-gradient-to-b from-blush-100 via-blush-50 to-cream-50">
      {/* Soft rose glow behind the photo for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 -z-10 size-[32rem] rounded-full bg-rose-300/25 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="text-center lg:col-span-6 lg:text-left">
          <Reveal y={16}>
            {/* Tighter tracking on phones keeps the location eyebrow on one
                line at 390px instead of orphaning a word. */}
            <p className="inline-flex items-center gap-2 rounded-pill border border-blush-200 bg-cream-50/80 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-rose-700 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
              <Heart className="size-3.5 shrink-0 fill-rose-500 text-rose-500" aria-hidden="true" />
              <span className="text-balance">{eyebrow}</span>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-espresso-900 sm:text-6xl xl:text-7xl">
              {heading}
              <span className="block italic text-rose-600">{headingAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
              {paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonLink href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="mt-8">
            <TrustBadges variant="inline" limit={3} />
          </Reveal>
        </div>

        <HeroVisual image={image} badge={badge} />
      </div>
    </section>
  );
}
