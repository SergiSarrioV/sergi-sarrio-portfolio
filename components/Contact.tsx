import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { social, profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollFade } from "@/components/ScrollFade";
import { SpotlightCard } from "@/components/SpotlightCard";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <ScrollFade>
        <SectionHeading index="04." subtitle="say hello" title="Let's work together" />

        <SpotlightCard
          className="glass glow-border relative overflow-hidden rounded-3xl border border-ink-700 p-10 text-center sm:p-16"
          glow="rgba(124,92,255,0.2)"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 animate-pulse-glow rounded-full bg-accent-violet/20 blur-3xl" />

          <div className="relative">
            <h3 className="mx-auto max-w-xl text-2xl font-bold text-white sm:text-3xl">
              Have a role or a project in mind?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-gray-400">
              I&apos;m {profile.availableForWork ? "currently available and " : ""}always happy to talk
              about new opportunities. The fastest way to reach me is by email.
            </p>

            <a
              href={`mailto:${social.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-7 py-3.5 font-medium text-white transition-all hover:shadow-[0_0_36px_-4px_rgba(124,92,255,0.85)]"
            >
              <Mail className="h-4 w-4" />
              {social.email}
            </a>

            <div className="mt-8 flex items-center justify-center gap-6">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-accent-cyan"
                >
                  <Github className="h-4 w-4" /> GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-accent-cyan"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </SpotlightCard>
      </ScrollFade>
    </section>
  );
}
