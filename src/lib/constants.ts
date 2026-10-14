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
    "Homemade bakery in Wahiawa, Oahu — cheesecake cookie cups, parfaits, cinnamon bagel crisps, and cookies made to order for gifts, dessert catering, and pop-ups.",
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
    subtitle: "Proudly homemade on the island",
  },
  {
    icon: "chef-hat",
    title: "Small-batch & made to order",
    subtitle: "Baked fresh for every order",
  },
  {
    icon: "party",
    title: "Catering, favors & pop-ups",
    subtitle: "Sweets for every celebration",
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

export type ProductCategory = "snacks" | "cookie-cups" | "parfaits" | "cookies";

export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  snacks: "Snacks",
  "cookie-cups": "Cookie Cups",
  parfaits: "Parfaits",
  cookies: "Cookies",
};

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  // Display-ready price (e.g. "$12 / dozen"). Left unset until the client
  // confirms pricing — cards fall back to "Pricing on request".
  price?: string;
  image: ProductImage;
  // Additional angles of the same item (e.g. a single-cookie close-up).
  gallery?: ProductImage[];
  isTopSeller: boolean;
  // Optional local-flavor ribbon shown on the card (e.g. "Island Favorite").
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "cinnamon-bagel-crisps",
    name: "Cinnamon Bagel Crisps",
    category: "snacks",
    shortDescription:
      "Crunchy, golden bagel crisps dusted in cinnamon sugar — a homemade snack that disappears fast.",
    image: {
      src: "/images/bagel-crisps.jpg",
      alt: "Cinnamon Bagel Crisps by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: true,
  },
  {
    slug: "cheesecake-cookie-cups",
    name: "Cheesecake Cookie Cups",
    category: "cookie-cups",
    shortDescription:
      "A soft-baked cookie cup filled with creamy cheesecake — two favorite desserts in one bite.",
    image: {
      src: "/images/cookie-cups.jpg",
      alt: "Cheesecake Cookie Cups by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: true,
  },
  {
    slug: "cookie-cup-gift-pack",
    name: "Cookie Cup Gift Pack",
    category: "cookie-cups",
    shortDescription:
      "Cheesecake cookie cups boxed and sealed with the Lala's Sweets label — ready to gift, share, or bring to the party.",
    image: {
      src: "/images/cookie-cups-packaged.jpg",
      alt: "Cheesecake cookie cups packaged in a clear box with the Lala's Sweets label",
      isPlaceholder: true,
    },
    isTopSeller: false,
    badge: "Great for Gifting",
  },
  {
    slug: "parfaits",
    name: "Parfaits",
    category: "parfaits",
    shortDescription:
      "Layered dessert parfaits made to order — sweet, creamy, and perfect for sharing or treating yourself.",
    image: {
      src: "/images/parfaits.jpg",
      alt: "Layered dessert parfaits by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: true,
  },
  {
    slug: "biscoff-parfait",
    name: "Biscoff Parfait",
    category: "parfaits",
    shortDescription:
      "Creamy layers with spiced Biscoff cookie crumble — warm, caramelized, and irresistible.",
    image: {
      src: "/images/parfait-biscoff.jpg",
      alt: "Biscoff parfait by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "cookies-and-cream-parfait",
    name: "Cookies & Cream Parfait",
    category: "parfaits",
    shortDescription:
      "A classic favorite — chocolate cookie pieces layered with sweet, fluffy cream.",
    image: {
      src: "/images/parfait-cookies-and-cream.jpg",
      alt: "Cookies and cream parfait by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "smores-parfait",
    name: "S'mores Parfait",
    category: "parfaits",
    shortDescription:
      "Campfire nostalgia in a cup — graham, chocolate, and marshmallow layered to perfection.",
    image: {
      src: "/images/parfait-smores.jpg",
      alt: "S'mores parfait by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    category: "cookies",
    shortDescription:
      "The timeless classic, baked from scratch with plenty of chocolate in every bite.",
    image: {
      src: "/images/cookies-chocolate-chip.jpg",
      alt: "Chocolate chip cookies by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "cinnamon-glazed-cookies",
    name: "Cinnamon Glazed Cookies",
    category: "cookies",
    shortDescription:
      "Cinnamon-chip cookies finished with a sweet vanilla glaze drizzle.",
    image: {
      src: "/images/cookies-cinnamon-glazed.jpg",
      alt: "Glazed cinnamon cookies cooling on a wire rack",
      isPlaceholder: true,
    },
    isTopSeller: false,
  },
  {
    slug: "white-chocolate-macadamia-cookies",
    name: "White Chocolate Macadamia Cookies",
    category: "cookies",
    shortDescription:
      "Buttery cookies loaded with white chocolate and macadamia nuts — a Hawaii favorite.",
    image: {
      src: "/images/cookies-white-chocolate-macadamia.jpg",
      alt: "White chocolate macadamia cookies by Lala's Sweets",
      isPlaceholder: true,
    },
    gallery: [
      {
        src: "/images/cookie-white-chocolate-macadamia-single.jpg",
        alt: "Close-up of a single white chocolate macadamia cookie",
        isPlaceholder: true,
      },
    ],
    isTopSeller: false,
    badge: "Island Favorite",
  },
  {
    slug: "fruity-pebbles-cookies",
    name: "Fruity Pebbles Cookies",
    category: "cookies",
    shortDescription:
      "Colorful, crunchy, and fun — soft cookies packed with Fruity Pebbles cereal.",
    image: {
      src: "/images/cookie-fruity-pebbles.jpg",
      alt: "Fruity Pebbles cookies by Lala's Sweets",
      isPlaceholder: true,
    },
    isTopSeller: false,
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
      "Dessert spreads for parties, church gatherings, showers, and office events — homemade and beautifully presented.",
  },
  {
    slug: "direct-to-consumer",
    name: "Direct-to-Consumer",
    shortDescription:
      "Order your favorites directly from Lala's Sweets for gifting, celebrations, or just because.",
  },
  {
    slug: "events-pop-ups",
    name: "Events & Pop-Ups",
    shortDescription: `Find Lala's Sweets at local pop-ups and community events around ${SITE.address.island}.`,
    image: {
      src: "/images/pop-up-event.jpg",
      alt: "Lala's Sweets pop-up event table",
      isPlaceholder: true,
    },
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
  eyebrow: `Homemade in ${SITE.location}`,
  heading: "Homemade sweets,",
  headingAccent: "baked with love.",
  paragraph: `Small-batch cookie cups, parfaits, and bagel crisps made by hand right here in ${SITE.location} — ${SITE.mission.charAt(0).toLowerCase()}${SITE.mission.slice(1)}`,
  primaryCta: { label: "Explore Menu", href: "/menu" },
  secondaryCta: { label: "Inquire for Catering", href: "/catering" },
  image: {
    src: "/images/parfaits.jpg",
    alt: "A strawberry parfait in a Lala's Sweets branded cup",
    isPlaceholder: true,
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
  eyebrow: "Customer Favorites",
  heading: "Our Top Sellers",
  paragraph:
    "The treats our customers come back for again and again — perfect for gifting, sharing, or keeping all to yourself.",
  viewAllCta: { label: "View the Full Menu", href: "/menu" },
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
  eyebrow: "Our Story",
  heading: "More than sweets — a little love in every bite.",
  paragraphs: [
    `Lala's Sweets started with a simple passion for baking and a heart for people. Every treat is homemade in small batches in ${SITE.address.locality}, using recipes made to share with family, friends, and neighbors across ${SITE.address.island}.`,
    `Our mission is simple: ${SITE.mission} Whether it's a celebration, a church gathering, or a sweet pick-me-up, each order is made with care — and ${SITE.tagline.charAt(0).toLowerCase()}${SITE.tagline.slice(1)}.`,
  ],
  pillars: [
    {
      title: "Homemade",
      description: "Baked by hand in small batches — never mass-produced.",
    },
    {
      title: "Local",
      description: `Proudly made in ${SITE.address.locality} for our ${SITE.address.island} community.`,
    },
    {
      title: "Made with Love",
      description: "Every order is a chance to share joy and faith.",
    },
  ],
  image: {
    src: "/images/cookies-cinnamon-glazed.jpg",
    alt: "Freshly glazed homemade cookies cooling on a wire rack",
    isPlaceholder: true,
  },
  channelsEyebrow: "Ways to Enjoy",
  channelsHeading: "However you celebrate, we'll be there.",
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
    eyebrow: "The Menu",
    heading: "Something sweet",
    headingAccent: "for every occasion.",
    paragraph: `Everything is homemade in small batches in ${SITE.location} and made to order. Browse our favorites below, then send an inquiry for pricing and availability.`,
  },
  categoryNavLabel: "Menu categories",
  // Display order of the catalog sections and category tabs.
  categories: [
    {
      id: "snacks",
      label: PRODUCT_CATEGORIES.snacks,
      description: "Crunchy, snackable, and impossible to stop eating.",
    },
    {
      id: "cookie-cups",
      label: PRODUCT_CATEGORIES["cookie-cups"],
      description: "Soft-baked cookie cups filled with creamy cheesecake.",
    },
    {
      id: "parfaits",
      label: PRODUCT_CATEGORIES.parfaits,
      description: "Layered, creamy, and made to order in a variety of flavors.",
    },
    {
      id: "cookies",
      label: PRODUCT_CATEGORIES.cookies,
      description: "Classic and creative cookies, baked from scratch.",
    },
  ],
  allergenNotice:
    "Allergen notice: our treats are made in a home kitchen that also handles common allergens, including wheat, dairy, eggs, and tree nuts (such as macadamia nuts). Please ask about ingredients before ordering.",
  ctaBand: {
    heading: "Ready to treat yourself — or a crowd?",
    paragraph:
      "Send us a quick inquiry with what you'd like and when you need it, and we'll get back to you with pricing and availability.",
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
    paragraph: `From birthday parties and baby showers to church gatherings and office events, Lala's Sweets brings a homemade dessert spread your guests will remember — made with love in ${SITE.location}.`,
    primaryCta: { label: "Request a Catering Quote", href: cateringInquiryHref() },
  },
  packages: {
    eyebrow: "Catering Options",
    heading: "Choose your sweet spread",
    paragraph:
      "Every order is customized to your event, guest count, and favorite treats. Tell us what you're planning and we'll put together a quote.",
    idealForLabel: "Ideal for",
    quoteLabel: "Custom quote",
    ctaLabel: "Request a Quote",
    items: [
      {
        slug: "dessert-table",
        name: "Dessert Table",
        description:
          "A curated spread of our most-loved treats — cookie cups, parfaits, cookies, and bagel crisps — to be the sweet centerpiece of your event.",
        idealFor: "Birthdays, showers, graduations & weddings",
        highlights: [
          "Mix and match from the full menu",
          "Sized to your guest count",
          "Flavors chosen to match your event",
        ],
        image: {
          src: "/images/parfait-cookies-and-cream.jpg",
          alt: "Cookies and cream parfaits ready for a dessert table",
          isPlaceholder: true,
        },
      },
      {
        slug: "party-trays",
        name: "Party & Office Trays",
        description:
          "Generous trays of fresh-baked cookies and cookie cups that are easy to set out and easy to share.",
        idealFor: "Office meetings, church gatherings & potlucks",
        highlights: [
          "Crowd-pleasing classics",
          "Simple to serve and share",
          "Great for recurring events",
        ],
        image: {
          src: "/images/cookies-chocolate-chip.jpg",
          alt: "A batch of homemade chocolate chip cookies",
          isPlaceholder: true,
        },
      },
      {
        slug: "favors-gift-packs",
        name: "Favors & Gift Packs",
        description:
          "Individually packaged treats sealed with the Lala's Sweets label — a thoughtful thank-you guests can take home.",
        idealFor: "Wedding & shower favors, client and staff gifts",
        highlights: [
          "Individually packaged",
          "Branded Lala's Sweets labels",
          "Perfect for gifting in bulk",
        ],
        image: {
          src: "/images/cookie-cups-packaged.jpg",
          alt: "Cookie cups packaged in a clear box with the Lala's Sweets label",
          isPlaceholder: true,
        },
      },
    ],
  },
  popUps: {
    eyebrow: "Events & Pop-Ups",
    heading: "Bring Lala's Sweets to your next event",
    paragraphs: [
      `Hosting a market, fundraiser, church event, or community gathering on ${SITE.address.island}? Lala's Sweets pop-ups bring a table of homemade treats right to your guests.`,
      "Want to find us at an upcoming pop-up? Follow along on Instagram for dates, locations, and new flavors.",
    ],
    bookCta: { label: "Book a Pop-Up", href: POP_UP_INQUIRY_HREF },
    instagramLabel: `Follow ${SITE.instagram.handle}`,
  },
  process: {
    eyebrow: "How It Works",
    heading: "Booking is as easy as 1-2-3",
    steps: [
      {
        title: "Reach out",
        description:
          "Send an inquiry or give us a call with your event date, guest count, and the treats you love.",
      },
      {
        title: "Customize",
        description:
          "We'll help you build the perfect menu and confirm your quote, pickup details, and timing.",
      },
      {
        title: "Celebrate",
        description:
          "Your sweets are made fresh for your event — all that's left is to enjoy them with your guests.",
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
        answer: `Lala's Sweets is a homemade bakery based in ${SITE.address.locality}, on the island of ${SITE.address.island}, ${SITE.address.regionName}. Every order is baked to order, and pickup details are confirmed when you order.`,
      },
      {
        question: "How do I place an order?",
        answer: `Send an inquiry through our contact form, call or text ${SITE.phone}, email ${SITE.email}, or message us on Instagram at ${SITE.instagram.handle}. Your order is confirmed once we've agreed on the details together.`,
      },
      {
        question: "Do you cater events?",
        answer: `Yes. Lala's Sweets caters birthdays, baby and bridal showers, weddings, graduations, church gatherings, and office events on ${SITE.address.island} with dessert tables, party and office trays, and individually packaged favors. Every catering order is a custom quote.`,
      },
      {
        question: "Can Lala's Sweets do a pop-up at my event?",
        answer:
          "Yes. We bring pop-up tables of homemade treats to markets, fundraisers, church events, and community gatherings. Send a pop-up inquiry with your event date and details.",
      },
      {
        question: "What are your most popular treats?",
        answer:
          "Our top sellers are Cinnamon Bagel Crisps, Cheesecake Cookie Cups, and layered dessert Parfaits. We also make Biscoff, Cookies & Cream, and S'mores parfaits and a rotating lineup of homemade cookies.",
      },
      {
        question: "How far in advance should I order?",
        answer:
          "As early as you can — popular dates fill up quickly. Reach out with your date and we'll confirm availability right away.",
      },
      {
        question: "Do your treats contain allergens?",
        answer:
          "Our treats are made in a home kitchen that also handles wheat, dairy, eggs, and tree nuts (including macadamia nuts), so we can't guarantee any item is allergen-free. Please tell us about allergies and ask about ingredients before ordering.",
      },
    ],
  },
  ctaBand: {
    heading: "Let's make your event a little sweeter.",
    paragraph:
      "Popular dates fill up quickly — reach out early so we can save your spot.",
    primaryCta: { label: "Request a Catering Quote", href: cateringInquiryHref() },
    showPhone: true,
  },
};

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export interface AboutPageContent {
  hero: PageHeroContent;
  ctaBand: CtaBandContent;
}

export const ABOUT_PAGE_CONTENT: AboutPageContent = {
  hero: {
    eyebrow: `About Lala's Sweets · ${SITE.address.locality}`,
    heading: "Baked with love,",
    headingAccent: "shared with joy.",
    paragraph: SITE.mission,
  },
  ctaBand: {
    heading: "Let's share something sweet together.",
    paragraph:
      "Whether it's a single treat or a full dessert table, we'd love to be part of your celebration.",
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
    eyebrow: "Contact",
    heading: "Let's make something",
    headingAccent: "sweet together.",
    paragraph: `Ready to order, planning an event on ${SITE.address.island}, or just have a question? Send us a message below or reach out directly — we'd love to hear from you.`,
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
      description: "Great for catering details and event planning.",
      external: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: SITE.instagram.handle,
      href: SITE.instagram.url,
      description: "Follow for new flavors and pop-up dates.",
      external: true,
    },
  ],
  form: {
    heading: "Send an inquiry",
    description:
      "Tell us a little about what you're looking for and we'll get back to you with pricing and availability.",
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
          "Share the details — quantities, guest count, flavors, pickup timing, or any questions.",
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
        "We've received your message and will get back to you as soon as we can.",
      resetLabel: "Send another inquiry",
    },
    error: {
      heading: "Something went wrong.",
      description: `Your message couldn't be sent. Please try again, or reach us directly at ${SITE.phone} or ${SITE.email}.`,
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
    "Homemade cheesecake cookie cups, parfaits, cinnamon bagel crisps & cookies from Wahiawa, Oahu. Custom orders, dessert catering & pop-ups. Call (808) 375-8713.",
  og: {
    eyebrow: `Homemade in ${SITE.location}`,
    headline: "Cookie cups, parfaits & homemade sweets",
    alt: `${SITE.name} — homemade bakery in ${SITE.location}`,
  },
};

export const MENU_SEO: PageSeo = {
  path: "/menu",
  title: "Wahiawa Bakery Menu: Cookie Cups & Parfaits",
  description:
    "Browse the full Lala's Sweets menu: cheesecake cookie cups, gift packs, Biscoff & s'mores parfaits, cinnamon bagel crisps, and homemade cookies in Wahiawa, Oahu.",
  og: {
    eyebrow: "The Menu",
    headline: "Cookie cups, parfaits, bagel crisps & cookies",
    alt: `The ${SITE.name} menu — homemade desserts in ${SITE.location}`,
  },
};

export const CATERING_SEO: PageSeo = {
  path: "/catering",
  title: "Dessert Catering & Pop-Ups on Oahu",
  description:
    "Homemade dessert catering on Oahu from Lala's Sweets in Wahiawa: dessert tables, party & office trays, wedding favors, and pop-ups. Request a custom quote.",
  og: {
    eyebrow: `Catering on ${SITE.address.island}`,
    headline: "Dessert tables, party trays, favors & pop-ups",
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
    headline: "Let's make something sweet together",
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
