import { MapPin, Briefcase } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollFade } from "@/components/ScrollFade";
import { SpotlightCard } from "@/components/SpotlightCard";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <ScrollFade>
        <SectionHeading index="01." subtitle="who I am" title="About me" />

        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4 text-lg leading-relaxed text-gray-400">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <SpotlightCard
            className="glass glow-border rounded-2xl border border-ink-700 p-6"
            glow="rgba(34,211,238,0.16)"
          >
            <dl className="space-y-5 text-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-violet/10 text-accent-violet">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-gray-500">Based in</dt>
                  <dd className="font-medium text-gray-200">{profile.location}</dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                  <Briefcase className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-gray-500">Status</dt>
                  <dd className="font-medium text-gray-200">
                    {profile.availableForWork ? "Open to opportunities" : "Currently engaged"}
                  </dd>
                </div>
              </div>
            </dl>
          </SpotlightCard>
        </div>
      </ScrollFade>
    </section>
  );
}
