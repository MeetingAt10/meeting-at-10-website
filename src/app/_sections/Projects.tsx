import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { sites } from '@/lib/sites';
import { Slot } from '../_components/slot';

const steps = [
  { title: 'Report filed', meta: 'Paolo Dizon, Oct 28', state: 'done' },
  { title: 'Guidance notified', meta: 'Oct 29', state: 'done' },
  { title: 'Follow-up', meta: 'Nov 4', state: 'next' },
];

export function Projects() {
  return <Slot id="projects" time="10:30" title="Build" note="Pairs, one task each" from="var(--t1030)" to="var(--t1230)" count={8} label="projects-title" className="projects">
    <h2 id="projects-title">What we ship</h2>
    <div className="blocks">
      <article className="block block--main">
        <div>
          <h3>ACCS</h3>
          <p>The college workspace for forums, consultation scheduling, concern reports and cases, evaluations, records and administration. Each person sees only the tools they can use.</p>
          <a className="pill pill--paper" href={`${sites.portal}/sign-in`}>Sign in<ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>
        </div>
        <ol className="block__case" aria-label="Case progress">{steps.map(step => <li key={step.title} data-state={step.state}><strong>{step.title}</strong><span>{step.meta}</span></li>)}</ol>
      </article>
      <article className="block block--ink">
        <h3>ACCS landing</h3>
        <p>The public entry point. It explains ACCS and sends each person to the right place.</p>
        <a className="pill pill--paper" href={sites.landing}>Visit ACCS<ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>
      </article>
      <article className="block block--paper">
        <h3>Office Hours design system</h3>
        <p>One component library and one set of tokens behind the ACCS workspace. A button, a table and a timetable look and behave the same on every screen.</p>
        <a className="pill" href={sites.design}>Read the design system<ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>
      </article>
    </div>
  </Slot>;
}
