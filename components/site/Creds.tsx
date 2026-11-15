import { education, languages, social } from "@/data/portfolio";

export function Creds() {
  return (
    <section>
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">The rest of it</p>
          <h2>Education, languages, elsewhere</h2>
        </div>

        <div className="creds">
          <div className="cred reveal">
            <h3>Education</h3>
            <ul>
              {education.map((e) => (
                <li key={e.title}>
                  <b>{e.title}</b>
                  <span>
                    {e.detail} · {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cred reveal">
            <h3>Languages</h3>
            <ul>
              {languages.map((l) => (
                <li key={l.name}>
                  <b>{l.name}</b>
                  <span>{l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cred reveal">
            <h3>Elsewhere</h3>
            <ul>
              {social.github && (
                <li>
                  <a href={social.github} target="_blank" rel="noopener noreferrer">
                    <b>GitHub</b>
                  </a>
                  <span>Code and side projects</span>
                </li>
              )}
              {social.linkedin && (
                <li>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <b>LinkedIn</b>
                  </a>
                  <span>Career history and recommendations</span>
                </li>
              )}
              <li>
                <a href="/cv.pdf" download>
                  <b>CV (PDF)</b>
                </a>
                <span>Everything on one page</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
