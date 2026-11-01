import { Logo } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

export function Footer() {
  return (
    <footer className="mt-footer">
      <div className="mt-footer__inner">
        <div className="mt-footer__brand"><Logo /><p>Eleven students at the QCU College of Computer Studies, building ACCS.</p></div>
        <nav aria-label="Page"><h2>Site</h2><a href="#about">About</a><a href="#projects">Projects</a><a href="#architecture">Architecture</a><a href="#team">Team</a><a href="#contact">Contact</a></nav>
        <nav aria-label="Projects"><h2>Projects</h2><a href={sites.landing}>ACCS landing</a><a href={`${sites.portal}/sign-in`}>Sign in</a><a href={sites.design}>Design system</a></nav>
        <nav aria-label="Elsewhere"><h2>Elsewhere</h2><a href="https://github.com/MeetingAt10">GitHub</a></nav>
      </div>
    </footer>
  );
}
