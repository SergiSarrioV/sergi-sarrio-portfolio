/* ────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT  ·  Edit everything here. No need to touch the components.
 * ──────────────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Sergi Sarrió",
  // Headline role, shown in the page title and hero.
  role: "Full-Stack Developer",
  // Rotating titles shown with a typewriter effect under your name.
  roles: [
    "Full-Stack Developer",
    "React & Next.js Engineer",
    "Python · FastAPI · Supabase",
    "I ship products end-to-end",
  ],
  // Short punchy tagline (SEO description + social card).
  tagline: "I build full-stack products end to end — web, mobile, and the systems behind them.",
  /**
   * Hero headline, animated word by word. Wrap the part you want in bold with
   * **double asterisks**.
   */
  headline:
    "Full-stack developer and designer building **web, mobile and the systems behind them** — end to end.",
  // Large first line of the About section.
  aboutLede:
    "I turn ideas into shipped products — from the Figma file to the database, and everything in between.",
  // Photo for the About card. Drop a file in /public and set the path; "" shows a placeholder.
  portrait: "",
  // 2–4 sentence bio for the About section.
  bio: [
    "I'm a full-stack developer who enjoys turning ideas into shipped products. I work across the whole stack: React & Next.js on the web, React Native on mobile, and Python (FastAPI) services backed by PostgreSQL.",
    "I care about clean architecture, real-world reliability (offline-first, payments, auth), and building things that people actually use. Recently I've been designing and building a multi-app marketplace platform from scratch.",
    "I'm currently open to new opportunities — remote or on-site.",
  ],
  // Your city / country (or "Remote").
  location: "Norway",
  // Path to the CV PDF in /public.
  resumeUrl: "/cv.pdf",
  availableForWork: true,
};

// Canonical production URL — used for metadata, sitemap, robots and OG tags.
// Change this to your real custom domain when you have one.
export const siteUrl = "https://sergi-sarrio-portfolio.vercel.app";

export const social = {
  email: "sarriovsergi@gmail.com",
  github: "https://github.com/SergiSarrioV",
  linkedin: "https://www.linkedin.com/in/sergisarrioweb/",
  twitter: "", // optional
};

/**
 * Skills grouped by category. `logo` is a file in /public/logos (devicon SVGs);
 * omit it and the skill renders as a plain text chip.
 */
export type Skill = { name: string; logo?: string };

export const skills: { category: string; items: Skill[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "JavaScript", logo: "/logos/javascript.svg" },
      { name: "Python", logo: "/logos/python.svg" },
      { name: "SQL" },
      { name: "Swift", logo: "/logos/swift.svg" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", logo: "/logos/react.svg" },
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
      { name: "HTML", logo: "/logos/html5.svg" },
      { name: "CSS / SCSS", logo: "/logos/css3.svg" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "React Native", logo: "/logos/react.svg" },
      { name: "Expo", logo: "/logos/expo.svg" },
      { name: "Ionic", logo: "/logos/ionic.svg" },
      { name: "SQLite", logo: "/logos/sqlite.svg" },
      { name: "StoreKit · Apple Wallet" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "FastAPI", logo: "/logos/fastapi.svg" },
      { name: "Node.js", logo: "/logos/nodejs.svg" },
      { name: "Express", logo: "/logos/express.svg" },
      { name: "Socket.IO", logo: "/logos/socketio.svg" },
      { name: "RabbitMQ", logo: "/logos/rabbitmq.svg" },
      { name: "Stripe Connect" },
    ],
  },
  {
    category: "Data & Infra",
    items: [
      { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
      { name: "Supabase", logo: "/logos/supabase.svg" },
      { name: "MongoDB", logo: "/logos/mongodb.svg" },
      { name: "Vercel", logo: "/logos/vercel.svg" },
      { name: "Electron", logo: "/logos/electron.svg" },
    ],
  },
  {
    category: "Design",
    items: [
      { name: "Figma", logo: "/logos/figma.svg" },
      { name: "Illustrator", logo: "/logos/illustrator.svg" },
      { name: "Photoshop", logo: "/logos/photoshop.svg" },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git", logo: "/logos/git.svg" },
      { name: "pnpm", logo: "/logos/pnpm.svg" },
      { name: "Turborepo" },
      { name: "Vitest", logo: "/logos/vitest.svg" },
      { name: "Selenium", logo: "/logos/selenium.svg" },
      { name: "Claude Code" },
    ],
  },
];

