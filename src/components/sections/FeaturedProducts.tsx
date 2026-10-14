import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { FEATURED_PRODUCTS_CONTENT, PRODUCTS } from "@/lib/constants";

const topSellers = PRODUCTS.filter((product) => product.isTopSeller);

export function FeaturedProducts() {
  const { eyebrow, heading, paragraph, viewAllCta } = FEATURED_PRODUCTS_CONTENT;

  return (
    <section aria-labelledby="featured-heading" className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-600">
            {eyebrow}
          </p>
          <h2
            id="featured-heading"
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso-900 sm:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{paragraph}</p>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {topSellers.map((product, index) => (
            <RevealItem as="li" key={product.slug} index={index}>
              <ProductCard
                product={product}
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 text-center">
          <Link
            href={viewAllCta.href}
            className="group inline-flex min-h-11 items-center gap-2 px-2 font-semibold text-rose-700 underline-offset-8 transition-colors hover:text-rose-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-600"
          >
            {viewAllCta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
