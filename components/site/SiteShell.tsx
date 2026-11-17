"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Cursor } from "./Cursor";

gsap.registerPlugin(ScrollTrigger, useGSAP);

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

const REDUCE = "(prefers-reduced-motion: reduce)";
const FINE = "(hover: hover) and (pointer: fine)";

/**
 * Page chrome + all scroll-driven motion: Lenis smooth scroll, the hero intro
 * timeline, pointer-reactive hero grid/light, scroll reveals, the experience
 * scroll-spy, the sticky-bar state and the back-to-top button.
 *
 * Everything is opt-in by data attribute, so the same shell works for the
 * home page and the project pages (selectors that don't exist are skipped).
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduce = window.matchMedia(REDUCE).matches;
      const fine = window.matchMedia(FINE).matches;
      const cleanups: (() => void)[] = [];
      const has = (sel: string) => el.querySelector(sel) !== null;

      /* ── Bar "stuck" + back-to-top visibility ───────────────────────── */
      const bar = el.querySelector<HTMLElement>("[data-site-bar]");
      const onScroll = (y: number) => {
        if (bar) bar.dataset.stuck = y > 24 ? "1" : "0";
        el.dataset.far = y > 900 ? "1" : "0";
      };

      let lenis: Lenis | null = null;
      if (reduce) {
        const h = () => onScroll(window.scrollY);
        window.addEventListener("scroll", h, { passive: true });
        cleanups.push(() => window.removeEventListener("scroll", h));
      } else {
        lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        window.__lenis = lenis;
        lenis.on("scroll", (l: Lenis) => {
          ScrollTrigger.update();
          onScroll(l.scroll);
        });
        const raf = (t: number) => lenis?.raf(t * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => gsap.ticker.remove(raf));
      }
      onScroll(window.scrollY);

      /* ── In-page anchors glide via Lenis ────────────────────────────── */
      const barH = parseInt(getComputedStyle(el).getPropertyValue("--bar-h")) || 64;
      const anchors = el.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      const onAnchor = (e: MouseEvent) => {
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
        if (!href || !lenis) return;
        if (href === "#top") {
          e.preventDefault();
          lenis.scrollTo(0);
          return;
        }
        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;
        e.preventDefault();
        const cs = getComputedStyle(target);
        const pad = parseFloat(cs.paddingTop) || 0;
        const margin = parseFloat(cs.scrollMarginTop) || 0;
        // Land the section heading just under the bar, skipping its top padding.
        // `force` so drawer links still scroll while the open drawer has Lenis stopped.
        lenis.scrollTo(target, { offset: margin + pad - barH - 12, force: true });
        history.replaceState(null, "", href);
      };
      anchors.forEach((a) => a.addEventListener("click", onAnchor));
      cleanups.push(() => anchors.forEach((a) => a.removeEventListener("click", onAnchor)));

      /* ── Hero: light follows the pointer, grid drifts + parallaxes ──── */
      const hero = el.querySelector<HTMLElement>("[data-hero]");
      const light = el.querySelector<HTMLElement>("[data-hero-light]");
      if (!reduce && fine && hero && light) {
        const lines = el.querySelector<HTMLElement>("[data-hero-lines]");
        const glow = el.querySelector<HTMLElement>("[data-hero-glow]");
        const target = { x: 0, y: 0 };
        const cur = { x: 0, y: 0 };
        let seen = false;
        let frame = 0;
        let dx = 0;
        let dy = 0;
        let last = performance.now();

        const onMove = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const r = hero.getBoundingClientRect();
          if (e.clientY > r.bottom) {
            light.dataset.on = "0";
            return;
          }
          target.x = e.clientX - r.left;
          target.y = e.clientY - r.top;
          if (!seen) {
            cur.x = target.x;
            cur.y = target.y;
            seen = true;
          }
          light.dataset.on = "1";
        };

        const tick = () => {
          cur.x += (target.x - cur.x) * 0.11;
          cur.y += (target.y - cur.y) * 0.11;
          light.style.setProperty("--sx", `${cur.x.toFixed(1)}px`);
          light.style.setProperty("--sy", `${cur.y.toFixed(1)}px`);

          const now = performance.now();
          const dt = Math.min((now - last) / 1000, 0.05);
          last = now;
          const phase = (now / 1000) * 0.09;
          dx = (dx + 44 * Math.cos(phase) * dt) % 88;
          dy = (dy + 44 * Math.sin(phase) * dt) % 88;

          let px = 0;
          let py = 0;
          let gx = 0;
          let gy = 0;
          if (seen) {
            const r = hero.getBoundingClientRect();
            const nx = cur.x / Math.max(r.width, 1) - 0.5;
            const ny = cur.y / Math.max(r.height, 1) - 0.5;
            px = -46 * nx;
            py = -30 * ny;
            gx = 26 * nx;
            gy = 16 * ny;
          }
          if (lines) lines.style.transform = `translate3d(${(px + dx).toFixed(1)}px, ${(py + dy).toFixed(1)}px, 0)`;
          if (glow) glow.style.translate = `${(gx + 18 * Math.cos(phase)).toFixed(1)}px ${(gy + 12 * Math.sin(phase)).toFixed(1)}px`;
          frame = requestAnimationFrame(tick);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        frame = requestAnimationFrame(tick);
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove);
          cancelAnimationFrame(frame);
        });
      }

      /* ── GSAP timelines (skipped entirely with reduced motion) ──────── */
      const mm = gsap.matchMedia();
      // A plain query: with a conditions object, matchMedia only fires when one matches.
      mm.add("(prefers-reduced-motion: no-preference)", () => {

        if (hero) {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from("[data-hero-grid]", { autoAlpha: 0, duration: 1.1 }, 0)
            .from('[data-intro="eyebrow"]', { y: 14, autoAlpha: 0, duration: 0.6 }, 0.1)
            .from(".name__line > span", { yPercent: 108, duration: 0.95, stagger: 0.08 }, 0.15)
            .from(".word > span", { yPercent: 105, duration: 0.7, stagger: 0.035 }, 0.5)
            .from('[data-intro="actions"]', { y: 18, autoAlpha: 0, duration: 0.6 }, 0.95);
          if (has('[data-intro="stats"]')) {
            tl.from('[data-intro="stats"]', { y: 18, autoAlpha: 0, duration: 0.6 }, 1.05);
          }
          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
            const end = parseFloat(node.dataset.count ?? "0");
            const suffix = node.dataset.suffix ?? "";
            const v = { n: 0 };
            tl.to(
              v,
              {
                n: end,
                duration: 1.1,
                ease: "power2.out",
                onUpdate: () => {
                  node.textContent = `${Math.round(v.n)}${suffix}`;
                },
              },
              1.1,
            );
          });

          if (!fine) {
            gsap.to("[data-hero-lines]", { x: 88, y: 88, duration: 9, ease: "none", repeat: -1 });
          }
          gsap.to("[data-hero-glow]", {
            scale: 1.12,
            duration: 13,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 20%",
          });
          gsap.to("[data-hero-inner]", {
            yPercent: -12,
            autoAlpha: 0.25,
            ease: "none",
            scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
          });
        }

        if (has("[data-skills] .s-tool")) {
          // fromTo (not from): with from(), a re-run of this effect (React strict mode / HMR)
          // reads the half-applied y:12 as the end value and the chips stay offset.
          // clearProps hands transform back to the CSS hover lift when done.
          gsap.fromTo(
            "[data-skills] .s-tool",
            { y: 12, opacity: 0 }, // opacity, not autoAlpha: keeps chips in the accessibility tree
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.025,
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: "[data-skills]", start: "top 70%", once: true },
            },
          );
        }

        if (has(".reveal")) {
          // opacity (not autoAlpha/visibility) so unrevealed content stays readable by
          // screen readers, crawlers and "find in page".
          gsap.set(".reveal", { y: 28, opacity: 0 });
          ScrollTrigger.batch(".reveal", {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.09,
                overwrite: true,
              }),
          });
        }

        const items = gsap.utils.toArray<HTMLElement>("[data-xp-item]");
        gsap.utils.toArray<HTMLElement>("[data-job]").forEach((job, i) => {
          const activate = () => items.forEach((it, j) => (it.dataset.on = i === j ? "1" : "0"));
          ScrollTrigger.create({
            trigger: job,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: activate,
            onEnterBack: activate,
          });
        });

        if (has("[data-closer-field]")) {
          gsap.to("[data-closer-field]", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: { trigger: "[data-closer]", start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        lenis?.destroy();
        window.__lenis = null;
        mm.revert();
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: root },
  );

  return (
    <>
      <Cursor />
      <div ref={root} id="top" className="site" data-scroll-page>
        {children}
        <a className="totop" href="#top" aria-label="Back to top">
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </>
  );
}
