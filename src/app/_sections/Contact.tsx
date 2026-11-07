import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { sites } from '@/lib/sites';
import { Slot } from '../_components/slot';

const links = [
  { label: 'ACCS landing', note: 'What ACCS is and who it is for', href: sites.landing },
  { label: 'Sign in', note: 'For QCU students, professors and staff', href: `${sites.portal}/sign-in` },
  { label: 'Design system', note: 'Components, tokens and guidelines', href: sites.design },
  { label: 'GitHub', note: 'github.com/MeetingAt10', href: 'https://github.com/MeetingAt10' },
];

export function Contact() {
  return <Slot id="contact" time="16:00" title="Ship" note="Tag, deploy, write it down" from="var(--t1600)" to="var(--t1700)" count={4} label="contact-title" className="ship">
    <h2 id="contact-title">Where to find the work</h2>
    <p className="ship__lead">ACCS is live, the components are in the design system and the code is on GitHub. Pick where to start.</p>
    <ul>{links.map(link => <li key={link.href}><a href={link.href}><strong>{link.label}</strong><span>{link.note}</span><ArrowUpRight className="ship__arrow" weight="bold" aria-hidden="true" /></a></li>)}</ul>
  </Slot>;
}
