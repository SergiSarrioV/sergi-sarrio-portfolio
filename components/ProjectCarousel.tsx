"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { ProjectImage } from "@/data/portfolio";
import { ProjectMockup } from "@/components/ProjectMockup";

/**
 * Infinite marquee of project screens. The track holds two identical copies of
 * the slides and slides one full copy left, so the loop never shows a seam.
 *
 * Motion is opt-out in three ways, because auto-moving content that can't be
 * stopped is an accessibility failure (WCAG 2.2.2):
 *   · hovering the strip pauses it,
 *   · an explicit play/pause button (reachable by keyboard) pauses it,
 *   · prefers-reduced-motion stops it entirely and turns the strip into a
 *     normal horizontally scrollable row.
 */
export function ProjectCarousel({ images }: { images: ProjectImage[] }) {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const running = !paused && !hovered;

  if (images.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-gradient text-2xl font-bold">Gallery</h2>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-600 bg-ink-800/60 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-accent-violet/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan motion-reduce:hidden"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {paused ? "Play" : "Pause"}
          <span className="sr-only">the screenshot carousel</span>
        </button>
      </div>

      {/* Full-bleed strip: the page container is narrower than the marquee. */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
        >
          <div
            className="flex w-max animate-marquee gap-6 px-6"
            style={{
              animationPlayState: running ? "running" : "paused",
              ["--marquee-duration" as string]: `${images.length * 11}s`,
            }}
          >
            {images.map((image, i) => (
              <Slide key={`a-${i}`} image={image} index={i} idPrefix="ca-" />
            ))}
            {/* Second copy only exists to close the loop. */}
            {images.map((image, i) => (
              <Slide
                key={`b-${i}`}
                image={image}
                index={i}
                idPrefix="cb-"
                duplicate
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide({
  image,
  index,
  idPrefix,
  duplicate = false,
}: {
  image: ProjectImage;
  index: number;
  idPrefix: string;
  duplicate?: boolean;
}) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className={`w-[290px] shrink-0 animate-float sm:w-[440px] lg:w-[520px] ${
        duplicate ? "motion-reduce:hidden" : ""
      }`}
      // Staggered delay so the screens bob independently instead of in lockstep.
      style={{ animationDelay: `${(index % 4) * 0.85}s` }}
    >
      <div className="glass relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink-700 shadow-[0_30px_80px_-40px_rgba(124,92,255,0.7)]">
        {image.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={duplicate ? "" : image.alt}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        ) : image.mockup ? (
          <ProjectMockup
            kind={image.mockup}
            label={duplicate ? "" : image.alt}
            idPrefix={idPrefix}
          />
        ) : null}
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
