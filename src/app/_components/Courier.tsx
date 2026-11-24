"use client";

import { useEffect, useRef } from "react";

const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** A meeting card travels between sections and changes to suit each stop. */
export function Courier() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const off = matchMedia("(prefers-reduced-motion: reduce), (max-width: 1023px)");
    let raf = 0;
    let last = 0;
    let shown: { x: number; y: number; tilt: number } | null = null;
    const frame = (now: number) => {
      raf = 0;
      if (off.matches) { el.hidden = true; delete root.dataset.courier; shown = null; return; }
      const docks = [...document.querySelectorAll<HTMLElement>("[data-dock]")].filter((dock) => dock.offsetWidth > 0).map((dock) => {
        const box = dock.getBoundingClientRect();
        return { stage: dock.dataset.dock ?? "start", x: box.left + box.width / 2, y: box.top + box.height / 2, key: 0 };
      });
      if (!docks.length) return;
      docks.forEach((dock, i) => { dock.key = i ? Math.max(dock.y, docks[i - 1].key + 300) : dock.y; });
      el.hidden = false;
      root.dataset.courier = "on";
      const line = innerHeight * .55;
      const end = docks[docks.length - 1];
      let { x, y, stage } = docks[0];
      let tilt = 0;
      if (line >= end.key) ({ x, y, stage } = end);
      else if (line >= docks[0].key) {
        const i = docks.findIndex((dock, k) => k < docks.length - 1 && line >= dock.key && line < docks[k + 1].key);
        const a = docks[i], b = docks[i + 1];
        const t = smoother(Math.min(1, Math.max(0, ((line - a.key) / (b.key - a.key) - .2) / .6)));
        const arc = Math.sin(Math.PI * t);
        x = a.x + (b.x - a.x) * t;
        y = a.y + (b.y - a.y) * t - arc * 70;
        tilt = arc * (b.x >= a.x ? 14 : -14);
        stage = t < .5 ? a.stage : b.stage;
      }
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const follow = 1 - Math.exp(-dt / 120);
      shown ??= { x, y, tilt };
      shown.x += (x - shown.x) * follow;
      shown.y += (y - shown.y) * follow;
      shown.tilt += (tilt - shown.tilt) * follow;
      el.style.transform = `translate3d(${shown.x.toFixed(2)}px, ${shown.y.toFixed(2)}px, 0) rotate(${shown.tilt.toFixed(2)}deg)`;
      if (el.dataset.stage !== stage) el.dataset.stage = stage;
      if (Math.abs(x - shown.x) + Math.abs(y - shown.y) + Math.abs(tilt - shown.tilt) > .3) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const resize = new ResizeObserver(request);
    resize.observe(document.body);
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    off.addEventListener("change", request);
    request();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      removeEventListener("scroll", request);
      removeEventListener("resize", request);
      off.removeEventListener("change", request);
      delete root.dataset.courier;
    };
  }, []);

  return <div ref={ref} className="mt-courier" data-stage="start" aria-hidden="true" hidden>
    <div className="mt-courier__bob">
      <svg viewBox="0 0 160 130" className="mt-courier__art">
        <g data-shape="start"><rect className="mc-paper" x="20" y="19" width="120" height="92" rx="18" /><circle className="mc-tint" cx="80" cy="65" r="31" /><path className="mc-stroke" d="M80 45v20l14 9" /><text className="mc-small" x="80" y="105">MEETING AT 10</text></g>
        <g data-shape="about"><rect className="mc-paper" x="25" y="14" width="110" height="102" rx="14" /><path className="mc-fill" d="M25 28a14 14 0 0 1 14-14h82a14 14 0 0 1 14 14v12H25z" /><text className="mc-number" x="80" y="93">10:00</text></g>
        <g data-shape="projects"><rect className="mc-paper" x="34" y="7" width="92" height="116" rx="12" /><rect className="mc-fill" x="48" y="22" width="38" height="8" rx="4" /><path className="mc-line" d="M49 47h61M49 62h61M49 77h45" /><circle className="mc-fill" cx="112" cy="105" r="17" /><path className="mc-check" d="m104 105 5 5 10-11" /></g>
        <g data-shape="architecture"><rect className="mc-paper" x="13" y="18" width="134" height="94" rx="16" /><path className="mc-link" d="M42 65h76M80 43v44" /><circle className="mc-fill" cx="42" cy="65" r="11" /><circle className="mc-fill" cx="118" cy="65" r="11" /><circle className="mc-fill" cx="80" cy="43" r="11" /><circle className="mc-fill" cx="80" cy="87" r="11" /></g>
        <g data-shape="timeline"><rect className="mc-paper" x="15" y="24" width="130" height="82" rx="16" /><path className="mc-link" d="M36 65h88" />{[36, 58, 80, 102, 124].map((x) => <circle key={x} className="mc-fill" cx={x} cy="65" r="6" />)}<text className="mc-small" x="80" y="93">SPEC TO RELEASE</text></g>
        <g data-shape="team"><rect className="mc-paper" x="20" y="18" width="120" height="94" rx="16" /><circle className="mc-fill" cx="80" cy="49" r="13" /><circle className="mc-tint" cx="49" cy="55" r="10" /><circle className="mc-tint" cx="111" cy="55" r="10" /><path className="mc-fill" d="M56 92c0-17 10-27 24-27s24 10 24 27z" /><path className="mc-tint" d="M28 91c0-13 7-22 19-22 5 0 9 2 12 4-3 5-5 11-5 18zm78 0c0-7-2-13-5-18 3-2 7-4 12-4 12 0 19 9 19 22z" /></g>
        <g data-shape="stats"><rect className="mc-paper" x="21" y="16" width="118" height="98" rx="16" /><rect className="mc-tint" x="42" y="71" width="17" height="23" rx="4" /><rect className="mc-tint" x="71" y="51" width="17" height="43" rx="4" /><rect className="mc-fill" x="100" y="34" width="17" height="60" rx="4" /></g>
        <g data-shape="contact"><rect className="mc-fill" x="16" y="22" width="128" height="86" rx="16" /><text className="mc-white" x="34" y="70">ACCS</text><path className="mc-check" d="M110 75 126 59m-13 0h13v13" /></g>
      </svg>
    </div>
  </div>;
}
