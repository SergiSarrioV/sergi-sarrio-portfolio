import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink-700 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-sm text-gray-500 sm:flex-row">
        <p>
          © {profile.name} · Built with{" "}
          <span className="font-mono text-accent-cyan">Next.js</span> &amp;{" "}
          <span className="font-mono text-accent-violet">Tailwind</span>
        </p>
        <p className="font-mono text-xs">Designed &amp; developed by {profile.name}</p>
      </div>
    </footer>
  );
}
