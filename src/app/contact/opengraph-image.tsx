import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { CONTACT_SEO } from "@/lib/constants";

export const alt = CONTACT_SEO.og.alt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: CONTACT_SEO.og.eyebrow,
    headline: CONTACT_SEO.og.headline,
    photo: "contact",
  });
}
