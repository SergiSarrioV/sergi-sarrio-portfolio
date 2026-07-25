import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollFade } from "@/components/ScrollFade";

export function Projects() {
  // Featured projects first, then the rest. Hidden ones stay out of the grid.
  const ordered = projects
    .filter((p) => !p.hidden)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  // With an odd number of regular cards the last one would leave a gap — let it span instead.
  const regularCount = ordered.filter((p) => !p.featured).length;

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <ScrollFade>
        <SectionHeading index="03." subtitle="things I've built" title="Projects" />

        <div className="grid gap-6 lg:grid-cols-2">
          {ordered.map((project) => {
            const wide = Boolean(project.featured) || regularCount === 1;
            return (
              <div key={project.title} className={wide ? "lg:col-span-2" : ""}>
                <ProjectCard project={project} wide={wide} />
              </div>
            );
          })}
        </div>
      </ScrollFade>
    </section>
  );
}
