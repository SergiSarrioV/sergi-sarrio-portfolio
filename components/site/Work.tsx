import Link from "next/link";
import { projects } from "@/data/portfolio";
import { Img } from "@/components/Img";

/** Alternating left/right case studies, each linking to its write-up. */
export function Work() {
  const visible = projects.filter((p) => !p.hidden);

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">Selected work</p>
          <h2>Things I&apos;ve designed and shipped</h2>
          <p>Each one has a full write-up — what it does, how it&apos;s built, and the screens.</p>
        </div>

        <div className="cases">
          {visible.map((p, i) => {
            const shots = (p.images ?? []).filter((im) => im.src).slice(0, 3);
            const href = `/projects/${p.slug}`;
            return (
              <article key={p.slug} className="case reveal">
                <Link className="case__shot" href={href} tabIndex={-1} aria-hidden="true">
                  {p.video ? (
                    <video
                      className="case__video"
                      src={p.video.src}
                      poster={p.video.poster}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="case__phones">
                      {shots.map((im) => (
                        <Img
                          key={im.src}
                          src={im.src}
                          alt=""
                          sizes="(max-width: 860px) 30vw, 200px"
                        />
                      ))}
                    </div>
                  )}
                </Link>
                <div className="case__body">
                  <p className="case__no">
                    {String(i + 1).padStart(2, "0")} / {p.year}
                    {p.status ? ` · ${p.status}` : ""}
                  </p>
                  <h3>{p.title}</h3>
                  <p className="case__tag">{p.blurb}</p>
                  <p className="case__lede">{p.description}</p>
                  {p.featured && <p className="case__badge">★ Featured project</p>}
                  <div className="s-chips">
                    {p.tags.map((t) => (
                      <span key={t} className="s-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link className="case__go" href={href}>
                    Read the write-up <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
