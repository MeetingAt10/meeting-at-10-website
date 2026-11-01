import { CountUp, Reveal } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

const stats = [
  { id: "modules", value: 58, label: "modules specified", source: "DOC003 module inventory" },
  { id: "stories", value: 58, label: "user stories", source: "DOC004 user stories" },
  { id: "cases", value: 183, label: "black-box test cases", source: "DOC005 test blueprint" },
  { id: "sites", value: Object.keys(sites).length, label: "sites on AWS", source: "accs-dev CloudFormation" },
  { id: "subdomains", value: 7, label: "application subdomains", source: "ACCS module sites" },
  { id: "members", value: 11, label: "team members", source: "Meeting At 10" },
];

export function StatsSection() {
  return (
    <section id="stats" className="mt-section mt-stats" aria-labelledby="stats-title">
      <Reveal><h2 id="stats-title" className="mt-h2">What the record says</h2></Reveal>
      <dl className="mt-ledger">
        {stats.map((s, i) => (
          <Reveal key={s.id} index={i} className="mt-ledger__row">
            <dd data-count={s.id} data-value={s.value}><CountUp value={s.value} /></dd>
            <dt>{s.label}</dt>
            <span className="mt-ledger__src">{s.source}</span>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
