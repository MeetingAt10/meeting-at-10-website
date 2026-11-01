"use client";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import data from "@/data/modules.json";

const { modules, subdomains, roles } = data;
const nameOf = Object.fromEntries(subdomains.map((s) => [s.id, s.name]));

const mobileQuery = "(max-width: 859px)";
const subscribe = (cb: () => void) => { const m = matchMedia(mobileQuery); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); };
const useIsMobile = () => useSyncExternalStore(subscribe, () => matchMedia(mobileQuery).matches, () => false);

function Chips({ label, value, onChange, items, group }: { label: string; value: string; onChange: (v: string) => void; items: { id: string; name: string; count: number }[]; group: string }) {
  return (
    <div role="group" aria-label={label} className="mt-chips">
      <LayoutGroup id={group}>
        {items.map((item) => (
          <button key={item.id} type="button" className="mt-chip" aria-pressed={value === item.id} onClick={() => onChange(item.id)}>
            {value === item.id && <motion.span layoutId="pill" className="mt-chip__pill" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
            <span className="mt-chip__label">{item.name}<span className="mt-chip__count mt-mono">{item.count}</span></span>
          </button>
        ))}
      </LayoutGroup>
    </div>
  );
}

export function ModuleExplorer() {
  const [site, setSite] = useState("all");
  const [role, setRole] = useState("all");
  const [all, setAll] = useState(false);
  const limit = useIsMobile() ? 6 : 12;
  const matches = modules.filter((m) => (site === "all" || m.site === site) && (role === "all" || m.role === role));
  const visible = all ? matches : matches.slice(0, limit);
  const inRole = (m: (typeof modules)[number]) => role === "all" || m.role === role;
  const inSite = (m: (typeof modules)[number]) => site === "all" || m.site === site;
  const siteItems = [{ id: "all", name: "All subdomains", count: modules.filter(inRole).length }, ...subdomains.map((s) => ({ ...s, count: modules.filter((m) => m.site === s.id && inRole(m)).length }))];
  const roleItems = [{ id: "all", name: "Any role", count: modules.filter(inSite).length }, ...roles.map((r) => ({ id: r, name: r, count: modules.filter((m) => m.role === r && inSite(m)).length }))];
  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-explorer">
        <div className="mt-explorer__controls">
          <Chips label="Filter by subdomain" group="site" value={site} onChange={setSite} items={siteItems} />
          <Chips label="Filter by role" group="role" value={role} onChange={setRole} items={roleItems} />
        </div>
        <p className="mt-explorer__count" role="status" aria-live="polite"><span className="mt-mono">{matches.length}</span> of {modules.length} modules</p>
        <motion.ul layout className="mt-modules">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((m) => (
              <motion.li key={m.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="mt-module">
                <span className="mt-module__code mt-mono">{m.id}</span>
                <span className="mt-module__name">{m.name}</span>
                <span className="mt-module__meta">{nameOf[m.site]} · {m.role}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {matches.length === 0 && <p className="mt-explorer__empty">No module matches this subdomain and role. Choose another role.</p>}
        {matches.length > limit && (
          <button type="button" className="mt-explorer__more" aria-expanded={all} onClick={() => setAll(!all)}>
            {all ? "Show fewer modules" : `Show all ${matches.length} modules`}
          </button>
        )}
      </div>
    </MotionConfig>
  );
}
