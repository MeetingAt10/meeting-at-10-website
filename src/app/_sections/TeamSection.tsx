import Image from "next/image";
import { Reveal } from "@meetingat10/design-system/react";

import { groups } from "@/data/team";

export function TeamSection() {
  return (
    <section id="team" className="mt-section mt-band mt-team" aria-labelledby="team-title">
      <Reveal><h2 id="team-title" className="mt-h2">Who does what</h2></Reveal>
      {groups.map((g) => (
        <div key={g.name} className="mt-group" data-tone={g.tone}>
          <div className="mt-group__head">
            <h3 className="mt-group__name">{g.name}</h3>
            {g.note && <p className="mt-caption">{g.note}</p>}
          </div>
          <ul className={`mt-roster${g.pairs ? " mt-roster--pairs" : ""}`}>
            {g.members.map((m, i) => (
              <Reveal as="li" key={m.name} index={i}>
                <article className="mt-person" data-member={m.name} data-role={m.role}>
                  <Image className="mt-person__portrait" src={`/portraits/${m.portrait}.webp`} alt="" width={m.size ?? 480} height={m.size ?? 480} />
                  <h4 className="mt-person__name">{m.name}</h4>
                  <div className="mt-person__detail">
                    <p className="mt-person__role">{m.role}</p>
                    {m.focus && <p className="mt-person__focus">{m.focus}</p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
