import { profile, projects, experience } from "@/data/portfolio";

/** Splits "plain **bold part** plain" into words, keeping the bold flag. */
function words(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((seg) => ({
      bold: seg.startsWith("**"),
      words: seg.replace(/\*\*/g, "").trim().split(/\s+/).filter(Boolean),
    }));
}

function Word({ w }: { w: string }) {
  return (
    <span className="word">
      <span>{w}</span>
    </span>
  );
}

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");
  const shipped = projects.filter((p) => !p.hidden).length;
  const firstYear = Math.min(...experience.map((j) => parseInt(j.year)));
  const years = new Date().getFullYear() - firstYear;

  return (
    <section className="hero" data-hero>
      <div className="hero__grid" data-hero-grid aria-hidden="true">
        <div className="hero__lines" data-hero-lines />
        <div className="hero__glow" data-hero-glow />
      </div>
      <div className="hero__light" data-hero-light aria-hidden="true" />

      <div className="wrap hero__inner" data-hero-inner>
        <p className="eyebrow hero__eyebrow" data-intro="eyebrow">
          {profile.availableForWork && <span className="hero__status" aria-hidden="true" />}
          {profile.location}
          {profile.availableForWork ? " · Open to work" : ""}
        </p>

        <h1 className="name">
          <span className="name__line">
            <span>{first}</span>
          </span>
          <span className="name__line">
            <span>{rest.join(" ")}</span>
          </span>
        </h1>

        <p className="headline">
          {words(profile.headline).map((seg, i) => {
            const nodes = seg.words.map((w, j) => (
              <span key={j}>
                <Word w={w} />{" "}
              </span>
            ));
            return seg.bold ? <b key={i}>{nodes}</b> : <span key={i}>{nodes}</span>;
          })}
        </p>

        <div className="hero__actions" data-intro="actions">
          <a className="cta" href="#work">
            <span className="cta__fill" aria-hidden="true" />
            <span className="cta__text">See the work</span>
            <span className="cta__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a className="ghost" href="#contact">
            <span className="ghost__dot" aria-hidden="true" />
            Get in touch
          </a>
        </div>

        <ul className="s-stats" data-intro="stats">
          <li>
            <b data-count={years} data-suffix="+">
              {years}+
            </b>
            <span>Years building</span>
          </li>
          <li>
            <b data-count={shipped}>{shipped}</b>
            <span>Featured projects</span>
          </li>
          <li>
            <b data-count="1000" data-suffix="+">
              1000+
            </b>
            <span>Hours automated</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
