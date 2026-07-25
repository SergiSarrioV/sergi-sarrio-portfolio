import { skills } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollFade } from "@/components/ScrollFade";
import { SpotlightCard } from "@/components/SpotlightCard";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <ScrollFade>
        <SectionHeading index="02." subtitle="what I work with" title="Skills & tools" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <SpotlightCard
              key={group.category}
              className="glass glow-border h-full rounded-2xl border border-ink-700 p-6"
            >
              <h3 className="mb-4 font-mono text-sm text-accent-cyan">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-ink-600 bg-ink-800/60 px-3 py-1.5 text-sm text-gray-300 transition-all hover:-translate-y-0.5 hover:border-accent-violet/40 hover:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </ScrollFade>
    </section>
  );
}
