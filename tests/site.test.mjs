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
  for (const [id, value] of Object.entries({ stories: 58, cases: 183, sites: 4 })) {
    const count = markup.match(new RegExp(`<dd\\b[^>]*data-count="${id}"[^>]*>[\\s\\S]*?<\\/dd>`))?.[0];
    assert.ok(count, id);
    assert.equal(Number(attributes(count)["data-value"]), value, id);
    assert.ok(count.includes(`>${value}<`), `${id} has its final value in static HTML`);
  }
  assert.equal(Object.keys(configuredSites).length, 4);
  const visible = markup.replace(/<script[\s\S]*?<\/script>/g, "");
  assert.doesNotMatch(visible, /DOC0\d\d/);
  assert.doesNotMatch(visible, /\b(ALL|STU|ORG|PRO|STF|CHR|DEAN|GUD|OSAS|PRES|ADM)-\d{2}\b/);
  assert.ok(!visible.includes("CloudFormation"));
});

test("all ecosystem links use configured destinations and every page anchor exists", () => {
  assert.equal(Object.keys(configuredSites).length, 4);
  const destinations = new Set([configuredSites.landing, configuredSites.design, `${configuredSites.portal}/sign-in`, "https://github.com/MeetingAt10"]);
  const ids = new Set([...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => decode(id)));
  const external = [];
  for (const [, rawHref] of markup.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const href = decode(rawHref);
    if (href.startsWith("#")) assert.ok(ids.has(href.slice(1)), href);
    else if (/^https?:/.test(href)) { assert.ok(destinations.has(href), href); external.push(href); }
    else assert.equal(href, "/");
  }
  for (const destination of destinations) assert.ok(external.includes(destination), destination);
  assert.ok(!external.some((href) => href.includes("/register")), "no link to /register");
});

test("the page ships no decorative render files", () => {
  assert.doesNotMatch(markup, /\/imagery\//);
});

test("static export never links to the admin, records or cases consoles", () => {
  const consoles = ["/admin", "/records", "/cases"].map((route) => `href="${configuredSites.portal}${route}`);
  const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".html") ? [path.join(dir, e.name)] : []);
  for (const file of walk("out")) {
    const page = readFileSync(file, "utf8");
    for (const link of consoles) assert.ok(!page.includes(link), `${file} has ${link}`);
  }
});

test("landmarks and the working day survive static export", () => {
  assert.equal([...markup.matchAll(/<h1\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<main\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<footer\b/g)].length, 1);
  assert.match(markup, /Skip to content/);
  for (const id of ["main", "about", "projects", "architecture", "timeline", "team", "stats", "contact"]) assert.match(markup, new RegExp(`id="${id}"`));
  for (const text of ["10:00", "Standup", "Build", "Review", "Ship"]) assert.ok(markup.includes(text), text);
  assert.doesNotMatch(markup, /Coming soon|prototype|synthetic|sample data/i);
});

test("the site does not use the design system", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.ok(!("@meetingat10/design-system" in pkg.dependencies));
  assert.doesNotMatch(markup, /class="[^"]*\bds-/);
});

test("the clock face has twelve marks: eleven members and the meeting", () => {
  const face = markup.match(/<ul\b[^>]*class="clock__marks"[^>]*>[\s\S]*?<\/ul>/)?.[0];
  assert.ok(face);
  assert.equal([...face.matchAll(/<li\b/g)].length, 12);
  for (const name of expectedTeam.keys()) assert.ok(decode(face).includes(`>${name}<`), name);
  assert.match(face, /clock__meeting/);
});

test("visible copy has no em or en dashes and does not claim this site uses the design system", () => {
  const text = decode(markup.replace(/<[^>]+>/g, " "));
  assert.doesNotMatch(text, /[\u2013\u2014]/);
  assert.doesNotMatch(text, /and this one/);
});

test("module and role lists stay off this site", () => {
  const text = decode(markup.replace(/<[^>]+>/g, " "));
  assert.doesNotMatch(text, /\bmodules?\b/i);
  assert.doesNotMatch(text, /\broles?\b/i);
});
