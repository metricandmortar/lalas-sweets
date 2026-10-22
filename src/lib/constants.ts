export interface Site {
  name: string;
  tagline: string;
  mission: string;
  description: string;
  phone: string;
  phoneTel: string;
  email: string;
  instagram: {
    handle: string;
    url: string;
  };
  // Display string for copy, e.g. "Wahiawa, Oahu".
  location: string;
  // Structured locality for schema.org — city level only: this is a
  // home-based bakery, so no street address is published.
  address: {
    locality: string;
    island: string;
    region: string;
    regionName: string;
    country: string;
  };
  areaServed: string[];
  // Canonical production origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL
  // in Vercel; falls back to localhost for development builds.
  url: string;
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Single source of truth for business NAP + brand data — referenced wherever
// the site surfaces the business name, contact info, or mission instead of
// duplicating the literals.
export const SITE: Site = {
  name: "Lala's Sweets",
  tagline: "Made with love for His Glory",
  mission: "Sharing the Love of God through people's love of sweets.",
  description:
    "Homemade bakery in Wahiawa, Oahu — cheesecake cookie cups, brownie cheesecake cups, parfaits, cinnamon bagel crisps, and cookies made to order for gifts, dessert catering, and pop-ups.",
  phone: "(808) 375-8713",
  phoneTel: "+18083758713",
  email: "lorelaisamson@gmail.com",
  instagram: {
    handle: "@Lalassweets.hi",
    url: "https://www.instagram.com/lalassweets.hi/",
  },
  location: "Wahiawa, Oahu",
  address: {
    locality: "Wahiawa",
    island: "Oahu",
    region: "HI",
    regionName: "Hawaii",
    country: "US",
  },
  areaServed: ["Wahiawa", "Oahu"],
  url: SITE_URL,
};

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const HEADER_CTA: NavLink = {
  label: "Order / Inquire",
  href: "/contact",
};

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

// ---------------------------------------------------------------------------
// Ordering rules — client-supplied packaging minimums. Shown on product cards,
// the menu, catering FAQ, JSON-LD, and /llms.txt from this one place.
// Ordering stays inquiry-only (no online checkout) so the client controls her
// monthly order capacity.
// ---------------------------------------------------------------------------

export const ORDER_RULES = {
  parfaits: "Catering orders only • Minimum 12 per flavor.",
  cheesecakeCups: "Party Packs of 12 or 24 • Regular orders in packs of 4.",
  capacity:
    "Orders are confirmed by message — there's no online checkout — and only a limited number are taken each month.",
};

// ---------------------------------------------------------------------------
// Trust signals — every claim here is grounded in client-supplied facts
// (homemade, local, made to order, sales channels, faith mission). No
// ratings or reviews until the client provides real, shareable ones.
// ---------------------------------------------------------------------------

export type TrustBadgeIcon = "map-pin" | "chef-hat" | "party" | "heart";

export interface TrustBadge {
  icon: TrustBadgeIcon;
  title: string;
  subtitle: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: "map-pin",
    title: `Local to ${SITE.location}`,
    subtitle: "Baked at home in Wahiawa",
  },
  {
    icon: "chef-hat",
    title: "Made to order",
    subtitle: "Nothing sits on a shelf",
  },
  {
    icon: "party",
    title: "Catering & party packs",
    subtitle: "Parfaits by the dozen, cups by 12 or 24",
  },
  {
    icon: "heart",
    title: SITE.tagline,
    subtitle: "Sharing God's love through sweets",
  },
];

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export interface ProductImage {
  src: string;
  alt: string;
  // True while the client's temporary photo is in use; flip to false when
  // the final photography is swapped in at the same `src` (or a new one).
  isPlaceholder: boolean;
}

export type ProductCategory = "cookies" | "parfaits" | "cheesecake-cups" | "snacks";

export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  cookies: "Cookies",
  parfaits: "Parfaits",
  "cheesecake-cups": "Cheesecake Cups",
  snacks: "Snacks",
};

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  // Client's exact wording — do not edit without her sign-off.
  shortDescription: string;
  // Display-ready price (e.g. "$12 / dozen"). Left unset until the client
  // confirms pricing — cards fall back to "Pricing on request".
  price?: string;
  // Packaging / minimum-order rule shown as a note on the card.
  orderNote?: string;
  // Omit until the client supplies a real photo — cards render a
  // "Photo coming soon" tile and the item is left out of schema images.
  image?: ProductImage;
  // Additional angles of the same item (e.g. a single-cookie close-up).
  gallery?: ProductImage[];
  isTopSeller: boolean;
  // Optional local-flavor ribbon shown on the card (e.g. "Island Favorite").
  badge?: string;
}

