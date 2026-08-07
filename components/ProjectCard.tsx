"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import { ProjectMockup } from "@/components/ProjectMockup";
import { ProjectLinks } from "@/components/ProjectLinks";

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const featured = project.featured;
  const cover = project.images?.[0];
  const isPhone = project.imageLayout === "phone";
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  /* Preview of the project's main screen — a screenshot once there is one,
     the vector mockup until then. */
  const preview = cover && (cover.src || cover.mockup) && (
    isPhone && cover.src ? (
      /* Phone-layout projects: the cover is a portrait device shot, so float it
         on a soft violet glow instead of boxing it in a dark frame with black
         letterbox bars on either side. */
      <div className="relative flex items-center justify-center px-4 py-2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/25 blur-3xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover.src}
          alt={cover.alt}
          loading="lazy"
          draggable={false}
          className="relative max-h-[380px] w-auto select-none drop-shadow-[0_30px_60px_rgba(124,92,255,0.45)] transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        />
      </div>
    ) : (
      <div className="relative overflow-hidden rounded-xl border border-ink-700 bg-ink-950/60 shadow-[0_24px_70px_-32px_rgba(124,92,255,0.75)]">
        <div className="aspect-[16/10] w-full">
          {cover.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <ProjectMockup
              kind={cover.mockup!}
              label={cover.alt}
              className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            />
          )}
        </div>
        {/* Keeps the visual anchored to the card instead of floating on its own */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-900/70 to-transparent" />
      </div>
    )
  );

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glass glow-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-700 p-6 sm:p-7"
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(124,92,255,0.16), transparent 60%)`,
        }}
      />

      {/* Static accent glow corner */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-violet/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* The whole card links to the case study (stretched link) */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <div
        className={
          wide
            ? "relative grid flex-1 gap-7 lg:grid-cols-[1fr_0.95fr] lg:items-center"
            : "relative flex flex-1 flex-col gap-6"
        }
      >
        {/* Visual first on mobile; alongside the text on large screens */}
        {preview && <div className={wide ? "lg:order-last" : ""}>{preview}</div>}

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              {featured && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent-violet/30 bg-accent-violet/10 px-2.5 py-1 text-xs font-medium text-accent-violet">
                  <Sparkles className="h-3 w-3" />
                  Featured project
                </span>
              )}
              <h3 className="text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{project.blurb}</p>
            </div>

            {project.status && (
              <span className="shrink-0 whitespace-nowrap rounded-full border border-ink-600 bg-ink-800/60 px-2.5 py-1 font-mono text-[11px] text-gray-400">
                {project.status}
              </span>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-gray-400">{project.description}</p>

          {featured && project.highlights.length > 0 && (
            <ul className="mt-5 space-y-2">
              {project.highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-400">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-ink-600 bg-ink-800/60 px-2.5 py-1 font-mono text-xs text-accent-cyan/90"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink-700 pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan">
              View case study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
            </span>

            <ProjectLinks links={project.links} variant="compact" className="sm:ml-auto" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
