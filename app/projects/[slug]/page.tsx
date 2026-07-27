import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Sparkles, Wrench, Calendar, User, Tag } from "lucide-react";
import { projects, getProject, profile } from "@/data/portfolio";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollFade } from "@/components/ScrollFade";
import { Footer } from "@/components/Footer";
import { ProjectImageFrame } from "@/components/ProjectImageFrame";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { PhoneCarousel } from "@/components/PhoneCarousel";
import { ProjectLinks } from "@/components/ProjectLinks";

// Only pre-generated slugs are valid; everything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.blurb,
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.blurb,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const phoneLayout = project.imageLayout === "phone";
  const cover = project.images?.[0];
  const gallery = project.images?.slice(1) ?? [];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <ScrollProgress />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 glass border-b border-ink-700">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <Link href="/" className="font-mono text-sm text-gray-400 transition-colors hover:text-white">
            {profile.name}
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="max-w-3xl">
          {project.status && (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent-violet/30 bg-accent-violet/10 px-3 py-1 font-mono text-xs text-accent-violet">
              <Sparkles className="h-3 w-3" />
              {project.status}
            </span>
          )}
          {project.logoImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.logoImage.src}
              alt={project.logoImage.alt}
              className="h-14 w-auto object-contain sm:h-20 lg:h-24"
            />
          ) : (
            <h1 className="text-gradient text-4xl font-bold tracking-tight sm:text-6xl">
              {project.title}
            </h1>
          )}
          <p className="mt-4 text-lg text-gray-400">{project.blurb}</p>

          {/* Meta + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            {project.year && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent-cyan" />
                {project.year}
              </span>
            )}
            {project.role && (
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-accent-cyan" />
                {project.role}
              </span>
            )}
          </div>

          <ProjectLinks links={project.links} className="mt-7" />
        </div>

        {/* ── Cover image (standard landscape layout) ────────────── */}
        {!phoneLayout && cover && (
          <ScrollFade className="mt-12">
            <ProjectImageFrame image={cover} priority />
          </ScrollFade>
        )}

        {/* ── Overview + tools sidebar ───────────────────────────── */}
        <ScrollFade className="mt-16">
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <div>
              <h2 className="text-gradient mb-5 text-2xl font-bold">Overview</h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-400">
                {project.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {project.highlights.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-gradient mb-5 text-2xl font-bold">What I built</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tools sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass glow-border rounded-2xl border border-ink-700 p-6">
                <h3 className="mb-4 inline-flex items-center gap-2 font-mono text-sm text-accent-cyan">
                  <Wrench className="h-4 w-4" />
                  Tools &amp; technologies
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-lg border border-ink-600 bg-ink-800/60 px-3 py-1.5 text-sm text-gray-300"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-ink-700 pt-5">
                  <h3 className="mb-3 inline-flex items-center gap-2 font-mono text-sm text-accent-cyan">
                    <Tag className="h-4 w-4" />
                    Stack at a glance
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-ink-600 bg-ink-800/60 px-2.5 py-1 font-mono text-xs text-accent-cyan/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </ScrollFade>

        {/* ── Phone layout: branding strip + screen carousel ─────── */}
        {phoneLayout && (
          <>
            {/* Branding assets — hero 3D + logo + icon, no dark box */}
            {project.brandImages && project.brandImages.length > 0 && (
              <ScrollFade className="mt-16">
                <h2 className="text-gradient mb-8 text-2xl font-bold">Brand identity</h2>
                <div className="flex flex-col items-center gap-10">
                  {/* 3D hero — full width, floats freely */}
                  <img
                    src={project.brandImages[0].src}
                    alt={project.brandImages[0].alt}
                    className="w-full max-w-2xl drop-shadow-[0_40px_80px_rgba(124,92,255,0.5)] select-none"
                  />
                  {/* Logo + icon side by side */}
                  {project.brandImages.length > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-10">
                      {project.brandImages.slice(1).map((img, i) => (
                        <figure key={i} className="flex flex-col items-center gap-3">
                          <div className="glass rounded-2xl border border-ink-700 p-5 shadow-[0_8px_32px_-8px_rgba(124,92,255,0.3)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="max-h-20 max-w-[220px] object-contain select-none"
                            />
                          </div>
                          {img.caption && (
                            <figcaption className="font-mono text-xs text-gray-500">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollFade>
            )}

            {/* Screens carousel */}
            {project.images && project.images.length > 0 && (
              <ScrollFade className="mt-16">
                <PhoneCarousel images={project.images} />
              </ScrollFade>
            )}
          </>
        )}

        {/* ── Standard gallery (marquee) ──────────────────────────── */}
        {!phoneLayout && gallery.length > 0 && (
          <ScrollFade className="mt-16">
            <ProjectCarousel images={project.images ?? []} />
          </ScrollFade>
        )}

        {/* ── Footer nav ─────────────────────────────────────────── */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-ink-700 pt-10 sm:flex-row sm:items-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-accent-violet/40 bg-accent-violet/10 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-violet/20 hover:shadow-[0_0_24px_-6px_rgba(124,92,255,0.7)]"
          >
            Let&apos;s work together
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
