import { experience } from "@/data/portfolio";
import { JobCard } from "./JobCard";

/** Sticky index on the left (scroll-spied), job cards on the right. */
export function Experience() {
  return (
    <section id="experience">
      <div className="wrap xp__grid">
        <aside className="xp__index">
          <div className="section__head reveal" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Experience</p>
            <h2>Where I&apos;ve been</h2>
          </div>
          <ol className="xp__list" aria-label="Roles">
            {experience.map((job, i) => (
              <li key={job.slug}>
                <a className="xp__item" href={`#job-${job.slug}`} data-xp-item data-on={i === 0 ? "1" : "0"}>
                  <span className="xp__bullet" aria-hidden="true" />
                  <span>
                    <b>{job.company}</b>
                    <span>
                      {job.role} · {job.year}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="xp__detail">
          {experience.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
