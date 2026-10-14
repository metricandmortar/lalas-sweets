import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { ABOUT_SEO } from "@/lib/constants";

export const alt = ABOUT_SEO.og.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: ABOUT_SEO.og.eyebrow,
    headline: ABOUT_SEO.og.headline,
    photo: "about",
  });
}
