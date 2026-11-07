'use client';
import { useRef } from 'react';
import { ArrowUpRight, List } from '@phosphor-icons/react/dist/ssr';
import { sites } from '@/lib/sites';
import { DayClock } from '../_components/day-clock';
import { Logo } from '../_components/logo';

const links = [
  { label: 'About', href: '#about' }, { label: 'Team', href: '#team' }, { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' }, { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const menu = useRef<HTMLDivElement>(null);
  return <header className="nav">
    <a href="#main" className="nav__brand" aria-label="Meeting At 10 home"><Logo /></a>
    <nav aria-label="Primary" className="nav__links">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
    <DayClock />
    <a className="pill nav__visit" href={sites.landing}>Visit ACCS<ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>
    <button type="button" className="nav__toggle" popoverTarget="menu" aria-label="Menu"><List size={26} weight="bold" aria-hidden="true" /></button>
    <div id="menu" className="menu" popover="auto" ref={menu}>
      <nav aria-label="Mobile">{links.map(link => <a key={link.href} href={link.href} onClick={() => menu.current?.hidePopover()}>{link.label}</a>)}</nav>
      <a className="pill" href={sites.landing}>Visit ACCS<ArrowUpRight size={18} weight="bold" aria-hidden="true" /></a>
    </div>
  </header>;
}