/* Work experience, newest first. Highlights support **bold**.
 * TODO: `place` for AYESA / NTT DATA / IXIA REGAL is a guess — not on the CV. */
export type Job = {
  slug: string;
  company: string;
  role: string;
  period: string;
  /** Short year shown in the sticky index. */
  year: string;
  place: string;
  lede: string;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    slug: "flamsbana",
    company: "Flåmsbana",
    role: "Tourist Guide",
    period: "May 2025 – present",
    year: "2025",
    place: "Flåm, Norway · summer season",
    lede: "Welcoming passengers aboard one of the world's most famous train rides.",
    highlights: [
      "Assisting and guiding passengers boarding the **Flåmsbana** train in a high-volume tourism environment.",
      "Creating a friendly experience for guests from **diverse cultural backgrounds**.",
      "Organising and coordinating groups to keep boarding and tours flowing smoothly.",
    ],
    stack: ["Communication", "Customer service", "Team collaboration"],
  },
  {
    slug: "ayesa",
    company: "AYESA",
    role: "UX/UI Designer",
    period: "Feb – Nov 2024",
    year: "2024",
    place: "Spain",
    lede: "Designed the full UX of a school management app, mobile and web.",
    highlights: [
      "Designed the **complete UX** for a school management app (mobile + web) in Figma.",
      "Built a **reusable component library** in Figma for hand-off to front-end developers.",
      "Presented interactive prototypes and design rationale **directly to clients**.",
    ],
    stack: ["Figma", "UX Design", "Wireframing", "Prototyping", "Component library"],
  },
  {
    slug: "ntt-data",
    company: "NTT DATA",
    role: "Software Developer",
    period: "Dec 2020 – Dec 2023",
    year: "2020–23",
    place: "Spain",
    lede: "Three years building automation and apps for large insurance clients.",
    highlights: [
      "Automated Mapfre's manual workflows with Node-RED and Selenium, **saving 1,000+ hours**.",
      "Extracted data from frame-nested pages and loaded it via **bulk SQL inserts**.",
      "Built the **Santa Lucía insurance app**: Ionic, MongoDB, third-party API integration and JWT auth.",
      "Developed a React.js website tracking application.",
    ],
    stack: ["Node-RED", "Selenium", "React Native", "Ionic", "Node.js", "MongoDB", "SQL"],
  },
  {
    slug: "ixia-regal",
    company: "IXIA REGAL",
    role: "Graphic Designer",
    period: "Sep 2018 – Sep 2019",
    year: "2018",
    place: "Alcoy, Spain",
    lede: "Where the design side started: marketing visuals and landing pages.",
    highlights: [
      "Designed product images, marketing visuals and **landing pages** for social media campaigns.",
      "Edited and retouched photos for e-commerce and promotional use.",
      "Built and updated static **HTML/CSS** content for the company website.",
    ],
    stack: ["Photoshop", "Illustrator", "HTML", "CSS", "Marketing"],
  },
];

/* Education and spoken languages — shown in the "rest of it" cards. */
export const education: { title: string; detail: string; period: string }[] = [
  {
    title: "Multiplatform App Development (CFGS DAM)",
    detail: "IES Mare Nostrum",
    period: "2023 – 2026",
  },
  {
    title: "Graphic Design and Marketing",
    detail: "EASDA — School of Arts and Design",
    period: "2015 – 2018",
  },
  {
    title: "Advertising Photography and Videography",
    detail: "Veles e Vents",
    period: "2012 – 2014",
  },
];

