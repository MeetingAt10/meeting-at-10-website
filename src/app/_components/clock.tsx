'use client';
import { useState } from 'react';
import { memberId, members } from '../../data/team';

const ticks = Array.from({ length: 60 }, (_, index) => index);
const place = (hour: number, radius = 36.5) => {
  const angle = (hour / 12) * 2 * Math.PI;
  return { left: `${(50 + radius * Math.sin(angle)).toFixed(3)}%`, top: `${(50 - radius * Math.cos(angle)).toFixed(3)}%` };
};
/** The angle closest to the hand's resting place at 10 o'clock, so it never sweeps the long way round. */
const swing = (hour: number) => (hour * 30 < 120 ? hour * 30 + 360 : hour * 30);

export function Hands() {
  return <>
    <g className="clock__hour"><rect x="-17" y="-235" width="34" height="290" rx="8" /></g>
    <g className="clock__minute"><rect x="-10" y="-330" width="20" height="400" rx="6" /></g>
    <g className="clock__second"><rect x="-4" y="-380" width="8" height="470" /><circle cy="-262" r="24" /></g>
    <circle className="clock__pin" r="22" />
  </>;
}

/** Eleven surnames and one meeting make twelve marks. Hover or focus a name and the hour hand swings to it. */
export function Clock() {
  const [active, setActive] = useState<(typeof members)[number] | null>(null);
  return <div id="clock" className="clock" data-swing={!!active} style={active ? { '--swing': `${swing(active.hour)}deg` } as React.CSSProperties : undefined}>
    <svg className="clock__face" viewBox="-500 -500 1000 1000" aria-hidden="true">
      <circle className="clock__disc" r="498" />
      {ticks.map(tick => <rect key={tick} className="clock__tick" data-hour={tick % 5 === 0} x={tick % 5 === 0 ? -5 : -2} y="-484" width={tick % 5 === 0 ? 10 : 4} height={tick % 5 === 0 ? 34 : 16} transform={`rotate(${tick * 6})`} />)}
      <Hands />
    </svg>
    <ul className="clock__marks" aria-label="The team on a clock face">
      {members.map(member => <li key={member.name} style={place(member.hour)}>
        <a href={`#${memberId(member.name)}`} onPointerEnter={() => setActive(member)} onPointerLeave={() => setActive(null)} onFocus={() => setActive(member)} onBlur={() => setActive(null)}>{member.name}</a>
      </li>)}
      <li className="clock__meeting" style={place(10)}><span aria-label="The meeting holds 10 o'clock">10</span></li>
    </ul>
    <p className="clock__dial" aria-live="polite">{active ? active.role : 'Eleven students, one meeting'}</p>
  </div>;
}