// Catalog order is the client's menu order.
export const PRODUCTS: Product[] = [
  {
    slug: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    category: "cookies",
    shortDescription:
      "Soft, chewy inside with a crisp outside, loaded with milk chocolate chips in every bite.",
    image: {
      src: "/images/cookies-chocolate-chip.jpg",
      alt: "Homemade chocolate chip cookies from Lala's Sweets in Wahiawa, Oahu",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "fruity-pebble-cookies",
    name: "Fruity Pebble Cookies",
    category: "cookies",
    shortDescription:
      "Buttery, shortbread-style cookies packed with colorful Fruity Pebbles for a sweet, crunchy twist!",
    image: {
      src: "/images/cookie-fruity-pebbles.jpg",
      alt: "Fruity Pebble shortbread cookie baked by Lala's Sweets on Oahu",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "white-chocolate-macadamia-nut-cookies",
    name: "White Chocolate Macadamia Nut Cookies",
    category: "cookies",
    shortDescription:
      "Soft, buttery cookies filled with creamy white chocolate chips and crunchy macadamia nuts.",
    image: {
      src: "/images/cookies-white-chocolate-macadamia.jpg",
      alt: "White chocolate macadamia nut cookies homemade in Wahiawa, Hawaii",
      isPlaceholder: true,
    },
    gallery: [
      {
        src: "/images/cookie-white-chocolate-macadamia-single.jpg",
        alt: "Close-up of a single white chocolate macadamia nut cookie",
        isPlaceholder: true,
      },
    ],
    isTopSeller: false,
    badge: "Island Favorite",
  },
  {
    slug: "churro-cookies",
    name: "Churro Cookie",
    category: "cookies",
    shortDescription:
      "The perfect soft cookie baked and coated in cinnamon sugar, bringing you all the delicious flavors of a classic churro.",
    // No photo yet — the client is supplying dedicated churro cookie shots.
    isTopSeller: false,
  },
  {
    slug: "cinnamon-toast-crunch-cookies",
    name: "Cinnamon Toast Crunch Cookies",
    category: "cookies",
    // DRAFT — replace with the client's exact wording once she sends it.
    shortDescription:
      "Soft cinnamon sugar cookies topped with crunchy Cinnamon Toast Crunch cereal and a sweet vanilla glaze drizzle.",
    image: {
      src: "/images/cookies-cinnamon-toast-crunch.jpg",
      alt: "Glazed Cinnamon Toast Crunch cookies cooling on a rack at Lala's Sweets in Wahiawa, Oahu",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "oreo-parfait",
    name: "Oreo Parfait",
    category: "parfaits",
    shortDescription:
      "Layers of Oreo cookie crust, creamy homemade cheesecake filling, Oreo pudding, and fluffy Cool Whip.",
    orderNote: ORDER_RULES.parfaits,
    image: {
      src: "/images/parfait-cookies-and-cream.jpg",
      alt: "Oreo cheesecake parfait in a Lala's Sweets labeled cup, Oahu dessert catering",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "cookie-butter-parfait",
    name: "Cookie Butter Parfait",
    category: "parfaits",
    shortDescription:
      "Layers of cookie butter goodness, creamy homemade cookie butter cheesecake, vanilla pudding, and fluffy whipped topping for the perfect sweet treat.",
    orderNote: ORDER_RULES.parfaits,
    image: {
      src: "/images/cookie-butter-parfait.jpg",
      alt: "Cookie butter cheesecake parfait with vanilla pudding layers, made in Wahiawa, Oahu",
      isPlaceholder: false,
    },
    gallery: [
      {
        src: "/images/parfait-biscoff.jpg",
        alt: "Cookie butter parfait sealed with the Lala's Sweets label",
        isPlaceholder: false,
      },
      {
        src: "/images/cookie-butter-parfait-held.jpg",
        alt: "Cookie butter parfait held up outdoors in Wahiawa",
        isPlaceholder: false,
      },
      {
        src: "/images/cookie-butter-parfait-side.jpg",
        alt: "Side view of a cookie butter parfait showing its cheesecake and pudding layers",
        isPlaceholder: false,
      },
    ],
    isTopSeller: false,
  },
  {
    slug: "strawberry-shortcake-parfait",
    name: "Strawberry Shortcake Parfait",
    category: "parfaits",
    shortDescription:
      "Layers of sweet fresh strawberries, soft cake, creamy homemade cheesecake filling, and fluffy whipped topping.",
    orderNote: ORDER_RULES.parfaits,
    image: {
      src: "/images/strawberry-shortcake-parfait.jpg",
      alt: "Strawberry shortcake cheesecake parfait topped with a fresh strawberry, Lala's Sweets Oahu",
      isPlaceholder: false,
    },
    gallery: [
      {
        src: "/images/parfaits.jpg",
        alt: "Strawberry shortcake parfait sealed with the Lala's Sweets label",
        isPlaceholder: false,
      },
      {
        src: "/images/strawberry-shortcake-parfait-held.jpg",
        alt: "Strawberry shortcake parfait held up outdoors in Wahiawa",
        isPlaceholder: false,
      },
      {
        src: "/images/strawberry-shortcake-parfait-held-2.jpg",
        alt: "Strawberry shortcake parfait held up against an Oahu sky",
        isPlaceholder: false,
      },
      {
        src: "/images/strawberry-shortcake-parfait-porch.jpg",
        alt: "Strawberry shortcake parfait on a wooden porch table in Wahiawa",
        isPlaceholder: false,
      },
    ],
    isTopSeller: true,
  },
  {
    slug: "cheesecake-cookie-cups",
    name: "Cheesecake Cookie Cups",
    category: "cheesecake-cups",
    shortDescription:
      "Chocolate chip cookie cups filled with creamy, homemade cheesecake for the perfect bite-sized dessert.",
    orderNote: ORDER_RULES.cheesecakeCups,
    image: {
      src: "/images/cookie-cups-party-pack.jpg",
      alt: "24-pack party box of cheesecake cookie cups from Lala's Sweets, Wahiawa, Oahu",
      isPlaceholder: false,
    },
    gallery: [
      {
        src: "/images/cookie-cups-box.jpg",
        alt: "Top-down view of a 24-count box of cheesecake cookie cups",
        isPlaceholder: false,
      },
      {
        src: "/images/cookie-cups-packaged.jpg",
        alt: "Regular 4-pack of cheesecake cookie cups with the Lala's Sweets label",
        isPlaceholder: false,
      },
      {
        src: "/images/cookie-cups.jpg",
        alt: "Cheesecake cookie cups cooling on a wire rack",
        isPlaceholder: false,
      },
    ],
    isTopSeller: true,
  },
  {
    slug: "brownie-cheesecake-cups",
    name: "Brownie Cheesecake Cups",
    category: "cheesecake-cups",
    shortDescription:
      "Rich, fudgy brownie cups filled with homemade cheesecake for the ultimate chocolatey treat.",
    orderNote: ORDER_RULES.cheesecakeCups,
    image: {
      src: "/images/brownie-cheesecake-cups.jpg",
      alt: "24-pack party box of brownie cheesecake cups from Lala's Sweets on Oahu",
      isPlaceholder: false,
    },
    isTopSeller: false,
  },
  {
    slug: "cinnamon-bagel-crisps",
    name: "Cinnamon Bagel Crisps",
    category: "snacks",
    shortDescription:
      "Thin, crunchy bagel chips with the perfect amount of cinnamon sugar for the perfect snack.",
    image: {
      src: "/images/bagel-crisps.jpg",
      alt: "Cinnamon sugar bagel crisps homemade by Lala's Sweets in Wahiawa, Hawaii",
      isPlaceholder: true,
    },
    isTopSeller: true,
  },
];

export interface SalesChannel {
  slug: string;
  name: string;
  shortDescription: string;
  image?: ProductImage;
}

export const SALES_CHANNELS: SalesChannel[] = [
  {
    slug: "catering",
    name: "Catering",
    shortDescription:
      "Parfaits by the dozen, cheesecake cup party packs, and cookies for birthdays, showers, church gatherings, and office events.",
  },
  {
    slug: "direct-to-consumer",
    name: "Personal orders",
    shortDescription:
      "Cookies, cheesecake cups in packs of 4, and bagel crisps for a gift, a birthday, or a regular Tuesday.",
  },
  {
    slug: "events-pop-ups",
    name: "Pop-ups",
    shortDescription: `Look for the Lala's Sweets table at markets and community events around ${SITE.address.island}.`,
  },
];

// ---------------------------------------------------------------------------
// Shared section content
// ---------------------------------------------------------------------------

export interface PageHeroContent {
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  paragraph: string;
}

export interface CtaBandContent {
  heading: string;
  paragraph: string;
  primaryCta: NavLink;
  // Renders a tap-to-call button with SITE.phone alongside the primary CTA.
  showPhone: boolean;
}

export const PRODUCT_CARD_LABELS = {
  inquire: "Inquire",
  pricingFallback: "Pricing on request",
  topSeller: "Top Seller",
  photoComingSoon: "Photo coming soon",
};

// Deep links into the contact form. The form reads these params to
// pre-select the inquiry type / product and pre-fill the message, so
// customers never retype what they clicked on.
export const productInquiryHref = (slug: string) => `/contact?product=${slug}`;
export const cateringInquiryHref = (packageSlug?: string) =>
  packageSlug ? `/contact?inquiry=catering&package=${packageSlug}` : "/contact?inquiry=catering";
export const POP_UP_INQUIRY_HREF = "/contact?inquiry=pop-up";

// ---------------------------------------------------------------------------
// Homepage section content
// ---------------------------------------------------------------------------

export interface HeroContent {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  paragraph: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  image: ProductImage;
  badge: {
    title: string;
    subtitle: string;
  };
}

export const HERO_CONTENT: HeroContent = {
  // Location lives in the eyebrow so the client's headline stays verbatim.
  eyebrow: `${SITE.address.locality} · ${SITE.address.island}, Hawaiʻi · Made to Order`,
  heading: "Homemade treats,",
  headingAccent: "lots of love.",
  paragraph:
    "Satisfying your sweet tooth with homemade treats, freshly made to order just for you. Every treat is created to bring joy to your everyday moments and special occasions!",
  primaryCta: { label: "See the Menu", href: "/menu" },
  secondaryCta: { label: "Catering Orders", href: "/catering" },
  image: {
    src: "/images/strawberry-shortcake-parfait.jpg",
    alt: "Strawberry shortcake parfait from Lala's Sweets, a homemade bakery in Wahiawa, Oahu",
    isPlaceholder: false,
  },
  badge: {
    title: "Made to order",
    subtitle: "Catering · Pop-ups · Gifts",
  },
};

export interface FeaturedProductsContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  viewAllCta: NavLink;
}

export const FEATURED_PRODUCTS_CONTENT: FeaturedProductsContent = {
  eyebrow: "Most Requested",
  heading: "What people order most",
  paragraph:
    "Cheesecake cookie cups, parfaits, and cinnamon bagel crisps are the ones customers ask for again. The rest of the menu is one click away.",
  viewAllCta: { label: "See the full menu", href: "/menu" },
};

export interface StoryPillar {
  title: string;
  description: string;
}

export interface StoryContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  pillars: StoryPillar[];
  image: ProductImage;
  channelsEyebrow: string;
  channelsHeading: string;
  cta: NavLink;
}

export const STORY_CONTENT: StoryContent = {
  eyebrow: `Our Story · ${SITE.location}`,
  heading: "A love for baking, and a heart for sharing it.",
  // Client's exact words.
  paragraphs: [
    "Lala’s Sweets started with a love for baking and a heart for sharing that with others. What began as a simple passion has grown into a little business where homemade treats make life’s sweetest moments even more special.",
    "My mission is simple: to share the love of God through people’s love of sweets. Every order is made with care, baked with love, and prepared with the hope of bringing a little extra joy to someone’s day.",
    "Whether you’re celebrating a special occasion, gathering with loved ones, or simply craving something sweet, I’m so grateful to be a small part of your moments. Thank you for supporting my small business and allowing me to share a little piece of my heart with you!",
  ],
  pillars: [
    {
      title: "Homemade",
      description: "Baked by hand in a home kitchen, one order at a time.",
    },
    {
      title: "Local",
      description: `Made in ${SITE.address.locality} for friends and neighbors across ${SITE.address.island}.`,
    },
    {
      title: "Made with Love",
      description: "Every order is a chance to share God's love.",
    },
  ],
  image: {
    src: "/images/cookie-butter-parfait-porch.jpg",
    alt: "Cookie butter parfait on a wooden porch table in Wahiawa, Oahu",
    isPlaceholder: false,
  },
  channelsEyebrow: "Ways to Order",
  channelsHeading: "Three ways to get your treats",
  cta: { label: "Start an Order", href: "/contact" },
};

// ---------------------------------------------------------------------------
// Menu page
// ---------------------------------------------------------------------------

export interface MenuCategory {
  id: ProductCategory;
  label: string;
  description: string;
}

export interface MenuPageContent {
  hero: PageHeroContent;
  categoryNavLabel: string;
  categories: MenuCategory[];
  allergenNotice: string;
  ctaBand: CtaBandContent;
}

export const MENU_PAGE_CONTENT: MenuPageContent = {
  hero: {
    eyebrow: `The Menu · ${SITE.location}`,
    heading: "Cookies, parfaits,",
    headingAccent: "cheesecake cups & more.",
    paragraph: `Every treat is homemade in ${SITE.address.locality} and made to order. Parfaits are for catering orders (12 per flavor minimum), and cheesecake cups come in packs of 4 or party packs of 12 or 24. Send an inquiry for pricing and pickup dates.`,
  },
  categoryNavLabel: "Menu categories",
  // Display order of the catalog sections and category tabs.
  categories: [
    {
      id: "cookies",
      label: PRODUCT_CATEGORIES.cookies,
      description: "Every flavor baked from scratch.",
    },
    {
      id: "parfaits",
      label: PRODUCT_CATEGORIES.parfaits,
      description: ORDER_RULES.parfaits,
    },
    {
      id: "cheesecake-cups",
      label: PRODUCT_CATEGORIES["cheesecake-cups"],
      description: ORDER_RULES.cheesecakeCups,
    },
    {
      id: "snacks",
      label: PRODUCT_CATEGORIES.snacks,
      description: "Cinnamon sugar bagel chips, bagged for snacking.",
    },
  ],
  allergenNotice:
    "Allergen notice: our treats are made in a home kitchen that also handles common allergens, including wheat, dairy, eggs, and tree nuts (such as macadamia nuts). Please ask about ingredients before ordering.",
  ctaBand: {
    heading: "Know what you'd like?",
    paragraph: `Send the treats, quantities, and the date you need them. ${ORDER_RULES.capacity}`,
    primaryCta: { label: "Send an Inquiry", href: "/contact" },
    showPhone: true,
  },
};

// ---------------------------------------------------------------------------
// Catering page
// ---------------------------------------------------------------------------

export interface CateringPackage {
  slug: string;
  name: string;
  description: string;
  idealFor: string;
  highlights: string[];
  image: ProductImage;
}

export interface CateringStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CateringPageContent {
  hero: PageHeroContent & {
    primaryCta: NavLink;
  };
  packages: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    idealForLabel: string;
    quoteLabel: string;
    ctaLabel: string;
    items: CateringPackage[];
  };
  popUps: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    bookCta: NavLink;
    instagramLabel: string;
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: CateringStep[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: FaqItem[];
  };
  ctaBand: CtaBandContent;
}

export const CATERING_PAGE_CONTENT: CateringPageContent = {
  hero: {
    eyebrow: `Catering & Events · ${SITE.address.island}`,
    heading: "Homemade desserts",
    headingAccent: "for your celebration.",
    paragraph: `Parfaits by the dozen, cheesecake cup party packs, and trays of cookies for birthdays, baby showers, church gatherings, and office events — homemade in ${SITE.location}.`,
    primaryCta: { label: "Request a Catering Quote", href: cateringInquiryHref() },
  },
  packages: {
    eyebrow: "Catering Options",
    heading: "Pick a starting point",
    paragraph:
      "Every catering order is quoted to your event, guest count, and flavors. These are the three most common setups.",
    idealForLabel: "Ideal for",
    quoteLabel: "Custom quote",
    ctaLabel: "Request a Quote",
    items: [
      {
        slug: "dessert-table",
        name: "Dessert Table",
        description:
          "A mix of parfaits, cheesecake cups, cookies, and bagel crisps set out as the dessert spread for your event.",
        idealFor: "Birthdays, showers, graduations & weddings",
        highlights: [
          "Parfaits in Oreo, cookie butter & strawberry shortcake",
          "Minimum 12 parfaits per flavor",
          "Mix and match from the full menu",
        ],
        image: {
          src: "/images/parfait-cookies-and-cream.jpg",
          alt: "Oreo parfait for a dessert catering table on Oahu",
          isPlaceholder: true,
        },
      },
      {
        slug: "party-trays",
        name: "Party Packs",
        description:
          "Cheesecake cookie cups or brownie cheesecake cups boxed in 12s or 24s — easy to set out and easy to share.",
        idealFor: "Office meetings, church gatherings & potlucks",
        highlights: [
          "Boxes of 12 or 24",
          "Cookie cups, brownie cups, or both",
          "Add a tray of cookies",
        ],
        image: {
          src: "/images/cookie-cups-party-pack.jpg",
          alt: "24-count party pack of cheesecake cookie cups for Oahu catering",
          isPlaceholder: false,
        },
      },
      {
        slug: "favors-gift-packs",
        name: "Favors & Gift Packs",
        description:
          "Treats packed in 4s and sealed with the Lala's Sweets label — a thank-you guests can take home.",
        idealFor: "Wedding & shower favors, client and staff gifts",
        highlights: [
          "Packs of 4 cheesecake cups",
          "Branded Lala's Sweets labels",
          "Ordered in bulk for events",
        ],
        image: {
          src: "/images/cookie-cups-packaged.jpg",
          alt: "4-pack of cheesecake cookie cups sealed with the Lala's Sweets label",
          isPlaceholder: true,
        },
      },
    ],
  },
  popUps: {
    eyebrow: "Events & Pop-Ups",
    heading: "Bring Lala's Sweets to your next event",
    paragraphs: [
      `Hosting a market, fundraiser, church event, or community gathering on ${SITE.address.island}? A Lala's Sweets pop-up brings a table of homemade treats to your guests.`,
      "Want to find us at an upcoming pop-up? Dates, locations, and new flavors go up on Instagram first.",
    ],
    bookCta: { label: "Book a Pop-Up", href: POP_UP_INQUIRY_HREF },
    instagramLabel: `Follow ${SITE.instagram.handle}`,
  },
  process: {
    eyebrow: "How It Works",
    heading: "How catering orders work",
    steps: [
      {
        title: "Reach out",
        description:
          "Send an inquiry or call with your event date, guest count, and the treats you'd like.",
      },
      {
        title: "Confirm",
        description:
          "We'll settle flavors, quantities, your quote, and the pickup time — all by message.",
      },
      {
        title: "Pick up",
        description:
          "Your order is made fresh for your date and ready at the agreed pickup time.",
      },
    ],
  },
  // Visible on the catering page and mirrored 1:1 in FAQPage JSON-LD, giving
  // answer engines concise, quotable facts about the business.
  faq: {
    eyebrow: "Questions",
    heading: "Frequently asked questions",
    items: [
      {
        question: "Where is Lala's Sweets located?",
        answer: `Lala's Sweets is a homemade bakery based in ${SITE.address.locality}, on the island of ${SITE.address.island}, ${SITE.address.regionName}. Every order is made to order, and pickup details are confirmed when you order.`,
      },
      {
        question: "How do I place an order?",
        answer: `Send an inquiry through our contact form, call or text ${SITE.phone}, email ${SITE.email}, or message us on Instagram at ${SITE.instagram.handle}. There's no online checkout — your order is confirmed once we've agreed on the details together.`,
      },
      {
        question: "Can I order parfaits for just a few people?",
        answer: `Parfaits are made for catering orders only, with a minimum of 12 per flavor. Flavors are Oreo, Cookie Butter, and Strawberry Shortcake.`,
      },
      {
        question: "How are the cheesecake cups sold?",
        answer:
          "Cheesecake Cookie Cups and Brownie Cheesecake Cups come in packs of 4 for regular orders, or party packs of 12 or 24.",
      },
      {
        question: "Do you cater events?",
        answer: `Yes. Lala's Sweets caters birthdays, baby and bridal showers, weddings, graduations, church gatherings, and office events on ${SITE.address.island} with dessert tables, cheesecake cup party packs, and packaged favors. Every catering order is a custom quote.`,
      },
      {
        question: "Can Lala's Sweets do a pop-up at my event?",
        answer:
          "Yes. We bring pop-up tables of homemade treats to markets, fundraisers, church events, and community gatherings. Send a pop-up inquiry with your event date and details.",
      },
      {
        question: "What's on the menu?",
        answer:
          "Chocolate Chip, Fruity Pebble, White Chocolate Macadamia Nut, Churro, and Cinnamon Toast Crunch cookies; Oreo, Cookie Butter, and Strawberry Shortcake parfaits; Cheesecake Cookie Cups and Brownie Cheesecake Cups; and Cinnamon Bagel Crisps.",
      },
      {
        question: "How far in advance should I order?",
        answer:
          "As early as you can. Lala's Sweets takes a limited number of orders each month, so send your date and we'll tell you right away whether there's room.",
      },
      {
        question: "Do your treats contain allergens?",
        answer:
          "Our treats are made in a home kitchen that also handles wheat, dairy, eggs, and tree nuts (including macadamia nuts), so we can't guarantee any item is allergen-free. Please tell us about allergies and ask about ingredients before ordering.",
      },
    ],
  },
  ctaBand: {
    heading: "Have a date in mind?",
    paragraph:
      "Orders are limited each month, so send your date and guest count early.",
    primaryCta: { label: "Request a Catering Quote", href: cateringInquiryHref() },
    showPhone: true,
  },
};

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export interface AboutPageContent {
  hero: PageHeroContent;
  // Overrides STORY_CONTENT.image so the home page keeps its own photo.
  storyImage: ProductImage;
  ctaBand: CtaBandContent;
}

export const ABOUT_PAGE_CONTENT: AboutPageContent = {
  hero: {
    eyebrow: `About Lala's Sweets · ${SITE.address.locality}`,
    heading: `Homemade in ${SITE.address.locality},`,
    headingAccent: `shared across ${SITE.address.island}.`,
    paragraph: SITE.mission,
  },
  storyImage: {
    src: "/images/lorelai-about.jpg",
    alt: "Lorelai Samson holding a fresh strawberry shortcake parfait at Lala's Sweets in Wahiawa, Hawaii",
    isPlaceholder: false,
  },
  ctaBand: {
    heading: "Want to place an order?",
    paragraph: "Tell us what you're craving and when you need it.",
    primaryCta: { label: "Start an Order", href: "/contact" },
    showPhone: true,
  },
};

// ---------------------------------------------------------------------------
// Contact page
// ---------------------------------------------------------------------------

export interface ContactChannel {
  id: "phone" | "email" | "instagram";
  label: string;
  value: string;
  href: string;
  description: string;
  external: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactFormContent {
  heading: string;
  description: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    inquiryType: { label: string; options: SelectOption[] };
    product: { label: string; placeholder: string };
    eventDate: { label: string };
    message: { label: string; placeholder: string };
  };
  optionalLabel: string;
  selectedProductLabel: string;
  // "{package}" is replaced with the catering package name on deep links.
  packageMessageTemplate: string;
  submitLabel: string;
  sendingLabel: string;
  privacyNote: { text: string; linkLabel: string; href: string };
  success: { heading: string; description: string; resetLabel: string };
  error: { heading: string; description: string };
  validation: {
    heading: string;
    name: string;
    email: string;
    phone: string;
    inquiryType: string;
    product: string;
    eventDate: string;
    message: string;
  };
  rateLimit: {
    // "{seconds}" is replaced with the time left before another send.
    cooldown: string;
    tooFast: string;
  };
  notification: { subjectPrefix: string; fromName: string };
}

export interface ContactPageContent {
  hero: PageHeroContent;
  channelsHeading: string;
  channels: ContactChannel[];
  form: ContactFormContent;
}

export const INQUIRY_TYPES: SelectOption[] = [
  { value: "order", label: "Place an order" },
  { value: "catering", label: "Catering" },
  { value: "pop-up", label: "Event / Pop-up booking" },
  { value: "other", label: "Something else" },
];

export const CONTACT_PAGE_CONTENT: ContactPageContent = {
  hero: {
    eyebrow: `Order & Contact · ${SITE.location}`,
    heading: "Place an order,",
    headingAccent: "or just say hi.",
    paragraph: `Tell us the treats, quantities, and date below, or call or text. ${ORDER_RULES.capacity}`,
  },
  channelsHeading: "Reach us directly",
  channels: [
    {
      id: "phone",
      label: "Call or text",
      value: SITE.phone,
      href: `tel:${SITE.phoneTel}`,
      description: "The fastest way to reach us for orders.",
      external: false,
    },
    {
      id: "email",
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      description: "Good for catering details and event planning.",
      external: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: SITE.instagram.handle,
      href: SITE.instagram.url,
      description: "New flavors and pop-up dates.",
      external: true,
    },
  ],
  form: {
    heading: "Send an inquiry",
    description:
      "Tell us what you're after and we'll reply with pricing and availability.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@example.com" },
      phone: { label: "Phone", placeholder: "(808) 555-0123" },
      inquiryType: { label: "What can we help with?", options: INQUIRY_TYPES },
      product: { label: "Interested in", placeholder: "Not sure yet" },
      eventDate: { label: "Date needed" },
      message: {
        label: "Message",
        placeholder:
          "Quantities, guest count, flavors, pickup timing, or any questions.",
      },
    },
    optionalLabel: "(optional)",
    selectedProductLabel: "You're inquiring about",
    packageMessageTemplate:
      "Hi Lala's Sweets! I'm interested in the {package} catering package for my event. Here are the details:",
    submitLabel: "Send Inquiry",
    sendingLabel: "Sending…",
    privacyNote: {
      text: "We'll only use your information to respond to your inquiry. See our",
      linkLabel: "Privacy Policy",
      href: "/privacy",
    },
    success: {
      heading: "Mahalo! Your inquiry is on its way.",
      description:
        "We've got your message and will get back to you as soon as we can.",
      resetLabel: "Send another inquiry",
    },
    error: {
      heading: "Something went wrong.",
      description: `Your message couldn't be sent. Please try again, or reach us directly at ${SITE.phone} or ${SITE.email}.`,
    },
    validation: {
      heading: "Please check the highlighted fields.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number, or leave it blank.",
      inquiryType: "Please choose what we can help with.",
      product: "Please choose a treat from the list.",
      eventDate: "Please choose a valid date.",
      message: "Please add a few details to your message (at least 10 characters).",
    },
    rateLimit: {
      cooldown:
        "Your last inquiry just went through. You can send another in {seconds} seconds.",
      tooFast: "Please take a moment to look over your details, then send again.",
    },
    notification: {
      subjectPrefix: "New website inquiry",
      fromName: `${SITE.name} Website`,
    },
  },
};

