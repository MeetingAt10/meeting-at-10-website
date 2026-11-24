"use client";
import { useEffect, useRef } from "react";

const sections = [
  ["about", "About"], ["projects", "Projects"], ["architecture", "Architecture"], ["timeline", "Process"],
  ["team", "Team"], ["stats", "The numbers"], ["contact", "Contact"],
] as const;

/** A page index follows reading progress without covering the content. */
export function ScrollIndex() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const off = matchMedia("(prefers-reduced-motion: reduce), (max-width: 1199px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      el.hidden = off.matches;
      if (off.matches) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      el.style.setProperty("--progress", String(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0));
      let active: string = "start";
      let label: string = "Start";
      for (const [id, name] of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= innerHeight * .45) { active = id; label = name; }
      }
      el.dataset.section = active;
      const output = el.querySelector<HTMLElement>(".mt-scroll-index__current");
      if (output) output.textContent = label;
    };
    const request = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    off.addEventListener("change", request);
    request();
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", request); removeEventListener("resize", request); off.removeEventListener("change", request); };
  }, []);
  return <div ref={ref} className="mt-scroll-index" data-section="start" aria-hidden="true" hidden>
    <span className="mt-scroll-index__caption">ON THE PAGE</span>
    <span className="mt-scroll-index__rail"><span className="mt-scroll-index__fill" /><span className="mt-scroll-index__marker" /></span>
    <span className="mt-scroll-index__current">Start</span>
  </div>;
}
