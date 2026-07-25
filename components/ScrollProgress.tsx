"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the very top that fills as you scroll the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent-violet via-fuchsia-500 to-accent-cyan shadow-[0_0_12px_rgba(124,92,255,0.8)]"
    />
  );
}
