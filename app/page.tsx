import { SiteShell } from "@/components/site/SiteShell";
import { Bar } from "@/components/site/Bar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Experience } from "@/components/site/Experience";
import { Work } from "@/components/site/Work";
import { Creds } from "@/components/site/Creds";
import { Closer, Foot } from "@/components/site/Closer";

export default function Home() {
  return (
    <SiteShell>
      <Bar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Creds />
        <Closer />
      </main>
      <Foot />
    </SiteShell>
  );
}
