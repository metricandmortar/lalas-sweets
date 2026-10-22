import Image from "next/image";
import { ArrowRight, Heart, Package, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PhotoComingSoon } from "@/components/ui/PhotoComingSoon";
import {
  PRODUCT_CARD_LABELS,
  PRODUCT_CATEGORIES,
  productInquiryHref,
  type Product,
} from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  // Responsive `sizes` hint matching the grid the card is rendered in.
  sizes: string;
  // Hide the category tag when the card already sits under a category heading.
  showCategory?: boolean;
}

export function ProductCard({ product, sizes, showCategory = true }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-blush-200/80 bg-surface shadow-card transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-glow">
      {/* Inset photo with a cream mat, like a print tucked into a frame. */}
      <div className="p-2.5 pb-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-blush-100">
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <PhotoComingSoon />
          )}
          {/* Soft bottom fade so the local-flavor badge reads on any photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso-900/25 to-transparent"
          />

          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            {showCategory ? (
              <span className="glass rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wider text-espresso-700">
                {PRODUCT_CATEGORIES[product.category]}
              </span>
            ) : (
              <span />
            )}
            {product.isTopSeller && (
              <span className="inline-flex items-center gap-1 rounded-pill bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow-soft">
                <Star className="size-3 fill-white" aria-hidden="true" />
                {PRODUCT_CARD_LABELS.topSeller}
              </span>
            )}
          </div>

          {product.badge && (
            <span className="glass absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold text-rose-700">
              <Heart className="size-3 fill-rose-500 text-rose-500" aria-hidden="true" />
              {product.badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold text-espresso-900">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        {/* Packaging / minimum-order rule, styled like a bakery tag. */}
        {product.orderNote && (
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-rose-300 bg-blush-50 px-3.5 py-2.5 text-xs font-semibold leading-snug text-rose-800">
            <Package className="mt-px size-3.5 shrink-0 text-rose-600" aria-hidden="true" />
            {product.orderNote}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-blush-200 pt-5">
          <span
            className={
              product.price
                ? "font-display text-xl font-semibold lining-nums text-espresso-900"
                : "text-sm italic text-espresso-400"
            }
          >
            {product.price ?? PRODUCT_CARD_LABELS.pricingFallback}
          </span>
          {/* Deep link pre-selects this product in the contact form. */}
          <ButtonLink
            href={productInquiryHref(product.slug)}
            ariaLabel={`${PRODUCT_CARD_LABELS.inquire} about ${product.name}`}
            size="sm"
            width="auto"
          >
            {PRODUCT_CARD_LABELS.inquire}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
