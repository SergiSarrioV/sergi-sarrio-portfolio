import { profile, social } from "@/data/portfolio";

export function Closer() {
  return (
    <section className="closer" id="contact" data-closer>
      <div className="closer__field" data-closer-field aria-hidden="true" />
      <div className="wrap closer__inner">
        <h2 className="reveal">
          <span style={{ display: "block" }}>Let&apos;s build</span>
          <span style={{ display: "block" }}>something.</span>
        </h2>
        <p className="reveal">
          I&apos;m open to new roles — remote or on-site — and to interesting problems in general. Email is
          the fastest way to reach me.
        </p>
        <a className="closer__mail reveal" href={`mailto:${social.email}`}>
          {social.email}
        </a>
        <div className="closer__links reveal">
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href={profile.resumeUrl} download>
            CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Foot() {
  return (
    <footer className="foot">
      <div className="wrap">
        <span>
          {profile.name} · {profile.location}
        </span>
        <span>© {new Date().getFullYear()} · Built with Next.js, GSAP and Lenis</span>
      </div>
    </footer>
  );
}
