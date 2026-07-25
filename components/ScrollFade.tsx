"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked fade: children fade + slide IN as the block enters the
 * viewport and fade + slide OUT as it leaves. Fully opaque in the middle so
 * the content stays readable while you're looking at it.
 */
export function ScrollFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [90, 0, 0, -70]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.94, 1, 1, 0.97]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
