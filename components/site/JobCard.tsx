"use client";

import { useId, useState } from "react";
import type { Job } from "@/data/portfolio";
import { rich } from "./rich";

/**
 * One role. On desktop the body is always visible; on small screens (with JS)
 * the card collapses to its title and the heading becomes a toggle.
 */
export function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  const title = (
    <span>
      {job.role} <span className="job__at">— {job.company}</span>
    </span>
  );

  return (
    <article className="job reveal" id={`job-${job.slug}`} data-job data-open={open ? "1" : "0"}>
      <p className="job__when">
        <b>{job.period}</b>
        {job.place}
      </p>
      <h3>
        <span className="job__title">{title}</span>
        <button
          type="button"
          className="job__toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <span className="job__chev" aria-hidden="true" />
          <span className="job__sr">{open ? "Hide details" : "Show details"}</span>
        </button>
      </h3>
      <div className="job__body" id={bodyId}>
        <p className="job__lede">{job.lede}</p>
        <ul className="job__points">
          {job.highlights.map((h, i) => (
            <li key={i}>{rich(h)}</li>
          ))}
        </ul>
        <div className="s-chips">
          {job.stack.map((s) => (
            <span key={s} className="s-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
