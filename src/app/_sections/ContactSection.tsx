import { Icon, Reveal } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

const links = [
  { label: "ACCS landing", note: "What ACCS is and who it is for", href: sites.landing },
  { label: "Sign in", note: "For QCU students, professors and staff", href: `${sites.portal}/sign-in` },
  { label: "Create account", note: "Register for ACCS with a QCU email", href: `${sites.portal}/register` },
  { label: "Design system", note: "Components, tokens and guidelines", href: sites.design },
  { label: "GitHub", note: "github.com/MeetingAt10", href: "https://github.com/MeetingAt10" },
];

export function ContactSection() {
  return (
    <section id="contact" className="mt-section mt-band mt-contact" aria-labelledby="contact-title">
      <Reveal><h2 id="contact-title" className="mt-h2">Where to find the work</h2><p className="mt-body">ACCS is live, the components are in the design system and the code is on GitHub. Pick where to start.</p></Reveal>
      <ul className="mt-links">
        {links.map((l, i) => (
          <Reveal as="li" key={l.href} index={i}>
            <a href={l.href} className="mt-link"><span className="mt-link__label">{l.label}</span><span className="mt-link__note">{l.note}</span><Icon name="arrow-up-right" size={24} /></a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
