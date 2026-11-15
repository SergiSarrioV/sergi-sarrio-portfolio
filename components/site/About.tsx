import { profile } from "@/data/portfolio";

export function About() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">About</p>
          <h2>Hi, I&apos;m {profile.name.split(" ")[0]}.</h2>
        </div>

        <div className="about__grid">
          <div className="reveal">
            {profile.portrait ? (
              <div className="about__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.portrait} alt={profile.name} />
                <p className="about__caption">{profile.role}</p>
              </div>
            ) : (
              <div className="about__photo about__photo--empty">
                <span aria-hidden="true">{initials}</span>
                <p className="about__caption">{profile.role}</p>
              </div>
            )}
          </div>

          <div>
            <p className="about__lede reveal">{profile.aboutLede}</p>
            <div className="about__notes reveal">
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
