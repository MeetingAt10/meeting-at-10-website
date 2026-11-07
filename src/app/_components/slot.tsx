import type { ReactNode } from 'react';

/** One 15 minute color band per slot, mixed between the sky at the start and end of the section. */
export function bands(from: string, to: string, count: number) {
  if (count < 2) return from;
  const stops = Array.from({ length: count }, (_, index) => {
    const color = `color-mix(in oklab, ${to} ${Math.round((index / (count - 1)) * 100)}%, ${from})`;
    return `${color} ${(index / count) * 100}% ${((index + 1) / count) * 100}%`;
  });
  return `linear-gradient(to bottom, ${stops.join(', ')})`;
}

export function Slot({ id, time, title, note, from, to, count, label, className = '', children }: {
  id: string; time: string; title: string; note?: string; from: string; to: string; count: number; label: string; className?: string; children: ReactNode;
}) {
  return <section id={id} className={`slot ${className}`} style={{ background: bands(from, to, count) }} aria-labelledby={label}>
    <div className="slot__rail">
      <time>{time}</time>
      <strong>{title}</strong>
      {note && <span>{note}</span>}
    </div>
    <div className="slot__body">{children}</div>
  </section>;
}
