import Link from "next/link";
import { cacheLife } from "next/cache";
import { Heart, Mail, Phone } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { LEGAL_LINKS, NAV_LINKS, SITE } from "@/lib/constants";

// cacheComponents rejects a bare `new Date()` during prerender; reading the
// year inside a cached scope keeps the footer in the static shell.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

// Every footer link is at least 44×44px (min-h-11 + min-w-11) so short
// labels like "Home" stay comfortably tappable on mobile.
const FOOTER_LINK =
  "inline-flex min-h-11 min-w-11 items-center text-cream-200 transition-colors hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso-900 text-cream-100">
      <div
        aria-hidden="true"
        className="h-0.5 w-full bg-gradient-to-r from-espresso-700 via-rose-400 to-espresso-700"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandMark tone="dark" />
          <p className="mt-6 max-w-sm font-display text-xl italic leading-snug text-blush-100">
            &ldquo;{SITE.mission}&rdquo;
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-espresso-300">
            <Heart className="size-4 fill-rose-400 text-rose-400" aria-hidden="true" />
            Homemade &amp; local in {SITE.location}, {SITE.address.regionName}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
            Explore
          </h2>
          <ul className="mt-3 flex flex-col text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={FOOTER_LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
            Order &amp; Inquiries
          </h2>
          <ul className="mt-3 flex flex-col text-sm">
            <li>
              <a href={`tel:${SITE.phoneTel}`} className={`${FOOTER_LINK} gap-3`}>
                <Phone className="size-4 text-rose-400" aria-hidden="true" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={`${FOOTER_LINK} gap-3 break-all`}>
                <Mail className="size-4 shrink-0 text-rose-400" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${FOOTER_LINK} gap-3`}
              >
                <InstagramIcon className="size-4 text-rose-400" />
                {SITE.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 text-xs text-espresso-300 sm:flex-row sm:px-8">
          <p className="py-2 text-center sm:text-left">
            &copy; <CopyrightYear /> {SITE.name}. {SITE.tagline}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
