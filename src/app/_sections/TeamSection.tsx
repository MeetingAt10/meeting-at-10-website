import Image from "next/image";
import { Reveal } from "@meetingat10/design-system/react";

type Tone = "eng" | "design" | "docs" | "ops";
type Member = { name: string; role: string; portrait: string; size?: number; focus?: string };
const groups: { name: string; tone: Tone; note?: string; pairs?: boolean; members: Member[] }[] = [
  { name: "Engineering", tone: "eng", members: [
    { name: "Reyes", portrait: "reyes", role: "Lead Developer", focus: "Architecture, the shared codebase and releases." },
    { name: "Dela Cruz", portrait: "dela-cruz", role: "Fullstack Developer", focus: "Features from the SPA to the API." },
    { name: "Jumuad", portrait: "jumuad", size: 400, role: "Project Manager, Backend Developer", focus: "Planning, delivery and the Express API." },
  ] },
  { name: "Design and analysis", tone: "design", members: [
    { name: "Sebial", portrait: "sebial", role: "UI/UX Developer", focus: "Interface design and the Office Hours system." },
    { name: "Añonuevo", portrait: "anonuevo", role: "System Analyst", focus: "Requirements, modules and user stories." },
  ] },
  { name: "Documentation and research", tone: "docs", pairs: true, note: "Technical writing and background research.", members: [
    { name: "Balili", portrait: "balili", role: "Documentation Head, Researcher", focus: "Leads the written record." },
    { name: "Alaña", portrait: "alana", role: "Documentation, Researcher" },
    { name: "Belardo", portrait: "belardo", role: "Documentation, Researcher" },
    { name: "Comawas", portrait: "comawas", role: "Documentation, Researcher" },
  ] },
  { name: "Finance and logistics", tone: "ops", pairs: true, members: [
    { name: "Magpantay", portrait: "magpantay", size: 300, role: "Finance Head", focus: "Budget and team resources." },
    { name: "Suico", portrait: "suico", role: "Logistics", focus: "Schedules, materials and coordination." },
  ] },
];

export function TeamSection() {
  return (
    <section id="team" className="mt-section mt-band mt-team" aria-labelledby="team-title">
      <span className="mt-dock mt-dock--section" data-dock="team" aria-hidden="true" />
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
