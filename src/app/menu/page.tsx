import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { MenuCategoryNav } from "@/components/sections/MenuCategoryNav";
import { MenuCatalog } from "@/components/sections/MenuCatalog";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { MENU_PAGE_CONTENT, MENU_SEO } from "@/lib/constants";
import { breadcrumbSchema, menuSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(MENU_SEO);

export default function MenuPage() {
  const { hero, categoryNavLabel, categories, allergenNotice, ctaBand } = MENU_PAGE_CONTENT;

  return (
    <>
      <JsonLd
        data={[
          menuSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Menu", path: MENU_SEO.path },
          ]),
        ]}
      />
      <PageHero {...hero} />
      <MenuCategoryNav label={categoryNavLabel} categories={categories} />
      <MenuCatalog categories={categories} allergenNotice={allergenNotice} />
      <CtaBand {...ctaBand} />
    </>
  );
}
