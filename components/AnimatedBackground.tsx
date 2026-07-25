"use client";

import { motion } from "framer-motion";

/**
 * Full-screen "aurora borealis" backdrop:
 *  - deep dark base
 *  - a rotating conic "curtain" that constantly shifts hue
 *  - several drifting, color-blended glow blobs (mix-blend-screen = aurora glow)
 *  - a faint tech grid + vignette to keep foreground text readable
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-950">
      {/* Rotating aurora curtain — big conic gradient, heavily blurred, hue-shifting */}
      <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 animate-hue">
        <div
          className="animate-aurora h-full w-full opacity-50 blur-[90px]"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, rgba(124,92,255,0.0) 0deg, rgba(124,92,255,0.55) 70deg, rgba(34,211,238,0.55) 150deg, rgba(236,72,153,0.5) 230deg, rgba(99,102,241,0.5) 300deg, rgba(124,92,255,0.0) 360deg)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Drifting glow blobs */}
      <motion.div
        aria-hidden
        className="absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-accent-violet/40 blur-[120px] mix-blend-screen"
        animate={{ x: [0, 120, 0], y: [0, 70, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-12rem] top-1/4 h-[32rem] w-[32rem] rounded-full bg-accent-cyan/35 blur-[120px] mix-blend-screen"
        animate={{ x: [0, -110, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-10rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/30 blur-[130px] mix-blend-screen"
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tech grid */}
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />

      {/* Vignette to keep contrast high near content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,6,10,0.9)_100%)]" />
    </div>
  );
}
