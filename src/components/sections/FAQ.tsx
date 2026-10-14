import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { FaqItem } from "@/lib/constants";

interface FAQProps {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}

// Native <details> accordion: keyboard- and screen-reader-accessible with
// zero JS, and every answer stays in the HTML for crawlers and answer
// engines. Content mirrors the page's FAQPage JSON-LD 1:1.
export function FAQ({ eyebrow, heading, items }: FAQProps) {
  return (
    <section aria-labelledby="faq-heading" className="bg-leopard-faint bg-blush-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
            {eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso-900 sm:text-5xl"
          >
            {heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-blush-200/80 bg-surface shadow-card transition-shadow open:shadow-glow"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-display text-xl font-semibold text-espresso-900 transition-colors hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:px-6 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="size-5 shrink-0 text-rose-600 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-muted lining-nums sm:px-6">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
