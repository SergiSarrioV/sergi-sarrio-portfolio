import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, profile, type ProjectLink } from "@/data/portfolio";
import { SiteShell } from "@/components/site/SiteShell";
import { Bar } from "@/components/site/Bar";
import { Foot } from "@/components/site/Closer";
import { Shots } from "@/components/site/Shots";
import { Img } from "@/components/Img";

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

const LINK_LABEL: Record<ProjectLink["kind"], string> = {
  appstore: "App Store",
  playstore: "Google Play",
  testflight: "TestFlight beta",
  live: "Live demo",
  repo: "Source code",
  docs: "Documentation",
  figma: "View in Figma",
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const visible = projects.filter((p) => !p.hidden);
  const i = visible.findIndex((p) => p.slug === project.slug);
  const next = visible.length > 1 ? visible[(i + 1) % visible.length] : undefined;
  const links = project.links?.filter((l) => l.url || l.pending) ?? [];
  const brand = project.brandImages?.[0];

  return (
    <SiteShell>
      <Bar variant="doc" />
      <main className="doc">
        <p className="doc__meta reveal">
          {String(i + 1).padStart(2, "0")} / {project.year}
          {project.status ? ` · ${project.status}` : ""}
        </p>
        {project.logoImage ? (
          <h1 className="reveal">
            <Img
              src={project.logoImage.src}
              alt={project.logoImage.alt}
              priority
              sizes="400px"
              className="doc__logo"
            />
          </h1>
        ) : (
          <h1 className="reveal">{project.title}</h1>
        )}
        <p className="doc__tag reveal">{project.blurb}</p>
        <p className="doc__lede reveal">{project.description}</p>

        {project.images && project.images.length > 0 && (
          <section className="doc__section reveal" aria-label="Screens">
            <h2 className="doc__label">Screens</h2>
            <Shots images={project.images} />
          </section>
        )}

        <div className="doc__body">
          <div>
            <div className="doc__block reveal">
              <h2>Overview</h2>
              <div className="doc__prose">
                {project.overview.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>
            </div>

            {project.highlights.length > 0 && (
              <div className="doc__block reveal">
                <h2>What I built</h2>
                <ul className="doc__points">
                  {project.highlights.map((h, k) => (
                    <li key={k}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {brand && (
              <div className="doc__block reveal">
                <h2>Brand identity</h2>
                <div className="doc__brand">
                  <Img src={brand.src} alt={brand.alt} sizes="(max-width: 900px) 90vw, 640px" />
                </div>
              </div>
            )}
          </div>

          <aside className="doc__side reveal">
            <dl>
              {project.year && (
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              {project.role && (
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              {project.status && (
                <div>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
              )}
            </dl>
            <h2>Stack</h2>
            <div className="s-chips">
              {project.tools.map((t) => (
                <span key={t} className="s-chip">
                  {t}
                </span>
              ))}
            </div>
            {links.length > 0 && (
              <div className="doc__links">
                {links.map((l, k) =>
                  l.url ? (
                    <a key={k} href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label ?? LINK_LABEL[l.kind]} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span key={k}>
                      {l.label ?? LINK_LABEL[l.kind]} <small>soon</small>
                    </span>
                  ),
                )}
              </div>
            )}
          </aside>
        </div>

        <div className="doc__foot">
          <Link href="/#work">← All work</Link>
          {next && (
            <Link className="doc__footlink" href={`/projects/${next.slug}`}>
              Next: {next.title} →
            </Link>
          )}
        </div>
      </main>
      <Foot />
    </SiteShell>
  );
}
