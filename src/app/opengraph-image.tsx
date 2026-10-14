import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { HOME_SEO } from "@/lib/constants";

export const alt = HOME_SEO.og.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: HOME_SEO.og.eyebrow,
    headline: HOME_SEO.og.headline,
    photo: "home",
  });
}
