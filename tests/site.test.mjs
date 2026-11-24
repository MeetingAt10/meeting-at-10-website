import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
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
  for (const [id, value] of Object.entries({ modules: 58, stories: 58, cases: 183, sites: 4 })) {
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

test("the exported roster uses the intended local portraits", () => {
  const expected = new Map([
    ["Reyes", ["reyes", 480]], ["Dela Cruz", ["dela-cruz", 480]], ["Jumuad", ["jumuad", 400]],
    ["Sebial", ["sebial", 480]], ["Añonuevo", ["anonuevo", 480]], ["Balili", ["balili", 480]],
    ["Alaña", ["alana", 480]], ["Belardo", ["belardo", 480]], ["Comawas", ["comawas", 480]],
    ["Magpantay", ["magpantay", 300]], ["Suico", ["suico", 480]],
  ]);
  for (const [, tag, content] of markup.matchAll(/(<article\b[^>]*data-member="[^"]*"[^>]*>)([\s\S]*?)<\/article>/g)) {
    const member = attributes(tag)["data-member"];
    const [name, size] = expected.get(member);
    const image = content.match(/<img\b[^>]*>/)?.[0];
    assert.ok(image, `${member} has a portrait`);
    const attrs = attributes(image);
    assert.equal(attrs.src, `/portraits/${name}.webp`, member);
    assert.equal(Number(attrs.width), size, member);
    assert.equal(Number(attrs.height), size, member);
    assert.ok(existsSync(`out${attrs.src}`), `${member} portrait is in the export`);
  }
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

test("landmarks, the fixed illustrative day and motion primitives survive static export", () => {
  assert.equal([...markup.matchAll(/<h1\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<main\b/g)].length, 1);
  assert.equal([...markup.matchAll(/<footer\b/g)].length, 1);
  assert.match(markup, /Skip to content/);
  for (const id of ["main", "about", "projects", "architecture", "timeline", "team", "stats", "contact"]) assert.match(markup, new RegExp(`id="${id}"`));
  for (const text of ["10:00", "Standup", "Build", "Review", "Ship"]) assert.ok(markup.includes(text), text);
  for (const cls of ["ds-reveal", "mt-roster", "mt-orbit__center", "mt-orbit__portrait"]) assert.ok(markup.includes(cls), cls);
  assert.doesNotMatch(markup, /Coming soon|prototype|synthetic|sample data/i);
  assert.equal([...markup.matchAll(/class="mt-orbit__portrait"/g)].length, 11);
  assert.doesNotMatch(markup, /mt-courier|data-dock|mt-board|mt-scroll-index|\/landing\/(starfield|horizon)/);
});
