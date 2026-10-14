"use client"; // MotionConfig is a client-side React context provider

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// Site-wide motion settings. reducedMotion="user" makes every Framer Motion
// animation honor the OS "reduce motion" setting: transforms (lift, scale,
// slide) are skipped while opacity fades remain.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
