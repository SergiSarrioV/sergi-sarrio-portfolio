import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Download,
  Figma,
  FlaskConical,
  Github,
  Globe,
} from "lucide-react";
import type { ProjectLink } from "@/data/portfolio";

/**
 * Try / download / source buttons for a project.
 *
 * A link with a url renders as a real button; one marked `pending` renders as
 * a muted, non-interactive chip, so an unreleased app can still say where it
 * will be published without pretending the link works. Deliberately no Apple
 * or Google badge artwork — those have brand rules, and a hand-drawn imitation
 * would be misuse.
 */

const META: Record<ProjectLink["kind"], { label: string; Icon: typeof Globe }> = {
  appstore: { label: "App Store", Icon: Download },
  playstore: { label: "Google Play", Icon: Download },
  testflight: { label: "TestFlight beta", Icon: FlaskConical },
  live: { label: "Live demo", Icon: Globe },
  repo: { label: "Source code", Icon: Github },
  docs: { label: "Documentation", Icon: BookOpen },
  figma: { label: "View in Figma", Icon: Figma },
};

export function ProjectLinks({
  links,
  variant = "hero",
  className = "",
}: {
  links?: ProjectLink[];
  /** "hero" = big buttons on the case study, "compact" = inline on a card. */
  variant?: "hero" | "compact";
  className?: string;
}) {
  const visible = links?.filter((l) => l.url || l.pending) ?? [];
  if (visible.length === 0) return null;

  const compact = variant === "compact";
  /* The first working link is the case study's single primary action. On a
     card it stays secondary — there the primary action is "View case study". */
  const primaryIndex = compact ? -1 : visible.findIndex((l) => l.url);

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {visible.map((link, i) => {
        const { label, Icon } = META[link.kind];
        const text = link.label ?? label;

        if (!link.url) {
          return (
            <li key={`${link.kind}-${i}`}>
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-dashed border-ink-600 bg-ink-800/40 text-gray-500 ${
                  compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
                }`}
              >
                <Clock className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
                {text}
                <span className="font-mono text-[11px] text-gray-600">soon</span>
              </span>
            </li>
          );
        }

        const isPrimary = i === primaryIndex;

        return (
          <li key={`${link.kind}-${i}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-20 inline-flex items-center gap-2 rounded-full font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan ${
                compact ? "min-h-11 px-3.5 py-2 text-sm" : "px-5 py-2.5 text-sm"
              } ${
                isPrimary
                  ? "bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:shadow-[0_0_30px_-4px_rgba(124,92,255,0.8)]"
                  : "border border-ink-600 bg-ink-800/50 text-gray-200 hover:border-accent-violet/50 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {text}
              <ArrowUpRight className="h-4 w-4 opacity-70" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
