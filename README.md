# Sergi Sarrió — Portfolio

A dark, "techie" personal portfolio built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. Designed to be linked from your CV when applying for jobs.

## ✏️ What to fill in before sharing

Everything you need to edit lives in **one file**: [`data/portfolio.ts`](./data/portfolio.ts).
Search for `// TODO` to find each placeholder. The important ones:

- [ ] **Role / headline** — `profile.role`
- [ ] **Bio** — `profile.bio` (3 short paragraphs)
- [ ] **Location** — `profile.location`
- [ ] **Social links** — `social.github`, `social.linkedin` (leave `""` to hide)
- [ ] **Projects** — keep FLÅM, replace/delete the two placeholder projects, add live/repo URLs
- [ ] **CV PDF** — drop your résumé at `public/cv.pdf` (the "Download CV" button points there)

You can also tweak the title/SEO in `app/layout.tsx` and the deployed URL in `metadataBase`.

## 🗂️ Project case-study pages

Every project automatically gets its own detail page at **`/projects/<slug>`** (e.g. `/projects/flam-tourist-card`). Clicking a project card opens it. Each page shows a cover image, an overview, a "what I built" list, a gallery, and a **Tools & technologies** sidebar.

To flesh out a project, edit its entry in `data/portfolio.ts`:

- `slug` — the URL (lowercase, no spaces). Must be unique.
- `overview` — the longer write-up (array of paragraphs).
- `tools` — the full list of technologies (shown in the sidebar).
- `images` — screenshots. Drop files in **`public/projects/`** and set `src`
  (e.g. `src: "/projects/flam-mobile.png"`). Leave `src: ""` to show a styled
  placeholder until you have the real screenshot.
- `year`, `role` — optional meta shown at the top.

## 🚀 Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm typecheck`, `pnpm lint`.

## 🌐 Deploy (get your CV-ready URL)

The easiest path is **Vercel** (free, made by the Next.js team):

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**.
4. You get a URL like `https://sergisarrio.vercel.app` (you can add a custom domain later).

Then put that URL on your CV. ✅

## 🎨 Customizing the look

- **Accent colors / theme:** `tailwind.config.ts` (`accent.violet`, `accent.cyan`, `ink.*`).
- **Background animation:** `components/AnimatedBackground.tsx`.
- **Global styles & effects:** `app/globals.css`.

## Structure

```
app/            App Router pages, layout, global CSS
components/     UI sections (Hero, About, Skills, Projects, Contact …)
data/           ← edit your content here (portfolio.ts)
public/         static assets (put cv.pdf here)
```
