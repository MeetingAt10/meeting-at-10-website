'use client';
import { useEffect, useRef } from 'react';
import { useScroll } from 'motion/react';
import { Hands } from './clock';

/** Section starts in minutes after midnight. Scrolling between two sections moves the clock between their times. */
const schedule: [string, number][] = [['#about', 600], ['#team', 615], ['#projects', 630], ['#lunch', 750], ['#architecture', 810], ['#timeline', 900], ['#stats', 930], ['#contact', 960]];
const dayEnd = 1020;
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const format = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(Math.floor(minutes % 60)).padStart(2, '0')}`;

export function DayClock() {
  const { scrollY } = useScroll();
  const disc = useRef<SVGSVGElement>(null);
  const time = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const big = document.getElementById('clock');
    const slot = big?.parentElement;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let anchors: [number, number][] = [];
    let dockEnd = 1, dx = 0, dy = 0, scale = 1;

    const measure = () => {
      const y = scrollY.get();
      const lead = innerHeight * .2;
      anchors = [[0, 600], ...schedule.map(([selector, minutes]): [number, number] => [(document.querySelector(selector)?.getBoundingClientRect().top ?? 0) + y - lead, minutes]), [root.scrollHeight - innerHeight, dayEnd]];
      if (slot && disc.current) {
        const from = slot.getBoundingClientRect();
        const to = disc.current.getBoundingClientRect();
        dockEnd = Math.max(1, from.bottom + y - to.bottom - 40);
        dx = to.left + to.width / 2 - (from.left + from.width / 2);
        dy = to.top + to.height / 2 - (from.top + y + from.height / 2);
        scale = to.width / from.width;
      }
    };

    const update = (y: number) => {
      let minutes = 600;
      for (let i = 0; i < anchors.length - 1; i++) {
        const [start, from] = anchors[i], [end, to] = anchors[i + 1];
        if (y >= start) minutes = end > start ? from + (to - from) * clamp((y - start) / (end - start)) : to;
      }
      disc.current?.style.setProperty('--min', minutes.toFixed(1));
      if (time.current) time.current.textContent = format(minutes);
      root.dataset.scrolled = String(y > 24);
      root.dataset.night = String(minutes >= dayEnd - 8);

      const progress = clamp(y / dockEnd);
      const eased = progress * progress * (3 - 2 * progress);
      // The clock shrinks ahead of its travel, so it is small by the time it reaches the top bar.
      const shrink = progress ** .7;
      const shrunk = shrink * shrink * (3 - 2 * shrink);
      root.dataset.docked = String(progress >= 1);
      if (big && !still) {
        big.style.transform = eased ? `translate3d(${dx * eased}px, ${eased * (dy + y)}px, 0) scale(${1 + (scale - 1) * shrunk})` : '';
        big.style.setProperty('--marks', String(clamp(1 - shrunk * 2.2)));
        big.dataset.moving = String(eased > 0);
      }
    };

    measure();
    update(scrollY.get());
    const unsubscribe = scrollY.on('change', update);
    const observer = new ResizeObserver(() => { measure(); update(scrollY.get()); });
    observer.observe(document.body);
    return () => { unsubscribe(); observer.disconnect(); };
  }, [scrollY]);

  return <div className="dayclock" aria-hidden="true">
    <svg ref={disc} className="clock__face dayclock__disc" viewBox="-500 -500 1000 1000" width="40" height="40">
      <circle className="clock__disc" r="498" />
      <Hands />
    </svg>
    <span ref={time} className="dayclock__time">10:00</span>
  </div>;
}
