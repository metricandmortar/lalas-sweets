import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/constants";

// Shared generator for every route's opengraph-image.tsx. Renders a 1200×630
// branded card: product photo on the left, wordmark + route headline on a
// blush panel on the right, in the site's Cormorant display face.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const OG_PHOTOS = ["home", "menu", "catering", "about", "contact"] as const;
export type OgPhoto = (typeof OG_PHOTOS)[number];

const fontDir = join(process.cwd(), "node_modules/@fontsource/cormorant-garamond/files");

// All assets are loaded with top-level await (static files, not request
// data), so they are fully resolved before any card renders — which lets
// Next prerender every card at build time. A lazily awaited module-scope
// promise races the prerender and leaves some cards dynamic.
const [cormorantRegular, cormorantItalic] = await Promise.all([
  readFile(join(fontDir, "cormorant-garamond-latin-600-normal.woff")),
  readFile(join(fontDir, "cormorant-garamond-latin-600-italic.woff")),
]);

// Photos in src/assets/og are pre-cropped to 504×630 with EXIF rotation baked
// in (Satori ignores EXIF). Regenerate them when product photos are swapped.
const PHOTO_SOURCES = Object.fromEntries(
  await Promise.all(
    OG_PHOTOS.map(async (photo) => {
      const data = await readFile(join(process.cwd(), "src/assets/og", `${photo}.jpg`), "base64");
      return [photo, `data:image/jpeg;base64,${data}`] as const;
    }),
  ),
) as Record<OgPhoto, string>;

interface OgCardOptions {
  eyebrow: string;
  headline: string;
  photo: OgPhoto;
}

export function renderOgImage({ eyebrow, headline, photo }: OgCardOptions) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#fdf6f7" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
        <img src={PHOTO_SOURCES[photo]} width={504} height={630} alt="" style={{ objectFit: "cover" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px 64px 56px",
            borderLeft: "6px solid #ec95a8",
            background: "linear-gradient(160deg, #fbecef 0%, #fdf6f7 55%, #fffcfa 100%)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 92, color: "#c94f6d", lineHeight: 1 }}>
              Lala&rsquo;s
            </div>
            <div style={{ fontSize: 22, letterSpacing: 14, color: "#8a7468", marginTop: 6, paddingLeft: 6 }}>
              SWEETS
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 4, color: "#a83a57", textTransform: "uppercase" }}>
              {eyebrow}
            </div>
            <div style={{ fontFamily: "Cormorant", fontSize: 60, lineHeight: 1.08, color: "#2b211d", marginTop: 14 }}>
              {headline}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 22, color: "#6b574d" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#e57b93", marginRight: 14 }} />
            {`${SITE.location} · ${SITE.phone} · ${SITE.instagram.handle}`}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Cormorant", data: cormorantRegular, style: "normal", weight: 600 },
        { name: "Cormorant", data: cormorantItalic, style: "italic", weight: 600 },
      ],
    },
  );
}
