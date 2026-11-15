"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

/**
 * Fixed top bar. `home` shows the section nav + mobile drawer; `doc` (project
 * pages) shows a back link instead.
 */
export function Bar({ variant = "home" }: { variant?: "home" | "doc" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "doc") {
    return (
      <header className="bar" data-site-bar>
        <Link className="mark" href="/" aria-label="Home">
          {initials}
        </Link>
        <Link className="bar__back" href="/#work">
          <span aria-hidden="true">←</span> All work
        </Link>
        <a className="bar__cta" href={profile.resumeUrl} download>
          <span>CV</span>
          <span className="long"> PDF ↓</span>
        </a>
      </header>
    );
  }

  return (
    <>
      <header className="bar" data-site-bar>
        <a className="mark" href="#top" aria-label="Top of page">
          {initials}
        </a>
        <nav aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="bar__cta" href={profile.resumeUrl} download>
          <span>CV</span>
          <span className="long"> PDF ↓</span>
        </a>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="site-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      <button
        type="button"
        className="drawer__scrim"
        data-open={open ? "1" : "0"}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <aside
        id="site-drawer"
        className="drawer"
        data-open={open ? "1" : "0"}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="drawer__cv" href={profile.resumeUrl} download onClick={() => setOpen(false)}>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </aside>
    </>
  );
}
