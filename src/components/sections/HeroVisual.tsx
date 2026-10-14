"use client"; // scroll-linked parallax via Framer Motion useScroll

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import type { HeroContent } from "@/lib/constants";

interface HeroVisualProps {
  image: HeroContent["image"];
  badge: HeroContent["badge"];
}

// Three depth planes drift at different rates as the hero scrolls away:
// leopard mat (slowest) → photo → floating badge (fastest), for a subtle
// layered parallax. Disabled entirely for reduced-motion visitors.
export function HeroVisual({ image, badge }: HeroVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const depth = (distance: number) => (reduceMotion ? [0, 0] : [0, distance]);
  const matY = useTransform(scrollYProgress, [0, 1], depth(70));
  const photoY = useTransform(scrollYProgress, [0, 1], depth(35));
  const badgeY = useTransform(scrollYProgress, [0, 1], depth(-50));

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md lg:col-span-6">
      <motion.div
        aria-hidden="true"
        style={{ y: matY }}
        className="bg-leopard absolute -inset-4 rounded-t-[999px] rounded-b-[2.5rem] border border-blush-200 bg-cream-100"
      />

      {/* The photo is the likely LCP element, so it is never hidden behind
          an opacity reveal and loads eagerly at high priority. */}
      <motion.div
        style={{ y: photoY }}
        className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-4 border-cream-50 shadow-lift"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 640px) 448px, 90vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ y: badgeY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.5 }}
        className="glass absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl px-5 py-4 sm:-left-10"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-blush-100">
          <Heart className="size-5 fill-rose-500 text-rose-500" aria-hidden="true" />
        </span>
        <span className="text-left">
          <span className="block font-display text-lg font-semibold leading-tight text-espresso-900">
            {badge.title}
          </span>
          <span className="block text-xs text-muted">{badge.subtitle}</span>
        </span>
      </motion.div>
    </div>
  );
}
