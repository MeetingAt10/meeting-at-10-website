import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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
  const destinations = new Set([configuredSites.landing, configuredSites.design, `${configuredSites.portal}/sign-in`]);
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

test("every decorative image has dimensions, empty alt text and an exported file", () => {
  const images = [...markup.matchAll(/<img\b[^>]*>/g)].map(([tag]) => attributes(tag));
  assert.ok(images.length >= 7);
  for (const image of images) {
    assert.ok(Number(image.width) > 0, image.src);
    assert.ok(Number(image.height) > 0, image.src);
    assert.equal(image.alt, "", image.src);
    assert.ok(image.src.startsWith("/imagery/"), image.src);
    assert.ok(existsSync(path.join("out", image.src)), image.src);
  }
  assert.ok(images.some((image) => image.loading === "eager" && image.fetchPriority === "high"));
});

test("landmarks, the fixed illustrative day and motion primitives survive static export", () => {
  assert.equal([...markup.matchAll(/<h1\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<main\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<footer\b/g)].length, 1);
  assert.match(markup, /Skip to content/);
  for (const id of ["main", "work", "process", "team", "day"]) assert.match(markup, new RegExp(`id="${id}"`));
  for (const text of ["10:00", "Standup", "Build", "Review", "Ship", "not a live schedule"]) assert.ok(markup.includes(text), text);
  for (const cls of ["ds-word-rise", "ds-reveal", "ds-marquee", "ds-scroll-progress", "ds-spotlight", "ds-aurora", "ds-grid-backdrop"]) assert.ok(markup.includes(cls), cls);
  assert.match(markup, /aria-hidden="true" inert=""/);
  assert.doesNotMatch(markup, /Coming soon/i);
});
