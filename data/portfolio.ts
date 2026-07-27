import type { MockupKind } from "@/components/ProjectMockup";

/* ────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT  ·  Edit everything here. No need to touch the components.
 *
 *  👉 Fields marked  // TODO  are placeholders — replace them with your real
 *     info before sharing the URL on your CV.
 * ──────────────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Sergi Sarrió",
  // TODO: your headline role — e.g. "Full-Stack Engineer", "Product Engineer".
  role: "Full-Stack Developer",
  // Rotating titles shown with a typewriter effect under your name.
  // TODO: tweak these to match how you want to present yourself.
  roles: [
    "Full-Stack Developer",
    "React & Next.js Engineer",
    "Python · FastAPI · Supabase",
    "I ship products end-to-end",
  ],
  // Short punchy tagline shown in the hero.
  tagline: "I build full-stack products end to end — web, mobile, and the systems behind them.",
  // 2–4 sentence bio for the About section.
  // TODO: make this yours — what you do, how you work, what you're after.
  bio: [
    "I'm a full-stack developer who enjoys turning ideas into shipped products. I work across the whole stack: React & Next.js on the web, React Native on mobile, and Python (FastAPI) services backed by PostgreSQL.",
    "I care about clean architecture, real-world reliability (offline-first, payments, auth), and building things that people actually use. Recently I've been designing and building a multi-app marketplace platform from scratch.",
    "I'm currently open to new opportunities — remote or on-site.",
  ],
  // TODO: your city / country (or "Remote").
  location: "Norway",
  // TODO: set to true once you have a CV PDF in /public/cv.pdf
  resumeUrl: "/cv.pdf",
  availableForWork: true,
};

export const social = {
  email: "sarriovsergi@gmail.com",
  // TODO: replace with your real profile URLs (leave "" to hide the link).
  github: "https://github.com/", // TODO: e.g. https://github.com/sergisarrio
  linkedin: "https://linkedin.com/in/", // TODO: e.g. https://linkedin.com/in/sergisarrio
  twitter: "", // optional
};

/* Skills grouped by category. Add/remove freely. */
export const skills: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Native (Expo)", "Tailwind CSS", "Zustand", "i18next"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "REST APIs", "SQLAlchemy (async)", "Stripe Connect"],
  },
  {
    category: "Data & Infra",
    items: [
      "PostgreSQL",
      "Supabase",
      "Supabase Realtime",
      "SQLite (on-device)",
      "Auth / JWT",
      "Vercel",
      "Railway",
    ],
  },
  {
    category: "Tooling",
    items: ["pnpm", "Turborepo (monorepo)", "Git", "Electron", "EAS Build", "CI/CD", "Vitest"],
  },
];

export type ProjectImage = {
  /**
   * Path under /public, e.g. "/projects/flam-mobile.png". Leave "" to fall back
   * to the vector `mockup` below — a real screenshot always wins when present.
   */
  src: string;
  /** Vector recreation of the screen, drawn by components/ProjectMockup.tsx. */
  mockup?: MockupKind;
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
  /**
   * "phone" → renders screens in a PhoneCarousel (no dark landscape frame).
   * Omit for the default landscape cover + marquee gallery layout.
   */
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
      src: "/projects/iwalkie-logo.png",
      alt: "iWalkie",
    },
    brandImages: [
      {
        src: "/projects/iwalkie-splash.png",
        alt: "iWalkie 3D perspective hero — active PTT call in progress",
        caption: "Brand hero",
      },
    ],
    images: [
      {
        src: "/projects/iwalkie-brand-hero.png",
        alt: "iWalkie splash screen with the logo centred on a dark background",
        caption: "Splash — the brand in one frame",
      },
      {
        src: "/projects/iwalkie-home.png",
        alt: "iWalkie home screen with the push-to-talk button and contact sidebar",
        caption: "Home — push-to-talk, always one tap away",
      },
      {
        src: "/projects/iwalkie-active-call.png",
        alt: "iWalkie active PTT call with live audio waveform and speaker name",
        caption: "Active call — live waveform, speaker identified",
      },
      {
        src: "/projects/iwalkie-chat.png",
        alt: "Chat view showing real-time voice-to-text transcription of a message",
        caption: "Chat — voice messages transcribed in real time",
      },
      {
        src: "/projects/iwalkie-group-alert.png",
        alt: "Group channel with a location alert awaiting confirmation from recipients",
        caption: "Group alert — location shared, waiting for reads",
      },
      {
        src: "/projects/iwalkie-notifications.png",
        alt: "Notification centre with colour-coded safety alerts: blue location, yellow alert, red SOS",
        caption: "Notifications — colour-coded by urgency",
      },
    ],
    year: "2025",
    role: "Designer — branding and UX",
    links: [
      {
        kind: "figma",
        url: "https://www.figma.com/design/Vrwtz6Z0HxJSGRm3PJm3cr/iWalkie?node-id=203-20676",
        label: "Branding",
      },
      {
        kind: "figma",
        url: "https://www.figma.com/design/Vrwtz6Z0HxJSGRm3PJm3cr/iWalkie?node-id=0-1",
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
    // Drop real screenshots in /public/projects/ and set `src` (e.g. "/projects/flam-mobile.png")
    // — the screenshot then replaces the vector `mockup` automatically.
    images: [
      {
        src: "",
        mockup: "flam-mobile",
        alt: "Mobile app booking flow with the checkout bundle and payout split",
        caption: "Mobile app — bundle experiences, then split the payment across providers",
      },
      {
        src: "",
        mockup: "flam-wallet",
        alt: "Wallet pass showing an HMAC-signed QR code that validates offline",
        caption: "Offline-first Wallet pass with an HMAC-signed QR",
      },
      {
        src: "",
        mockup: "flam-desktop",
        alt: "Electron desktop dashboard with KPIs, a bookings chart and partner list",
        caption: "Desktop dashboard — sales, bookings and partner payouts",
      },
      {
        src: "",
        mockup: "flam-web",
        alt: "Web booking page with the hero and the three card tiers",
        caption: "Web app — plan a stay from the browser",
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
    // Not ready to show yet — kept in the data so it's a one-line change to bring back.
    hidden: true,
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
    images: [
      {
        src: "/projects/cooper-dashboard.png",
        mockup: "cooper-dashboard",
        alt: "COOPER dashboard showing the monthly balance and budget vs. real by category",
        caption: "Dashboard — budget vs. real, by category",
      },
      {
        src: "/projects/cooper-budgets.png",
        alt: "Automatic budgets screen splitting salary with the 50/30/20 rule",
        caption: "Automatic budgets — 50/30/20, reshaped every month from real spending",
      },
      {
        src: "/projects/cooper-registro.png",
        mockup: "cooper-registro",
        alt: "Movements ledger listing income and expenses for the month",
        caption: "Registro — logging income and expenses",
      },
      {
        src: "/projects/cooper-hierarchy.png",
        mockup: "cooper-hierarchy",
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
