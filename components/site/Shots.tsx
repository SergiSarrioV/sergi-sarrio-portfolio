"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/portfolio";
import { Img } from "@/components/Img";

/** Horizontal scroll-snap track of phone screens with prev/next + counter. */
export function Shots({ images }: { images: ProjectImage[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const n = images.length;

  const sync = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const slides = Array.from(t.children) as HTMLElement[];
    const mid = t.scrollLeft + t.clientWidth / 2;
    let best = 0;
    slides.forEach((s, i) => {
      const c = s.offsetLeft + s.offsetWidth / 2;
      if (Math.abs(c - mid) < Math.abs(slides[best].offsetLeft + slides[best].offsetWidth / 2 - mid)) best = i;
    });
    setIndex(best);
    setEdges({ start: t.scrollLeft < 4, end: t.scrollLeft + t.clientWidth > t.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    sync();
    const t = track.current;
    window.addEventListener("resize", sync);
    t?.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("resize", sync);
      t?.removeEventListener("scroll", sync);
    };
  }, [sync]);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    const first = t?.children[0] as HTMLElement | undefined;
    if (!t || !first) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    t.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
  };

  if (n === 0) return null;

  return (
    <div className="shots" aria-roledescription="carousel" aria-label="Screens">
      <div className="shots__track" ref={track} tabIndex={0} data-lenis-prevent>
        {images.map((im, i) => (
          <figure key={im.src} className="shots__slide" aria-label={`${i + 1} of ${n}`}>
            <Img src={im.src} alt={im.alt} priority={i < 2} sizes="260px" draggable={false} />
            {im.caption && <figcaption>{im.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <div className="shots__bar">
        <span className="shots__count" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-label="Previous screen">
          ←
        </button>
        <button type="button" onClick={() => go(1)} disabled={edges.end} aria-label="Next screen">
          →
        </button>
      </div>
    </div>
  );
}
