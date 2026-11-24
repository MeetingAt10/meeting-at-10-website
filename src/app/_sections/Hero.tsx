import { Aurora, AvatarGroup, Badge, CaseTimeline } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

const beams = [[-420, 2, .25], [-200, 1, .18], [190, 2, .22], [410, 1, .16], [0, 3, .12]] as const;

export function Hero() {
  return (
    <section className="mt-hero" aria-labelledby="hero-title">
      <Aurora />
      <div className="mt-hero__sky" aria-hidden="true">
        {beams.map(([x, width, alpha]) => <span key={x} className="mt-hero__beam" style={{ "--x": `${x}px`, width, "--a": alpha } as React.CSSProperties} />)}
        <span className="mt-hero__stars" />
      </div>
      <div className="mt-hero__copy">
        <span className="mt-hero__glow" aria-hidden="true" />
        <span className="mt-hero__horizon" aria-hidden="true" />
        <h1 id="hero-title" className="mt-hero__title ds-word-rise">We meet at 10.<em>Then we ship.</em></h1>
        <p className="mt-hero__lead" data-seq="1">Eleven QCU students build and run ACCS, the workspace for the College of Computer Studies.</p>
        <div className="mt-hero__actions" data-seq="2">
          <a className="mt-hero__primary" href={sites.landing}>Visit ACCS <span aria-hidden="true">↗</span></a>
          <a className="mt-hero__secondary" href="#architecture">See the architecture</a>
        </div>
        <span className="mt-dock mt-dock--hero" data-dock="start" aria-hidden="true" />
      </div>
      <div className="mt-hero__visual" aria-hidden="true">
        <div className="mt-panel mt-hero__window">
          <div className="mt-hero__chrome"><span>Cases</span><span className="mt-mono">CCS-2026-0142</span></div>
          <div className="mt-hero__row"><Badge tone="info">Under review</Badge><AvatarGroup size={36} max={3} names={["Paolo Dizon", "Liza Manalastas", "Ramon Cruz"]} /></div>
          <CaseTimeline label="Case progress" events={[
            { title: "Report filed", actor: "Paolo Dizon", date: "Oct 28", state: "done" },
            { title: "Assigned to Program Chair", actor: "Prof. Liza Manalastas", date: "Oct 29", state: "done" },
            { title: "Consultation scheduled", date: "Nov 3", state: "current" },
          ]} />
        </div>
      </div>
    </section>
  );
}
