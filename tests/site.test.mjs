import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const html = readFileSync("out/index.html", "utf8");
const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const expectedTeam = new Map([
  ["Alaña", "Documentation, Researcher"], ["Añonuevo", "System Analyst"],
  ["Balili", "Documentation Head, Researcher"], ["Belardo", "Documentation, Researcher"],
  ["Comawas", "Documentation, Researcher"], ["Dela Cruz", "Fullstack Developer"],
  ["Jumuad", "Project Manager, Backend Developer"], ["Magpantay", "Finance Head"],
  ["Reyes", "Lead Developer"], ["Sebial", "UI/UX Developer"], ["Suico", "Logistics"],
]);
const configuredSites = Object.fromEntries([...readFileSync("src/lib/sites.ts", "utf8").matchAll(/(\w+):\s*process\.env\.(NEXT_PUBLIC_\w+_URL)\s*\?\?\s*['"]([^'"]+)['"]/g)].map(([, key, env, fallback]) => [key, process.env[env] ?? fallback]));

test("the exported team contains the eleven specified surnames and exact roles", () => {
  const members = [...markup.matchAll(/<article\b[^>]*data-member="[^"]*"[^>]*>/g)].map(([tag]) => attributes(tag));
  assert.equal(members.length, 11);
  assert.equal(new Set(members.map((member) => member["data-member"])).size, 11);
  for (const member of members) assert.equal(member["data-role"], expectedTeam.get(member["data-member"]), member["data-member"]);
  assert.doesNotMatch(markup, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|mailto:/i);
});

test("sourced specification counts are present in the exported page", () => {
  for (const [id, value] of Object.entries({ modules: 58, stories: 58, cases: 183, sites: 10 })) {
    const count = markup.match(new RegExp(`<dd\\b[^>]*data-count="${id}"[^>]*>[\\s\\S]*?<\\/dd>`))?.[0];
    assert.ok(count, id);
    assert.equal(Number(attributes(count)["data-value"]), value, id);
    assert.ok(count.includes(`>${value}<`), `${id} has its final value in static HTML`);
  }
  assert.equal(Object.keys(configuredSites).length, 10);
  for (const source of ["DOC003", "DOC004", "DOC005", "accs-dev CloudFormation"]) assert.ok(markup.includes(source), source);
});

test("all ecosystem links use configured destinations and every page anchor exists", () => {
  assert.equal(Object.keys(configuredSites).length, 10);
  const destinations = new Set([configuredSites.landing, configuredSites.design, `${configuredSites.portal}/sign-in`, `${configuredSites.portal}/register`, "https://github.com/MeetingAt10"]);
  const ids = new Set([...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => decode(id)));
  const external = [];
  for (const [, rawHref] of markup.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const href = decode(rawHref);
    if (href.startsWith("#")) assert.ok(ids.has(href.slice(1)), href);
    else if (/^https?:/.test(href)) { assert.ok(destinations.has(href), href); external.push(href); }
    else assert.equal(href, "/");
  }
  for (const destination of destinations) assert.ok(external.includes(destination), destination);
  assert.doesNotMatch(markup, /access-ccs\.com/);
});

test("the page ships no decorative render files", () => {
  assert.doesNotMatch(markup, /\/imagery\//);
});

test("static export never links to the admin, records or cases consoles", () => {
  const origins = ["admin", "records", "cases"].map((key) => new URL(configuredSites[key]).origin);
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".html") ? [path.join(dir, e.name)] : []);
  for (const file of walk("out")) {
    const page = readFileSync(file, "utf8");
    for (const origin of origins) assert.ok(!page.includes(`href="${origin}`), `${file} links to ${origin}`);
  }
});

test("landmarks, the fixed illustrative day and motion primitives survive static export", () => {
  assert.equal([...markup.matchAll(/<h1\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<main\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<footer\b/g)].length, 1);
  assert.match(markup, /Skip to content/);
  for (const id of ["main", "about", "projects", "architecture", "timeline", "team", "stats", "contact"]) assert.match(markup, new RegExp(`id="${id}"`));
  for (const text of ["10:00", "Standup", "Build", "Review", "Ship"]) assert.ok(markup.includes(text), text);
  for (const cls of ["ds-word-rise", "ds-reveal", "ds-scroll-progress", "ds-spotlight", "ds-aurora", "ds-grid-backdrop"]) assert.ok(markup.includes(cls), cls);
  assert.doesNotMatch(markup, /Coming soon|prototype|synthetic|sample data/i);
});
