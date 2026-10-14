import Link from "next/link";

interface BrandMarkProps {
  // "light" sits on blush/cream backgrounds; "dark" sits on espresso.
  tone?: "light" | "dark";
  onClick?: () => void;
}

// Text wordmark echoing the logo: script-style "Lala's" in rose over a
// widely tracked "sweets" in taupe.
export function BrandMark({ tone = "light", onClick }: BrandMarkProps) {
  const sweetsColor =
    tone === "light" ? "text-espresso-400" : "text-espresso-300";
  const lalasColor = tone === "light" ? "text-rose-600" : "text-rose-300";

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Lala's Sweets — home"
      className="group inline-flex min-h-11 flex-col items-center justify-center rounded-lg leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-600"
    >
      <span
        className={`font-display text-3xl font-semibold italic tracking-tight transition-colors group-hover:text-rose-500 ${lalasColor}`}
      >
        Lala&rsquo;s
      </span>
      <span
        className={`mt-0.5 pl-[0.5em] text-[0.65rem] font-medium uppercase tracking-[0.5em] ${sweetsColor}`}
      >
        Sweets
      </span>
    </Link>
  );
}
