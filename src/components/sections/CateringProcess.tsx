import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { CateringPageContent } from "@/lib/constants";

interface CateringProcessProps {
  content: CateringPageContent["process"];
}

export function CateringProcess({ content }: CateringProcessProps) {
  const { eyebrow, heading, steps } = content;

  return (
    <section aria-labelledby="process-heading" className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
            {eyebrow}
          </p>
          <h2
            id="process-heading"
            className="mt-3 font-display text-4xl font-semibold lining-nums tracking-tight text-espresso-900 sm:text-5xl"
          >
            {heading}
          </h2>
        </Reveal>

        <RevealGroup as="ol" className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <RevealItem as="li" key={step.title} index={index} className="relative text-center">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-blush-200 bg-blush-100 font-display text-3xl font-semibold lining-nums text-rose-600 shadow-card">
                {index + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-espresso-900">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
