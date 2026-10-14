"use client"; // scroll-triggered Framer Motion reveals

import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Soft "patisserie" easing — quick start, long gentle settle.
const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  // Vertical travel in px; 0 for a pure fade.
  y?: number;
}

// Fades and lifts its children into place the first time they scroll into
// view. Reduced-motion handling comes from the site-wide MotionProvider.
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const GROUP_ELEMENTS = {
  div: "div",
  ul: "ul",
  ol: "ol",
} as const;

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof GROUP_ELEMENTS;
}

// Semantic list/grid wrapper for RevealItems. Items trigger individually, so
// a long grid cascades row by row as it scrolls into view rather than
// animating off-screen all at once (important for single-column mobile).
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const Component = GROUP_ELEMENTS[as];
  return <Component className={className}>{children}</Component>;
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  // Position in the grid; drives the left-to-right stagger within a row.
  index?: number;
  // Columns at the widest breakpoint, so each row restarts its stagger.
  columns?: number;
}

export function RevealItem({
  children,
  className,
  as = "div",
  index = 0,
  columns = 3,
}: RevealItemProps) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, ease: EASE, delay: (index % columns) * 0.1 }}
    >
      {children}
    </Component>
  );
}
