import { sites } from '@/lib/sites';
import { Logo } from '../_components/logo';

const sunset = ['#ff7a45', '#e85c52', '#b8436a', '#7d3475', '#4a2a6e', '#1f2259', '#0c1c48'];

export function Footer() {
  return <footer className="footer">
    <div className="footer__sunset" aria-hidden="true">{sunset.map(color => <i key={color} style={{ background: color }} />)}</div>
    <div className="footer__body">
      <p className="footer__line">See you at 10.</p>
      <div className="footer__grid">
        <div><Logo /><p>Eleven students at the QCU College of Computer Studies, building ACCS.</p></div>
        <nav aria-label="Page"><h2>Site</h2><a href="#about">About</a><a href="#team">Team</a><a href="#projects">Projects</a><a href="#architecture">Architecture</a><a href="#contact">Contact</a></nav>
        <nav aria-label="Projects"><h2>Projects</h2><a href={sites.landing}>ACCS landing</a><a href={`${sites.portal}/sign-in`}>Sign in</a><a href={sites.design}>Design system</a></nav>
        <nav aria-label="Elsewhere"><h2>Elsewhere</h2><a href="https://github.com/MeetingAt10">GitHub</a></nav>
      </div>
    </div>
  </footer>;
}
