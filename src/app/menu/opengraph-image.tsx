import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { MENU_SEO } from "@/lib/constants";

export const alt = MENU_SEO.og.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: MENU_SEO.og.eyebrow,
    headline: MENU_SEO.og.headline,
    photo: "menu",
  });
}
