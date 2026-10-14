import type { MenuCategory } from "@/lib/constants";

interface MenuCategoryNavProps {
  label: string;
  categories: MenuCategory[];
}

// Sticky in-page "tabs" that jump to each category section. Sits flush under
// the sticky site header (2px accent + 80px bar = 82px).
export function MenuCategoryNav({ label, categories }: MenuCategoryNavProps) {
  return (
    <nav
      aria-label={label}
      className="sticky top-[82px] z-30 border-b border-blush-200 bg-cream-50/90 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:justify-center sm:px-8">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <a
              href={`#${category.id}`}
              className="inline-flex min-h-11 items-center rounded-pill border border-blush-200 bg-surface px-5 text-sm font-semibold text-espresso-700 transition-colors hover:border-rose-400 hover:bg-blush-100 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              {category.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
