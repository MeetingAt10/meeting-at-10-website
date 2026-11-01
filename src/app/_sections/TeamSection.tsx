import { Reveal, SpotlightCard } from "@meetingat10/design-system/react";

type Tone = "eng" | "design" | "docs" | "ops";
const groups: { name: string; tone: Tone; members: { name: string; role: string; tags: string[]; focus: string }[] }[] = [
  { name: "Engineering", tone: "eng", members: [
    { name: "Reyes", role: "Lead Developer", tags: ["Engineering"], focus: "Architecture, the shared codebase and releases." },
    { name: "Dela Cruz", role: "Fullstack Developer", tags: ["Engineering"], focus: "Features from the SPA to the API." },
    { name: "Jumuad", role: "Project Manager, Backend Developer", tags: ["Project Management", "Engineering"], focus: "Planning, delivery and the Express API." },
  ] },
  { name: "Design and analysis", tone: "design", members: [
    { name: "Sebial", role: "UI/UX Developer", tags: ["UI/UX"], focus: "Interface design and the Office Hours system." },
    { name: "Añonuevo", role: "System Analyst", tags: ["System Analysis"], focus: "Requirements, modules and user stories." },
  ] },
  { name: "Documentation and research", tone: "docs", members: [
    { name: "Balili", role: "Documentation Head, Researcher", tags: ["Documentation", "Research"], focus: "Leads the written record of the project." },
    { name: "Alaña", role: "Documentation, Researcher", tags: ["Documentation", "Research"], focus: "Technical writing and background research." },
    { name: "Belardo", role: "Documentation, Researcher", tags: ["Documentation", "Research"], focus: "Technical writing and background research." },
    { name: "Comawas", role: "Documentation, Researcher", tags: ["Documentation", "Research"], focus: "Technical writing and background research." },
  ] },
  { name: "Finance and logistics", tone: "ops", members: [
    { name: "Magpantay", role: "Finance Head", tags: ["Finance"], focus: "Budget and team resources." },
    { name: "Suico", role: "Logistics", tags: ["Logistics"], focus: "Schedules, materials and coordination." },
  ] },
];

export function TeamSection() {
  return (
    <section id="team" className="mt-section mt-team" aria-labelledby="team-title">
      <Reveal><h2 id="team-title" className="mt-h2">The eleven at the table</h2></Reveal>
      {groups.map((g) => (
        <div key={g.name} className="mt-group">
          <h3 className="mt-group__name">{g.name}</h3>
          <div className="mt-members">
            {g.members.map((m, i) => (
              <Reveal key={m.name} index={i}>
                <SpotlightCard as="article" className="mt-member" data-tone={g.tone} data-member={m.name} data-role={m.role} tabIndex={0}>
                  <span className="mt-monogram" aria-hidden="true">{m.name[0]}</span>
                  <h4 className="mt-member__name">{m.name}</h4>
                  <p className="mt-member__role">{m.role}</p>
                  <ul className="mt-tags">{m.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <p className="mt-member__focus">{m.focus}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
