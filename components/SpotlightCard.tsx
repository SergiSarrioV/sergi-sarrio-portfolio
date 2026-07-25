"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Card surface with a radial "spotlight" that follows the cursor, plus a
 * lift-on-hover. The spotlight fades in/out on enter/leave.
 */
export function SpotlightCard({
  children,
  className = "",
  glow = "rgba(124,92,255,0.18)",
}: {
  children: ReactNode;
  className?: string;
  /** Color of the spotlight glow. */
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
