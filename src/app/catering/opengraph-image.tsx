import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { CATERING_SEO } from "@/lib/constants";

export const alt = CATERING_SEO.og.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: CATERING_SEO.og.eyebrow,
    headline: CATERING_SEO.og.headline,
    photo: "catering",
  });
}
