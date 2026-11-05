import { AvatarGroup, Badge, Button, CaseTimeline, Reveal } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

export function ProjectSection() {
  return (
    <section id="projects" className="mt-section mt-band mt-projects" aria-labelledby="projects-title">
      <Reveal><h2 id="projects-title" className="mt-h2 mt-projects__title">What we ship</h2></Reveal>

      <Reveal className="mt-case mt-case--wide">
        <div className="mt-frame mt-frame--paper">
          <div className="mt-frame__body">
            <CaseTimeline label="Case progress" events={[
              { title: "Report filed", actor: "Paolo Dizon", date: "Oct 28", state: "done" },
              { title: "Guidance notified", date: "Oct 29", state: "done" },
              { title: "Follow-up", date: "Nov 4", state: "pending" },
            ]} />
          </div>
        </div>
        <div className="mt-case__text">
          <h3 className="mt-h3">ACCS</h3>
          <p className="mt-body">The college workspace for forums, consultation scheduling, concern reports and cases, evaluations, records and administration. Each role sees only its own tools.</p>
          <Button href={`${sites.portal}/sign-in`} variant="secondary" iconEnd="arrow-up-right">Sign in</Button>
        </div>
      </Reveal>

      <Reveal className="mt-case mt-case--flip">
        <div className="mt-frame mt-frame--amber">
          <div className="mt-frame__body mt-frame__body--row">
            <Badge tone="community">Forums</Badge><Badge tone="consult">Schedule</Badge><Badge tone="info">Cases</Badge>
            <AvatarGroup size={36} max={3} names={["Paolo Dizon", "Liza Manalastas", "Ramon Cruz"]} />
          </div>
        </div>
        <div className="mt-case__text">
          <h3 className="mt-h3">ACCS landing</h3>
          <p className="mt-body">The public entry point. It explains ACCS, lists all 58 modules by role and sends each person to the right place.</p>
          <Button href={sites.landing} variant="secondary" iconEnd="arrow-up-right">Visit ACCS</Button>
        </div>
      </Reveal>

      <Reveal className="mt-case mt-case--bleed">
        <div className="mt-frame mt-frame--ink">
          <div className="mt-bleed__text">
            <h3 className="mt-h3">Office Hours design system</h3>
            <p className="mt-body">One component library and one set of tokens sit behind every ACCS site and this one. A button, a table and a timetable look and behave the same on each.</p>
            <Button href={sites.design} iconEnd="arrow-up-right">Read the design system</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
