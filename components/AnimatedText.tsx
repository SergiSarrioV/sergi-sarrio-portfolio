"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Headline that reveals word-by-word, each word a gradient ───────────── */

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function GradientWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={wordContainer}
      initial="hidden"
      animate="show"
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariant}
          className="text-gradient-animated inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Typewriter that cycles through a list of words ─────────────────────── */

export function Typewriter({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    // Finished typing the word → pause, then start deleting.
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(t);
    }

    // Finished deleting → move to the next word.
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? 40 : 85,
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, words]);

  const text = words[index % words.length].slice(0, sub);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] -translate-y-[2px] animate-caret bg-accent-cyan align-middle">
        &nbsp;
      </span>
    </span>
  );
}
