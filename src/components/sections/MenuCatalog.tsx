import { Info } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { PRODUCTS, type MenuCategory } from "@/lib/constants";

interface MenuCatalogProps {
  categories: MenuCategory[];
  allergenNotice: string;
}

const CARD_SIZES =
  "(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

// Full catalog grouped by category; each section is an anchor target for
// MenuCategoryNav (scroll-mt clears the sticky header + category bar).
// Cards cascade into view row by row, staggered left-to-right.
export function MenuCatalog({ categories, allergenNotice }: MenuCatalogProps) {
  return (
    <div className="bg-cream-50 pb-8 pt-4">
      {categories.map((category) => {
        const products = PRODUCTS.filter((product) => product.category === category.id);
        if (products.length === 0) return null;

        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className="scroll-mt-40 py-12 lg:py-16"
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal className="flex flex-col gap-2 border-b border-blush-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <h2
                  id={`${category.id}-heading`}
                  className="font-display text-4xl font-semibold tracking-tight text-espresso-900"
                >
                  {category.label}
                </h2>
                <p className="text-muted sm:max-w-sm sm:text-right">{category.description}</p>
              </Reveal>

              <RevealGroup as="ul" className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                {products.map((product, index) => (
                  <RevealItem as="li" key={product.slug} index={index}>
                    <ProductCard product={product} sizes={CARD_SIZES} showCategory={false} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <p className="flex gap-3 rounded-2xl border border-blush-200 bg-blush-50 p-5 text-sm leading-relaxed text-espresso-700">
          <Info className="mt-0.5 size-5 shrink-0 text-rose-600" aria-hidden="true" />
          {allergenNotice}
        </p>
      </div>
    </div>
  );
}
