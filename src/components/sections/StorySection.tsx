import Image from "next/image";
import {
  ArrowRight,
  HandHeart,
  House,
  MapPin,
  ShoppingBag,
  Tent,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SALES_CHANNELS, STORY_CONTENT } from "@/lib/constants";

// Icons are presentation concerns, so they're mapped here by slug rather
// than stored in constants.ts.
const PILLAR_ICONS: LucideIcon[] = [House, MapPin, HandHeart];

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  catering: UtensilsCrossed,
  "direct-to-consumer": ShoppingBag,
  "events-pop-ups": Tent,
};

export function StorySection() {
  const {
    eyebrow,
    heading,
    paragraphs,
    pillars,
    image,
    channelsEyebrow,
    channelsHeading,
    cta,
  } = STORY_CONTENT;

  return (
    <section
      aria-labelledby="story-heading"
      // overflow-hidden clips the rotated leopard mat, which otherwise pokes
      // a few px past the viewport on mobile and causes sideways scrolling.
      className="bg-leopard-faint overflow-hidden bg-blush-50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal y={0} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div
              aria-hidden="true"
              className="bg-leopard absolute -inset-4 rotate-2 rounded-[2.5rem] border border-blush-200 bg-cream-100"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-cream-50 shadow-lift">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
                {eyebrow}
              </p>
              <h2
                id="story-heading"
                className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-espresso-900 sm:text-5xl"
              >
                {heading}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
              {pillars.map((pillar, index) => {
                const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
                return (
                  <RevealItem
                    as="li"
                    key={pillar.title}
                    index={index}
                    className="glass rounded-2xl p-5"
                  >
                    <Icon className="size-6 text-rose-600" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl font-semibold text-espresso-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {pillar.description}
                    </p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-24 rounded-[2rem] border border-blush-200/80 bg-cream-50 px-5 py-12 shadow-card sm:px-12 sm:py-14">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
              {channelsEyebrow}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-espresso-900 sm:text-4xl">
              {channelsHeading}
            </h3>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {SALES_CHANNELS.map((channel, index) => {
              const Icon = CHANNEL_ICONS[channel.slug] ?? HandHeart;
              return (
                <RevealItem as="li" key={channel.slug} index={index} className="text-center">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-blush-200 bg-blush-100">
                    <Icon className="size-7 text-rose-600" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h4 className="mt-5 font-display text-2xl font-semibold text-espresso-900">
                    {channel.name}
                  </h4>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                    {channel.shortDescription}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal className="mt-12 text-center">
            <ButtonLink href={cta.href}>
              {cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
