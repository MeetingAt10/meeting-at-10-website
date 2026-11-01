import { AvatarGroup, Badge, Button, CaseTimeline, Reveal } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

function Frame({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={`mt-frame ${className}`}>{children}</div>;
}

export function ProjectSection() {
  return (
    <section id="projects" className="mt-section mt-projects" aria-labelledby="projects-title">
      <Reveal><h2 id="projects-title" className="mt-h2 mt-projects__title">Three things we ship, one workspace</h2></Reveal>

      <Reveal className="mt-case mt-case--wide">
        <Frame>
          <div className="mt-glass mt-frame__panel">
            <CaseTimeline label="Case progress" events={[
              { title: "Report filed", actor: "Paolo Dizon", date: "Oct 28", state: "done" },
              { title: "Guidance notified", date: "Oct 29", state: "done" },
              { title: "Follow-up", date: "Nov 4", state: "pending" },
            ]} />
          </div>
        </Frame>
        <div className="mt-case__text">
          <h3 className="mt-h3">ACCS</h3>
          <p className="mt-body">The college workspace. Forums, consultation scheduling, concern reports and cases, evaluations, records and administration, each with the permissions its role needs.</p>
          <Button href={`${sites.portal}/sign-in`} variant="secondary" iconEnd="arrow-up-right">Sign in</Button>
        </div>
      </Reveal>

      <Reveal className="mt-case mt-case--flip">
        <Frame className="mt-frame--compact">
          <div className="mt-glass mt-frame__panel mt-frame__panel--row">
            <Badge tone="community">Forums</Badge><Badge tone="consult">Schedule</Badge><Badge tone="info">Cases</Badge>
            <AvatarGroup size={36} max={3} names={["Paolo Dizon", "Liza Manalastas", "Ramon Cruz"]} />
          </div>
        </Frame>
        <div className="mt-case__text">
          <h3 className="mt-h3">ACCS landing</h3>
          <p className="mt-body">The front door. It explains the workspace, lists all 58 modules by role and sends each person to the right subdomain.</p>
          <Button href={sites.landing} variant="secondary" iconEnd="arrow-up-right">Visit ACCS</Button>
        </div>
      </Reveal>

      <Reveal className="mt-case mt-case--bleed">
        <Frame className="mt-frame--bleed">
          <div className="mt-bleed__text">
            <h3 className="mt-h3">Office Hours design system</h3>
            <p className="mt-body">One component library and one set of tokens behind every ACCS surface and this site, so a button, a table and a timetable mean the same thing everywhere.</p>
            <Button href={sites.design} iconEnd="arrow-up-right">Read the design system</Button>
          </div>
        </Frame>
      </Reveal>
    </section>
  );
}
