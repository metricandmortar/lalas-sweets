import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { StorySection } from "@/components/sections/StorySection";
import { HOME_SEO } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(HOME_SEO);

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedProducts />
      <StorySection />
    </>
  );
}
