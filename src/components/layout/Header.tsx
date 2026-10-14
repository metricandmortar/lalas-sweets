import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { HEADER_CTA, NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70">
      {/* Frosted background lives on its own layer: backdrop-filter on the
          <header> itself would become the containing block for the mobile
          drawer's position: fixed, clipping it to the header's height. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-blush-50/80 backdrop-blur-md supports-[backdrop-filter]:bg-blush-50/65"
      />

      {/* Hairline rose accent along the very top edge */}
      <div
        aria-hidden="true"
        className="h-0.5 w-full bg-gradient-to-r from-blush-200 via-rose-400 to-blush-200"
      />
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative inline-flex min-h-11 items-center rounded-pill px-3 text-sm font-medium text-espresso-700 transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-rose-500 after:transition-transform hover:text-rose-600 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 lg:px-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Visibility lives on a wrapper so it never competes with the
              button's own inline-flex display. */}
          <div className="hidden sm:block">
            <ButtonLink href={HEADER_CTA.href} size="sm" width="auto" className="px-6">
              {HEADER_CTA.label}
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
