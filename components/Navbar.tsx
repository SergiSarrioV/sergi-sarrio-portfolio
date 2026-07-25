"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initials for the logo mark, e.g. "Sergi Sarrió" -> "SS"
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-ink-700" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan font-bold text-white">
            {initials}
          </span>
          <span className="text-gray-300 transition-colors group-hover:text-white">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full border border-accent-violet/40 bg-accent-violet/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent-violet/20 hover:shadow-[0_0_24px_-6px_rgba(124,92,255,0.7)]"
        >
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
}
