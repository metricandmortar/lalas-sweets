import { ChefHat, Heart, MapPin, PartyPopper, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TRUST_BADGES, type TrustBadgeIcon } from "@/lib/constants";

const ICONS: Record<TrustBadgeIcon, LucideIcon> = {
  "map-pin": MapPin,
  "chef-hat": ChefHat,
  party: PartyPopper,
  heart: Heart,
};

interface TrustBadgesProps {
  // strip = full-width band of glass cards; inline = compact pill row
  // (used under hero CTAs and beside forms).
  variant?: "strip" | "inline";
  // Limit for tight spaces; badges render in TRUST_BADGES order.
  limit?: number;
}

export function TrustBadges({ variant = "strip", limit }: TrustBadgesProps) {
  const badges = limit ? TRUST_BADGES.slice(0, limit) : TRUST_BADGES;

  if (variant === "inline") {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
        {badges.map((badge) => {
          const Icon = ICONS[badge.icon];
          return (
            <li
              key={badge.title}
              className="glass inline-flex min-h-9 items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-xs font-semibold text-espresso-700"
            >
              <Icon className="size-3.5 text-rose-600" aria-hidden="true" />
              {badge.title}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section aria-label="Why customers choose Lala's Sweets" className="bg-cream-50 px-5 py-10 sm:px-8">
      <RevealGroup as="ul" className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge, index) => {
          const Icon = ICONS[badge.icon];
          return (
            <RevealItem
              as="li"
              key={badge.title}
              index={index}
              columns={4}
              className="flex items-center gap-4 rounded-2xl border border-blush-200/80 bg-surface p-5 shadow-card"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush-100">
                <Icon className="size-5 text-rose-600" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold leading-tight text-espresso-900">
                  {badge.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted">{badge.subtitle}</span>
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
