"use client";
import { useEffect, useRef, useState } from "react";
import { Icon, Logo } from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="mt-nav" data-open={open}>
      <div className="mt-nav__bar">
        <a href="#main" className="mt-nav__brand" aria-label="Meeting At 10 home"><Logo inverse /></a>
        <nav aria-label="Primary" className="mt-nav__links">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <div className="mt-nav__actions"><a className="mt-nav__cta" href={sites.landing}>Visit ACCS <span aria-hidden="true">↗</span></a></div>
        <button ref={toggle} type="button" className="mt-nav__toggle" aria-expanded={open} aria-controls="mt-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><Icon name={open ? "x" : "list"} size={24} /></button>
      </div>
      <div className="mt-nav__scrim" aria-hidden="true" onClick={() => setOpen(false)} />
      <div id="mt-menu" className="mt-nav__menu" inert={!open}>
        <nav aria-label="Mobile">{links.map((link, i) => <a key={link.href} href={link.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>
        <a className="mt-nav__cta" href={sites.landing}>Visit ACCS <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}