// ---------------------------------------------------------------------------
// Legal pages
// ---------------------------------------------------------------------------

// GENERIC LEGAL CONTENT: drafted as reasonable standard boilerplate for a
// small homemade bakery in Hawaii so the footer's legal links aren't dead.
// Not reviewed by an attorney — replace with official copy if/when that
// becomes available.
export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPageContent {
  hero: PageHeroContent;
  effectiveDate: string;
  sections: LegalSection[];
}

const LEGAL_EFFECTIVE_DATE = "October 13, 2026";

export const PRIVACY_POLICY_CONTENT: LegalPageContent = {
  hero: {
    eyebrow: "Legal",
    heading: "Privacy Policy",
    paragraph: `How ${SITE.name} collects, uses, and protects your information.`,
  },
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  sections: [
    {
      heading: "Overview",
      body: [
        `This Privacy Policy explains how ${SITE.name} ("we," "us," or "our"), a homemade bakery based in ${SITE.location}, ${SITE.address.regionName}, collects, uses, and protects information when you visit this website, send us an inquiry, or place an order. By using this site, you agree to the practices described below.`,
      ],
    },
    {
      heading: "Information We Collect",
      body: [
        "When you submit our inquiry form, we collect the information you provide, which may include your name, email address, phone number, the type of inquiry, the products you're interested in, the date you need your order, and any message you send us.",
        "If you contact us by phone, text, email, or Instagram, we receive the information you choose to share through that channel.",
        "We may also collect basic technical information automatically when you visit the site, such as your browser type, device type, and pages viewed. See our Cookie Policy for details.",
      ],
    },
    {
      heading: "How We Use Your Information",
      body: [
        "We use your information to respond to your inquiries, prepare quotes, fulfill and coordinate your orders, catering, and pop-up bookings, and follow up about your order. We do not use your information for any purpose unrelated to operating and improving our bakery and this website.",
      ],
    },
    {
      heading: "How Inquiries Are Delivered",
      body: [
        "Inquiry form submissions are delivered to our email inbox through a third-party form-processing service (Web3Forms). That service processes your submission only to deliver it to us, under its own privacy policy.",
      ],
    },
    {
      heading: "Sharing Your Information",
      body: [
        "We do not sell or rent your personal information. We may share it with service providers who help us run our business — such as our website hosting, form delivery, email, or payment providers — solely to provide our services to you. We may also disclose information if required to do so by law.",
      ],
    },
    {
      heading: "Instagram & Third-Party Platforms",
      body: [
        `If you interact with us on Instagram (${SITE.instagram.handle}) or other third-party platforms, your use of those platforms is governed by their own privacy policies, not this one.`,
      ],
    },
    {
      heading: "Data Retention & Security",
      body: [
        "We keep inquiry and order information only as long as needed to serve you and maintain reasonable business records. We take reasonable steps to protect the information you share with us, but no method of transmission or storage over the internet is completely secure.",
      ],
    },
    {
      heading: "Your Rights & Choices",
      body: [
        `You can request access to, correction of, or deletion of the personal information you've shared with us at any time by emailing ${SITE.email}. We will respond to reasonable requests as promptly as we can.`,
      ],
    },
    {
      heading: "Children's Privacy",
      body: [
        "This website is not directed at children under the age of 13, and we do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "Changes to This Policy",
      body: [
        "We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a new effective date.",
      ],
    },
    {
      heading: "Contact Us",
      body: [
        `If you have any questions about this Privacy Policy, contact us at ${SITE.email} or ${SITE.phone}.`,
      ],
    },
  ],
};

export const TERMS_CONTENT: LegalPageContent = {
  hero: {
    eyebrow: "Legal",
    heading: "Terms of Service",
    paragraph: "The terms that govern your use of this website and your orders with us.",
  },
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  sections: [
    {
      heading: "Acceptance of Terms",
      body: [
        `By using this website or placing an order with ${SITE.name}, you agree to these Terms of Service. If you do not agree, please do not use this site or our services.`,
      ],
    },
    {
      heading: "Our Products",
      body: [
        "All of our treats are homemade in small batches. Because each item is made by hand, size, color, and decoration may vary slightly from the photos shown on this website, which are for illustration only.",
      ],
    },
    {
      heading: "Orders & Availability",
      body: [
        "Submitting an inquiry through this website does not confirm an order. Your order is confirmed only once we have agreed on the details with you by phone, text, email, or Instagram. Availability depends on our baking schedule and ingredient availability, and we may decline orders we're unable to fulfill.",
      ],
    },
    {
      heading: "Pricing & Payment",
      body: [
        "Prices are provided at the time of your quote and may vary based on quantity, flavors, packaging, and event details. Payment terms, including any deposit required for catering or large orders, will be confirmed with you before your order is finalized.",
      ],
    },
    {
      heading: "Changes & Cancellations",
      body: [
        "If you need to change or cancel an order, please contact us as soon as possible. Because our treats are made to order, changes or cancellations made after ingredients have been purchased or baking has begun may not be eligible for a refund. Any specific cancellation terms will be shared when your order is confirmed.",
      ],
    },
    {
      heading: "Pickup, Storage & Food Safety",
      body: [
        "Once your order has been picked up or handed off, you are responsible for storing and serving it properly. Items containing cream or cheesecake, such as parfaits and cheesecake cookie cups, should be kept refrigerated and enjoyed promptly. We are not responsible for products that are improperly stored or left unrefrigerated after handoff.",
      ],
    },
    {
      heading: "Allergens",
      body: [
        "Our treats are made in a home kitchen that also handles common allergens, including wheat, dairy, eggs, and tree nuts (such as macadamia nuts). While we take care in preparation, we cannot guarantee that any product is free from allergens. Please let us know about any allergies and ask about ingredients before ordering.",
      ],
    },
    {
      heading: "Events & Pop-Ups",
      body: [
        "Items sold at pop-ups and community events are available while supplies last. Pop-up dates and locations are subject to change; please check our Instagram for the latest updates.",
      ],
    },
    {
      heading: "Intellectual Property",
      body: [
        `The ${SITE.name} name, logo, photos, and content on this website belong to ${SITE.name} and may not be used without our permission.`,
      ],
    },
    {
      heading: "Third-Party Links",
      body: [
        "This website may link to third-party sites, such as Instagram. We are not responsible for the content, policies, or practices of any third-party site.",
      ],
    },
    {
      heading: "Limitation of Liability",
      body: [
        `To the fullest extent permitted by law, ${SITE.name} is not liable for any indirect, incidental, or consequential damages arising from your use of this website or our products.`,
      ],
    },
    {
      heading: "Governing Law",
      body: [
        "These Terms of Service are governed by the laws of the State of Hawaii, without regard to its conflict-of-law principles.",
      ],
    },
    {
      heading: "Changes to These Terms",
      body: [
        "We may update these Terms of Service from time to time. Continued use of this site or our services after changes are posted constitutes acceptance of the updated terms.",
      ],
    },
    {
      heading: "Contact Us",
      body: [
        `If you have any questions about these Terms of Service, contact us at ${SITE.email} or ${SITE.phone}.`,
      ],
    },
  ],
};

export const COOKIE_POLICY_CONTENT: LegalPageContent = {
  hero: {
    eyebrow: "Legal",
    heading: "Cookie Policy",
    paragraph: "The digital kind — how and why this website uses cookies.",
  },
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  sections: [
    {
      heading: "What Are Cookies",
      body: [
        "Cookies are small text files placed on your device when you visit a website. They help the site function properly and can be used to understand how visitors use the site.",
      ],
    },
    {
      heading: "How We Use Cookies",
      body: [
        "This website uses only the cookies and similar technologies necessary for it to function correctly. We do not currently use advertising or cross-site tracking cookies. If we add analytics in the future to understand basic site usage, we will update this policy.",
      ],
    },
    {
      heading: "Third-Party Services",
      body: [
        "Some links on this site, such as our Instagram profile, take you to third-party services that may set their own cookies once you leave our site. Their use of cookies is governed by their own privacy and cookie policies, not this one.",
      ],
    },
    {
      heading: "Managing Cookies",
      body: [
        "Most browsers let you control or disable cookies through their settings. Disabling cookies may affect how some parts of this site function.",
      ],
    },
    {
      heading: "Changes to This Policy",
      body: [
        "We may update this Cookie Policy from time to time. Any changes will be reflected on this page with a new effective date.",
      ],
    },
    {
      heading: "Contact Us",
      body: [
        `If you have any questions about this Cookie Policy, contact us at ${SITE.email}.`,
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// SEO — per-route titles/descriptions (fed through lib/seo.ts) and share-card
// copy (fed to the opengraph-image generators). Titles stay under ~60 chars
// including the " | Lala's Sweets" template suffix.
// ---------------------------------------------------------------------------

export interface PageSeo {
  path: string;
  title: string;
  // Rendered without the " | Lala's Sweets" suffix when true (homepage).
  absoluteTitle?: boolean;
  description: string;
  og: {
    eyebrow: string;
    headline: string;
    alt: string;
  };
}

export const SEO_KEYWORDS = [
  "Wahiawa bakery",
  "homemade bakery Oahu",
  "custom cookie cups Oahu",
  "cheesecake cookie cups",
  "brownie cheesecake cups",
  "dessert parfaits Oahu",
  "dessert catering Oahu",
  "local bakery catering Hawaii",
  "Central Oahu desserts",
];

export const HOME_SEO: PageSeo = {
  path: "/",
  title: `${SITE.name} | Homemade Bakery in Wahiawa, Oahu`,
  absoluteTitle: true,
  description:
    "Homemade cheesecake cookie cups, parfaits, bagel crisps & cookies from Wahiawa, Oahu. Made to order for catering, party packs & pop-ups. Call (808) 375-8713.",
  og: {
    eyebrow: `Made to order in ${SITE.location}`,
    headline: "Homemade treats, lots of love.",
    alt: `${SITE.name} — homemade bakery in ${SITE.location}`,
  },
};

export const MENU_SEO: PageSeo = {
  path: "/menu",
  title: "Wahiawa Bakery Menu: Cookie Cups & Parfaits",
  description:
    "The Lala's Sweets menu in Wahiawa, Oahu: homemade cookies, Oreo, cookie butter & strawberry shortcake parfaits, cheesecake cups, and cinnamon bagel crisps.",
  og: {
    eyebrow: "The Menu",
    headline: "Cookies, parfaits, cheesecake cups & bagel crisps",
    alt: `The ${SITE.name} menu — homemade desserts in ${SITE.location}`,
  },
};

export const CATERING_SEO: PageSeo = {
  path: "/catering",
  title: "Dessert Catering & Pop-Ups on Oahu",
  description:
    "Homemade dessert catering on Oahu from Lala's Sweets in Wahiawa: parfaits by the dozen, cheesecake cup party packs of 12 or 24, favors, and pop-ups.",
  og: {
    eyebrow: `Catering on ${SITE.address.island}`,
    headline: "Parfaits, party packs, favors & pop-ups",
    alt: `${SITE.name} dessert catering on ${SITE.address.island}`,
  },
};

export const ABOUT_SEO: PageSeo = {
  path: "/about",
  title: "About Our Wahiawa Home Bakery",
  description: `Meet Lala's Sweets, a homemade bakery in Wahiawa, Oahu — ${SITE.mission.charAt(0).toLowerCase()}${SITE.mission.slice(1)}`,
  og: {
    eyebrow: "Our Story",
    headline: "Sharing God's love through people's love of sweets",
    alt: `About ${SITE.name}`,
  },
};

export const CONTACT_SEO: PageSeo = {
  path: "/contact",
  title: "Order Custom Desserts in Wahiawa, Oahu",
  description:
    "Order cookie cups, parfaits & homemade sweets or book dessert catering in Wahiawa, Oahu. Call or text (808) 375-8713, email, or send an inquiry online.",
  og: {
    eyebrow: "Order & Inquire",
    headline: "Place an order, or just say hi",
    alt: `Contact ${SITE.name}`,
  },
};

export const PRIVACY_SEO: PageSeo = {
  path: "/privacy",
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
  og: HOME_SEO.og,
};

export const TERMS_SEO: PageSeo = {
  path: "/terms",
  title: "Terms of Service",
  description: `The terms that govern your use of this website and your orders with ${SITE.name}.`,
  og: HOME_SEO.og,
};

export const COOKIES_SEO: PageSeo = {
  path: "/cookies",
  title: "Cookie Policy",
  description: `How and why the ${SITE.name} website uses cookies.`,
  og: HOME_SEO.og,
};

// Every public route, for the sitemap.
export const SITEMAP_ROUTES: { seo: PageSeo; priority: number }[] = [
  { seo: HOME_SEO, priority: 1 },
  { seo: MENU_SEO, priority: 0.9 },
  { seo: CATERING_SEO, priority: 0.9 },
  { seo: CONTACT_SEO, priority: 0.8 },
  { seo: ABOUT_SEO, priority: 0.7 },
  { seo: PRIVACY_SEO, priority: 0.2 },
  { seo: TERMS_SEO, priority: 0.2 },
  { seo: COOKIES_SEO, priority: 0.2 },
];
