import { Slot } from '../_components/slot';

const hours = [10, 11, 12, 13, 14, 15, 16, 17];
/** Times are quarter hours after 10:00. */
const sheet = [
  { title: 'Standup', meta: 'Everyone, 15 minutes', start: 0, span: 2, kind: 'block', href: '#about' },
  { title: 'Build', meta: 'Pairs, one task each', start: 2, span: 8, kind: 'block', href: '#projects' },
  { title: 'Lunch', meta: 'Away', start: 10, span: 4, kind: 'sun', href: '#lunch' },
  { title: 'Review', meta: 'Walk through what changed', start: 14, span: 6, kind: 'block', href: '#architecture' },
  { title: 'Check', meta: 'Before anything leaves', start: 20, span: 2, kind: 'block', href: '#timeline' },
  { title: 'Write-up', meta: 'Count what shipped', start: 22, span: 2, kind: 'block', href: '#stats' },
  { title: 'Ship', meta: 'Tag, deploy, write it down', start: 24, span: 4, kind: 'ember', href: '#contact' },
];

export function About() {
  return <Slot id="about" time="10:00" title="Standup" note="Everyone, 15 minutes" from="var(--t1000)" to="var(--t1000)" count={1} label="about-title" className="about">
    <h2 id="about-title">Eleven students and one standing meeting</h2>
    <div className="about__text">
      <p>Meeting At 10 is a team of eleven at the Quezon City University College of Computer Studies. We write the specs, design the interface, build the code and run ACCS, the workspace for CCS forums, consultations and concern reports.</p>
      <p>The day opens with a standup at 10:00. Pairs build until lunch and walk through what changed after it. Each day ends with a tagged release and a written note.</p>
    </div>
    <figure className="sheet">
      <div className="sheet__grid">
        {hours.map((hour, index) => <span key={hour} className="sheet__hour" style={{ gridRow: index * 4 + 1 }}>{hour}:00</span>)}
        {sheet.map(item => <a key={item.title} href={item.href} className="sheet__event" data-kind={item.kind} style={{ gridRow: `${item.start + 1} / span ${item.span}` }}><strong>{item.title}</strong><span>{item.meta}</span></a>)}
        <span className="sheet__now" aria-hidden="true" />
      </div>
      <figcaption>This page keeps the same day. The clock in the top bar moves as you scroll.</figcaption>
    </figure>
  </Slot>;
}
