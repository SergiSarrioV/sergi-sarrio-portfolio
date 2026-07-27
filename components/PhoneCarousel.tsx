"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/data/portfolio";

/**
 * Full-width sliding carousel designed for portrait phone mockups.
 * No background box — each phone floats with a violet drop-shadow.
 * Adjacent slides peek in from both sides so users can see there's more.
 */
export function PhoneCarousel({ images }: { images: ProjectImage[] }) {
  const [current, setCurrent] = useState(0);
  const n = images.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % n), [n]);

  if (n === 0) return null;

  // Each slide occupies 78% of the container; shift +11% so slide 0 starts centred.
  // At index i → translateX(11 - i * 78)%.
  const trackShift = 11 - current * 78;

  return (
    <section aria-label="Screen gallery">
      <h2 className="text-gradient mb-8 text-2xl font-bold">Screens</h2>

      <div className="relative">
        {/* ── Track ─────────────────────────────────────────────────────── */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(${trackShift}%)` }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex justify-center py-8 px-4"
                style={{ width: "78%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="max-w-[220px] sm:max-w-[260px] lg:max-w-[290px] select-none
                             drop-shadow-[0_40px_64px_rgba(124,92,255,0.45)]
                             transition-transform duration-500"
                  style={{
                    transform: i === current ? "scale(1)" : "scale(0.88)",
                    opacity: i === current ? 1 : 0.45,
                    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Prev arrow ────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous screen"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2
                     flex h-10 w-10 items-center justify-center rounded-full
                     border border-ink-600 bg-ink-900/80 text-gray-300 backdrop-blur-sm
                     transition-all hover:border-accent-violet/50 hover:text-white
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* ── Next arrow ────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={next}
          aria-label="Next screen"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2
                     flex h-10 w-10 items-center justify-center rounded-full
                     border border-ink-600 bg-ink-900/80 text-gray-300 backdrop-blur-sm
                     transition-all hover:border-accent-violet/50 hover:text-white
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* ── Caption ───────────────────────────────────────────────────── */}
      <p className="mt-3 h-5 text-center text-sm text-gray-500 transition-opacity duration-300">
        {images[current]?.caption ?? ""}
      </p>

      {/* ── Dot indicators ────────────────────────────────────────────── */}
      <div className="mt-5 flex justify-center gap-2.5" role="tablist" aria-label="Screens">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Screen ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan
                        ${i === current ? "w-6 bg-accent-violet" : "w-1.5 bg-ink-600 hover:bg-ink-500"}`}
          />
        ))}
      </div>
    </section>
  );
}
