"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Full-screen "aurora borealis" backdrop:
 *  - deep dark base
 *  - a rotating conic "curtain" that constantly shifts hue
 *  - several drifting, color-blended glow blobs (mix-blend-screen = aurora glow)
 *  - a faint tech grid + vignette to keep foreground text readable
 *
 * Performance note: the heavy work here is *animating* huge blurred +
 * blend-mode layers — every frame forces the GPU to re-rasterise them. A
 * static blurred layer is composited once and cached (cheap). So on phones
 * (and when the user prefers reduced motion) we keep the exact same look but
 * drop every continuous loop, which removes the jank without losing the vibe.
 */

/** True on narrow viewports (phones/small tablets). SSR-safe: starts false. */
function useIsMobile(query = "(max-width: 768px)") {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return mobile;
}

/** Base placement/appearance for each drifting glow blob. */
const BLOBS = [
  {
    className:
      "absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-accent-violet/40 mix-blend-screen",
    animate: { x: [0, 120, 0], y: [0, 70, 0], scale: [1, 1.25, 1] },
    duration: 18,
  },
  {
    className:
      "absolute right-[-12rem] top-1/4 h-[32rem] w-[32rem] rounded-full bg-accent-cyan/35 mix-blend-screen",
    animate: { x: [0, -110, 0], y: [0, -60, 0], scale: [1, 1.3, 1] },
    duration: 22,
  },
  {
    className:
      "absolute bottom-[-10rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/30 mix-blend-screen",
    animate: { x: [0, 80, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 1.1, 1] },
    duration: 26,
  },
];

export function AnimatedBackground() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  // Freeze all continuous loops on phones / reduced-motion. Lighter blur there
  // too, so the one-time rasterisation is cheaper on mobile GPUs.
  const still = isMobile || !!reduce;
  const blobBlur = isMobile ? "blur-[80px]" : "blur-[120px]";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-950">
      {/* Rotating aurora curtain — big conic gradient, heavily blurred, hue-shifting */}
      <div
        className={`absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 ${
          still ? "" : "animate-hue"
        }`}
      >
        <div
          className={`h-full w-full opacity-50 mix-blend-screen ${
            still ? "blur-[60px]" : "animate-aurora blur-[90px]"
          }`}
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(124,92,255,0.0) 0deg, rgba(124,92,255,0.55) 70deg, rgba(34,211,238,0.55) 150deg, rgba(236,72,153,0.5) 230deg, rgba(99,102,241,0.5) 300deg, rgba(124,92,255,0.0) 360deg)",
          }}
        />
      </div>

      {/* Drifting glow blobs — animated on desktop, frozen in place on phones. */}
      {BLOBS.map((blob, i) =>
        still ? (
          <div key={i} aria-hidden className={`${blob.className} ${blobBlur}`} />
        ) : (
          <motion.div
            key={i}
            aria-hidden
            className={`${blob.className} ${blobBlur}`}
            animate={blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      )}

      {/* Tech grid */}
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />

      {/* Vignette to keep contrast high near content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,6,10,0.9)_100%)]" />
    </div>
  );
}
