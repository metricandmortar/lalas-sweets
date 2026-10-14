import { ArrowRight, Tent } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SITE, type CateringPageContent } from "@/lib/constants";

interface PopUpEventsProps {
  content: CateringPageContent["popUps"];
}

// Pop-up booking pitch. Uses a leopard-matted icon panel instead of a photo
// until the client supplies /images/pop-up-event.jpg.
export function PopUpEvents({ content }: PopUpEventsProps) {
  const { eyebrow, heading, paragraphs, bookCta, instagramLabel } = content;

  return (
    <section
      aria-labelledby="popups-heading"
      // overflow-hidden clips the rotated leopard mat, which otherwise pokes
      // a few px past the viewport on mobile and causes sideways scrolling.
      className="bg-leopard-faint overflow-hidden bg-blush-50 py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal y={0} className="relative mx-auto w-full max-w-sm lg:col-span-5">
          <div
            aria-hidden="true"
            className="bg-leopard absolute -inset-4 -rotate-2 rounded-[2.5rem] border border-blush-200 bg-cream-100"
          />
          <div className="relative flex aspect-square flex-col items-center justify-center gap-5 rounded-[2rem] border-4 border-cream-50 bg-gradient-to-br from-blush-100 to-rose-300/60 p-10 text-center shadow-lift">
            <span className="flex size-20 items-center justify-center rounded-full bg-cream-50 shadow-soft">
              <Tent className="size-9 text-rose-600" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="font-display text-3xl font-semibold italic text-espresso-900">
              {SITE.name}
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-700">
              {eyebrow}
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
              {eyebrow}
            </p>
            <h2
              id="popups-heading"
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
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={bookCta.href}>
                {bookCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={SITE.instagram.url} variant="secondary" external>
                <InstagramIcon className="size-4" />
                {instagramLabel}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
