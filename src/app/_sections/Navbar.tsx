"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Button, Icon, Logo } from "@meetingat10/design-system/react";
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
        <a href="#main" className="mt-nav__brand" aria-label="Meeting At 10 home"><Logo /></a>
        <nav aria-label="Primary" className="mt-nav__links">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="mt-nav__actions">
          <Button href={sites.landing} size="sm" iconEnd="arrow-up-right">Visit ACCS</Button>
          <button ref={toggle} type="button" className="mt-nav__toggle" aria-expanded={open} aria-controls="mt-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            <Icon name={open ? "x" : "list"} size={24} />
          </button>
        </div>
      </div>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
            <motion.nav id="mt-menu" aria-label="Mobile" className="mt-nav__menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mt-nav__menu-inner">
                {links.map((l, i) => (
                  <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>{l.label}</motion.a>
                ))}
                <Button href={sites.landing} block iconEnd="arrow-up-right">Visit ACCS</Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </MotionConfig>
    </header>
  );
}
