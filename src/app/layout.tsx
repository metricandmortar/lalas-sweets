import { Cormorant_Garamond, Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { bakerySchema, websiteSchema } from "@/lib/schema";
import { ROOT_METADATA } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Feeds the --font-display token in globals.css.
const displayFace = Cormorant_Garamond({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = ROOT_METADATA;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${displayFace.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Site-wide entity graph: the Bakery (LocalBusiness) + WebSite. */}
        <JsonLd data={[bakerySchema(), websiteSchema()]} />
        <MotionProvider>
          <Header />
          {/* overflow-x-clip: safety net against decorative layers causing
              sideways scroll on mobile. Unlike overflow-hidden it doesn't
              create a scroll container, so the sticky menu bar keeps working. */}
          <main className="flex-1 overflow-x-clip">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
