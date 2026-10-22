import { Cookie } from "lucide-react";
import { PRODUCT_CARD_LABELS } from "@/lib/constants";

interface PhotoComingSoonProps {
  // "compact" is for small thumbnails, where only the icon fits.
  size?: "full" | "compact";
}

// Stand-in for products the client hasn't photographed yet. Fills its
// (relatively positioned) parent the same way a `fill` Image would.
export function PhotoComingSoon({ size = "full" }: PhotoComingSoonProps) {
  if (size === "compact") {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-blush-100">
        <Cookie className="size-6 text-rose-400" strokeWidth={1.5} aria-hidden="true" />
      </span>
    );
  }

  return (
    <div className="bg-leopard-faint absolute inset-0 flex flex-col items-center justify-center gap-3 bg-blush-100 text-center">
      <span className="font-display text-4xl font-semibold italic tracking-tight text-rose-500">
        Lala&rsquo;s
      </span>
      <span className="pl-[0.4em] text-xs font-semibold uppercase tracking-[0.4em] text-espresso-400">
        {PRODUCT_CARD_LABELS.photoComingSoon}
      </span>
    </div>
  );
}
