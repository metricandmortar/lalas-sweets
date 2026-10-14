"use client"; // Framer Motion spring hover/tap physics

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md";
// responsive = full-width on mobile, auto from sm up.
export type ButtonWidth = "responsive" | "auto" | "full";

// Shared spring for every CTA: snappy, slightly bouncy, never wobbly.
export const BUTTON_SPRING = { type: "spring", stiffness: 420, damping: 24, mass: 0.6 } as const;
export const BUTTON_HOVER = { scale: 1.02 };
export const BUTTON_TAP = { scale: 0.98 };

const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-70";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-cta text-cta-foreground shadow-soft hover:bg-cta-hover hover:shadow-glow",
  secondary:
    "border border-rose-300 bg-cream-50/70 text-rose-700 hover:border-rose-500 hover:bg-blush-100",
};

// Both sizes clear the 44px minimum touch target.
const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 py-2.5 text-sm",
  md: "min-h-12 px-8 py-3.5 text-base",
};

const WIDTHS: Record<ButtonWidth, string> = {
  responsive: "w-full sm:w-auto",
  auto: "w-auto",
  full: "w-full",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  width: ButtonWidth = "responsive",
  className = "",
) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${WIDTHS[width]} ${className}`;
}

const MotionLink = motion.create(Link);

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  className?: string;
  // Opens off-site links in a new tab with safe rel attributes.
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

// Pill CTA with spring scale on hover/tap. Plain <a> for tel:/mailto:/
// external hrefs, next/link for internal routes.
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  width = "responsive",
  className = "",
  external = false,
  ariaLabel,
  onClick,
}: ButtonLinkProps) {
  const shared = {
    className: buttonClassName(variant, size, width, className),
    whileHover: BUTTON_HOVER,
    whileTap: BUTTON_TAP,
    transition: BUTTON_SPRING,
    "aria-label": ariaLabel,
    onClick,
  };

  if (external || !href.startsWith("/")) {
    return (
      <motion.a
        href={href}
        {...shared}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} {...shared}>
      {children}
    </MotionLink>
  );
}