// TODO: levels are a guess (the CV only lists the languages) — adjust.
export const languages: { name: string; level: string }[] = [
  { name: "Spanish", level: "Native" },
  { name: "Catalan", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Norwegian", level: "Learning" },
];

export type ProjectImage = {
  /**
   * Path under /public, e.g. "/projects/flam-mobile.webp".
   */
  src: string;
  /** Describes the image (alt text, also used as the SVG's accessible name). */
  alt: string;
  /** Optional caption shown under the image. */
  caption?: string;
};

/** Where a visitor can try, download or read about the project. */
export type ProjectLink = {
  /** Picks the icon and the default label. */
  kind: "appstore" | "playstore" | "testflight" | "live" | "repo" | "docs" | "figma";
  /** Leave "" while the link doesn't exist yet — pair it with `pending: true`. */
  url: string;
  /** Overrides the default label. */
  label?: string;
  /**
   * Shows a non-clickable "soon" chip instead of hiding the link. Use it to
   * signal an intended release; a link with no url and no `pending` disappears.
   */
  pending?: boolean;
};

export type Project = {
  /** URL slug — the detail page lives at /projects/<slug>. Lowercase, no spaces. */
  slug: string;
  title: string;
  /** Short one-liner shown under the title. */
  blurb: string;
  /** Longer description — 1–3 sentences (shown on the card). */
  description: string;
  /** Deep-dive paragraphs shown on the project's own page. */
  overview: string[];
  /** Key technical points / what you built. Bullet points. */
  highlights: string[];
  /** Short tags shown on the card. */
  tags: string[];
  /** Full list of tools / technologies used — shown on the detail page. */
  tools: string[];
  /** Screenshots for the detail page (the first one is used as the cover). */
  images?: ProjectImage[];
  /** Optional meta shown on the detail page. */
  year?: string;
  role?: string;
  /** Try / download / source links. The first one is styled as the main action. */
  links?: ProjectLink[];
  /** Mark your best project to feature it larger. */
  featured?: boolean;
  /** Status badge, e.g. "In development", "Live", "Personal project". */
  status?: string;
  /** Keeps the project out of the homepage grid (and the carousel) without deleting it. */
  hidden?: boolean;
  /** Screens are portrait phone screenshots (the only layout currently rendered). */
  imageLayout?: "phone";
  /** Replaces the plain-text h1 title with this image (e.g. a transparent logo PNG). */
  logoImage?: ProjectImage;
  /** Branding assets shown in a dedicated visual section above the screens carousel. */
  brandImages?: ProjectImage[];
};

/** Find a project by its slug (used by the detail pages). */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projects: Project[] = [
  {
    slug: "iwalkie",
    title: "iWalkie",
    blurb: "UI/UX design concept for a safety-first walkie-talkie app.",
    description:
      "A complete design concept — brand identity plus full UX wireframes — for a walkie-talkie iOS app built around real-time group communication and safety. From the PTT home screen to colour-coded emergency alerts, every screen was designed in Figma.",
    overview: [
      "iWalkie reimagines the walkie-talkie for smartphones, with a focus on real-time group communication and safety. The core interaction is a large push-to-talk button that live-streams your voice to a group — but the app goes further: incoming audio is transcribed to text in the chat view, so nothing gets lost when you can't listen.",
      "The safety layer is what makes it distinct. Any member of a group can trigger a location share or an SOS alert, which surfaces in a colour-coded notification centre (blue for location, yellow for alert, red for SOS) and requires an explicit confirmation from recipients — closing the loop so you know the alert was seen.",
      "The project covers two Figma deliverables: a brand identity (logo, dark colour palette with violet accents, typography and icon set) and a full set of UX wireframes mapping every screen and interaction flow.",
    ],
    highlights: [
      "Designed the complete brand identity: logo, dark colour system with violet accents, typography scale, and iconography.",
      "Wireframed the full PTT flow — idle home screen, active call with live audio waveform, and speaker identification.",
      "Designed the chat view with real-time voice-to-text transcription and multi-modal media toolbar.",
      "Created a group safety alert system: location share, alert, and SOS — each requiring recipient confirmation and surfaced in a colour-coded notification centre.",
      "Built a reusable Figma component library to keep all screens pixel-consistent.",
    ],
    tags: ["Figma", "UI/UX Design", "Branding", "iOS", "Safety"],
    tools: ["Figma"],
    imageLayout: "phone",
    logoImage: {
      src: "/projects/iwalkie-logo.webp",
      alt: "iWalkie",
    },
    brandImages: [
      {
        src: "/projects/iwalkie-splash.webp",
        alt: "iWalkie 3D perspective hero — active PTT call in progress",
        caption: "Brand hero",
      },
    ],
    images: [
      {
        src: "/projects/iwalkie-brand-hero.webp",
        alt: "iWalkie splash screen with the logo centred on a dark background",
        caption: "Splash — the brand in one frame",
      },
      {
        src: "/projects/iwalkie-home.webp",
        alt: "iWalkie home screen with the push-to-talk button and contact sidebar",
        caption: "Home — push-to-talk, always one tap away",
      },
      {
        src: "/projects/iwalkie-active-call.webp",
        alt: "iWalkie active PTT call with live audio waveform and speaker name",
        caption: "Active call — live waveform, speaker identified",
      },
      {
        src: "/projects/iwalkie-chat.webp",
        alt: "Chat view showing real-time voice-to-text transcription of a message",
        caption: "Chat — voice messages transcribed in real time",
      },
      {
        src: "/projects/iwalkie-group-alert.webp",
        alt: "Group channel with a location alert awaiting confirmation from recipients",
        caption: "Group alert — location shared, waiting for reads",
      },
      {
        src: "/projects/iwalkie-notifications.webp",
        alt: "Notification centre with colour-coded safety alerts: blue location, yellow alert, red SOS",
        caption: "Notifications — colour-coded by urgency",
      },
    ],
    year: "2025",
    role: "Designer — branding and UX",
    links: [
      {
        kind: "figma",
        url: "https://www.figma.com/proto/Vrwtz6Z0HxJSGRm3PJm3cr/iWalkie?node-id=203-20676&viewport=697%2C1375%2C0.26&t=WoPlkolSKtH5NK0V-1&scaling=min-zoom&content-scaling=fixed&page-id=203%3A20675",
        label: "Branding",
      },
      {
        kind: "figma",
        url: "https://www.figma.com/proto/Vrwtz6Z0HxJSGRm3PJm3cr/iWalkie?node-id=143-15&viewport=845%2C-156%2C0.05&t=hPdjENhXjNUK1LVJ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=143%3A15&page-id=0%3A1",
        label: "Wireframe",
      },
    ],
    status: "Completed",
  },
  {
    slug: "flam-tourist-card",
    title: "FLÅM Tourist Card",
    blurb: "A full-stack marketplace platform for tourism in Flåm, Norway.",
    description:
      "A digital tourist card that lets travellers plan a stay, book bundled experiences, and carry a pass in their phone's Wallet. Built as a monorepo spanning four apps and a Python backend, with marketplace payments that split revenue across local businesses.",
    overview: [
      "FLÅM Tourist Card (FTC) is a digital tourist card for Flåm, Norway. Travellers plan their stay, book bundled local experiences, and carry a pass in their phone's Wallet — unifying multiple independent businesses into a single purchase.",
      "I designed and built the whole platform as a pnpm + Turborepo monorepo: a React Native (Expo) mobile app, a Next.js web app, an Electron desktop dashboard for internal operations, and a dedicated partner app — all sharing typed packages and talking to a single FastAPI backend.",
      "The hardest parts were the money and the offline guarantees. A single checkout has to split revenue across several providers (Stripe Connect — separate charges & transfers) while keeping a platform margin, and the Wallet pass has to validate at the gate even with no signal, so the QR is HMAC-signed and verified locally.",
    ],
    highlights: [
      "Designed the whole architecture: pnpm + Turborepo monorepo with 4 apps (mobile, web, desktop dashboard, partner app) sharing packages.",
      "Built a FastAPI + PostgreSQL (Supabase) backend with async SQLAlchemy and Supabase Realtime for live availability.",
      "Implemented Stripe Connect marketplace payments (separate charges & transfers) to split a single purchase across multiple providers plus platform margin.",
      "Shipped offline-first Apple/Google Wallet passes (.pkpass) with HMAC-signed QR codes that validate without a connection.",
      "Multi-language from day one (Norwegian, English, Spanish, German) via i18next.",
    ],
    tags: ["Next.js", "React Native", "FastAPI", "PostgreSQL", "Stripe Connect", "Electron"],
    tools: [
      "Next.js",
      "React",
      "React Native (Expo)",
      "Electron",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "Stripe Connect",
      "i18next",
      "Turborepo",
      "pnpm",
    ],
    // Real mobile screens rendered in the phone carousel (see `imageLayout`).
    imageLayout: "phone",
    images: [
      {
        src: "/projects/ftc-home.webp",
        alt: "FTC home screen — a Discover Flåm hero over a fjord photo with a plan-your-trip date picker",
        caption: "Home — discover Flåm and plan your dates",
      },
      {
        src: "/projects/ftc-explore.webp",
        alt: "Explore screen listing bundled experience packs with filters for hotels, activities and dining",
        caption: "Explore — browse bundled experience packs",
      },
      {
        src: "/projects/ftc-pack-weekend.webp",
        alt: "Weekend Retreat pack detail breaking down each included experience and the total per person",
        caption: "Pack detail — every experience bundled into one price",
      },
      {
        src: "/projects/ftc-pack-extreme.webp",
        alt: "Extreme Adventure pack detail with its own set of activities and pricing",
        caption: "Another pack — Extreme Adventure",
      },
      {
        src: "/projects/ftc-cart.webp",
        alt: "Cart screen showing a confirmed, paid order with the total and an invoice download",
        caption: "Checkout — one payment, split across providers behind the scenes",
      },
      {
        src: "/projects/ftc-pass.webp",
        alt: "My Pass screen with the active FLÅM Tourist Card, an HMAC-signed QR that works offline, and Add to Apple Wallet",
        caption: "My Pass — the offline-first QR, add it to Apple Wallet",
      },
      {
        src: "/projects/ftc-my-trip.webp",
        alt: "My Trip itinerary with a per-day timeline of accommodation, transport and activities to schedule",
        caption: "My Trip — a per-day itinerary built from your pack",
      },
      {
        src: "/projects/ftc-notifications.webp",
        alt: "Notifications screen listing trip and booking updates",
        caption: "Notifications — trip and booking updates",
      },
      {
        src: "/projects/ftc-account.webp",
        alt: "Account screen with profile, language and settings",
        caption: "Account — profile, language and settings",
      },
      {
        src: "/projects/ftc-register.webp",
        alt: "Create account screen for registering to save a trip and get the pass",
        caption: "Register — save a trip and claim your pass",
      },
    ],
    year: "2025–2026",
    role: "Solo full-stack developer",
    // TODO: paste the real URLs here and drop `pending` — the chip becomes a
    // working button. Delete any line you don't plan to ship.
    links: [
      { kind: "live", url: "", label: "Try the web app", pending: true },
      { kind: "appstore", url: "", pending: true },
      { kind: "playstore", url: "", pending: true },
    ],
    featured: true,
    status: "In development",
  },
  {
    slug: "cooper",
    title: "COOPER",
    blurb: "An offline-first personal finance app for iOS.",
    description:
      "A paid iOS app that turns the classic budget spreadsheet into something you actually keep using: log income and expenses, compare them against a monthly budget, and follow a savings hierarchy that tells you where the next euro should go. No accounts, no backend — every number lives on the device.",
    overview: [
      "COOPER is a one-time-purchase personal finance app for iOS, built with Expo SDK 57 and expo-router. It grew out of a spreadsheet workflow: a movements ledger, a monthly budget per category, and a dashboard that compares planned vs. real — plus a savings-hierarchy methodology that guides the user to their next financial step (emergency fund, debts, goals, investing).",
      "The design constraint I set was no backend. All data is stored on-device in SQLite behind a repository layer, which keeps the app fully usable offline and sidesteps holding anyone's financial data on a server. Backups are export/import files the user owns.",
      "Architecturally it's a strict layered app with import rules that only flow downward: thin routes → feature slices → shared design system → persistence → a pure-TypeScript domain core. That core (finance engine, savings hierarchy, FX, debts, goals) has no React or Expo imports at all, so the money logic is unit-tested with Vitest in plain Node — fast, and independent of the UI.",
    ],
    highlights: [
      "Designed a layered architecture with enforced import rules and a pure-TypeScript domain core (finance engine, savings hierarchy, debts, goals, FX) that is unit-tested with Vitest — no React in the tests.",
      "Offline-first persistence: on-device SQLite behind a repository layer, with backup export/import and no backend or user accounts at all.",
      "All money handled as integer cents end to end, formatted to currency only at the UI edge — no float arithmetic anywhere.",
      "Built a native iOS home-screen widget in Swift (WidgetKit) via Apple targets, sharing state with the React Native app.",
      "Shipped the paid-app plumbing: one-time purchase paywall with expo-iap and an entitlement store, biometric lock, and local notifications for month-close reminders.",
      "Localised into 6 languages (ES, EN, DE, IT, NO, PT) with enforced key parity, plus full light/dark theming from design tokens.",
      "Wrote a scaffolding generator and a QA gate (typecheck + lint + Vitest + component tests) so new features start compliant with the architecture.",
    ],
    tags: ["React Native", "Expo", "TypeScript", "SQLite", "Swift / WidgetKit", "Offline-first"],
    tools: [
      "React Native",
      "Expo (SDK 57)",
      "expo-router",
      "TypeScript",
      "SQLite (expo-sqlite)",
      "Reanimated",
      "i18next",
      "expo-iap",
      "Swift / WidgetKit",
      "Vitest",
      "Jest + RN Testing Library",
      "EAS Build",
    ],
    imageLayout: "phone",
    images: [
      {
        src: "/projects/cooper-dashboard.webp",
        alt: "COOPER dashboard showing the monthly balance and budget vs. real by category",
        caption: "Dashboard — budget vs. real, by category",
      },
      {
        src: "/projects/cooper-budgets.webp",
        alt: "Automatic budgets screen splitting salary with the 50/30/20 rule",
        caption: "Automatic budgets — 50/30/20, reshaped every month from real spending",
      },
      {
        src: "/projects/cooper-registro.webp",
        alt: "Movements ledger listing income and expenses for the month",
        caption: "Registro — logging income and expenses",
      },
      {
        src: "/projects/cooper-hierarchy.webp",
        alt: "Savings hierarchy screen with five levels and the current one in progress",
        caption: "Savings hierarchy — what to fund next",
      },
    ],
    year: "2026",
    role: "Solo developer — product, architecture and design",
    links: [
      { kind: "live", url: "https://d0dba889.cooper-78o.pages.dev/", label: "Landing page" },
      { kind: "appstore", url: "", pending: true },
      { kind: "testflight", url: "", pending: true },
    ],
    status: "Completed",
  },
];
