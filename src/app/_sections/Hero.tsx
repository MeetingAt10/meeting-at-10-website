import { Fragment } from "react";
import { Aurora, AvatarGroup, Badge, Button, CaseTimeline, GridBackdrop } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

const words: [string, string?][] = [["We"], ["meet"], ["at"], ["10", "."], ["Then"], ["we"], ["ship", "."]];

export function Hero() {
  return (
    <section className="mt-hero" aria-labelledby="hero-title">
      <Aurora /><GridBackdrop />
      <div className="mt-hero__copy">
        <div id="hero-title" className="mt-hero__title">
          <h1 className="ds-word-rise">
            <span className="ds-visually-hidden">We meet at 10. Then we ship.</span>
            <span aria-hidden="true">
              {words.map(([word, punct], i) => (
                <Fragment key={word}>{i > 0 && " "}<span className="ds-word-rise__word" style={{ "--i": i } as React.CSSProperties}><span>{word}{punct && <span className="punct">{punct}</span>}</span></span></Fragment>
              ))}
            </span>
          </h1>
        </div>
        <p className="mt-hero__lead" data-seq="1">Eleven students building ACCS, the live college workspace for QCU Computer Studies.</p>
        <div className="mt-hero__actions" data-seq="2">
          <Button href={sites.landing} size="lg" iconEnd="arrow-up-right">See ACCS</Button>
          <Button href="#architecture" size="lg" variant="secondary">How it is built</Button>
        </div>
      </div>
      <div className="mt-hero__visual" data-seq="0">
        <div className="mt-glass mt-hero__window">
          <div className="mt-hero__chrome"><span>Cases</span><span className="mt-mono">CCS-2026-0142</span></div>
          <div className="mt-hero__row">
            <Badge tone="info">Under review</Badge>
            <AvatarGroup size={36} max={3} names={["Paolo Dizon", "Liza Manalastas", "Ramon Cruz"]} />
          </div>
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
