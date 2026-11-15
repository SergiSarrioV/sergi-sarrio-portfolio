import { skills } from "@/data/portfolio";

export function Skills() {
  return (
    <section className="skills" id="skills" data-skills>
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow">Toolbox</p>
          <h2>What I build with</h2>
        </div>

        <div className="skills__grid">
          {skills.map((group) => (
            <div key={group.category} className="skillgroup">
              <h3>{group.category}</h3>
              <div className="s-tools">
                {group.items.map((s) =>
                  s.logo ? (
                    <span key={s.name} className="s-tool">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.logo} alt="" width={30} height={30} loading="lazy" />
                      {s.name}
                    </span>
                  ) : (
                    <span key={s.name} className="s-tool s-tool--text">
                      {s.name}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
