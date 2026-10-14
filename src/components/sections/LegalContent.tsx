import type { LegalSection } from "@/lib/constants";

interface LegalContentProps {
  effectiveDate: string;
  sections: LegalSection[];
}

// Long-form legal copy. Deliberately un-animated: readers skim and jump
// around legal pages, so content should be visible immediately.
export function LegalContent({ effectiveDate, sections }: LegalContentProps) {
  return (
    <section className="bg-cream-50 py-16 lg:py-20">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <p className="text-sm font-medium text-espresso-400">
          Effective Date: {effectiveDate}
        </p>
        <div className="mt-10 flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-2xl font-semibold text-espresso-900">
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
