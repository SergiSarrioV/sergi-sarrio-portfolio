"use client";

import { useEffect, useRef } from "react";

/**
 * Small dot that trails the pointer. Grows into a ring over buttons and turns
 * into a violet "precise" dot over links/inputs. Fine pointers only.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;
      dot.classList.add("on");
      const t = e.target as Element;
      const precise = t.closest("a, input, textarea, .s-chip");
      const big = !precise && t.closest("button, .s-tool, .case__shot");
      dot.classList.toggle("precise", !!precise);
      dot.classList.toggle("big", !!big);
    };
    const onLeave = () => dot.classList.remove("on");

    let frame = 0;
    const tick = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} id="cursor" aria-hidden="true" />;
}
