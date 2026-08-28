import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const home = await readFile(new URL("../index.html", import.meta.url), "utf8");
const root = new URL("../", import.meta.url);
const htmlFiles = (await readdir(root, { recursive: true })).filter((path) => path.endsWith(".html"));
const pages = await Promise.all(htmlFiles.map(async (path) => [path, await readFile(new URL(path, root), "utf8")]));

test("uses Refrigerator and no Squares font", () => {
  assert.doesNotMatch(css, /Squares/);
  assert.match(css, /font-family: "Refrigerator"/);
});

test("home uses the approved brand and has no Wiki CTA", () => {
  assert.match(home, /Art of War 3 Global Conflict/);
  assert.doesNotMatch(home, /Открыть Wiki/);
});

test("every public header uses the approved brand", () => {
  for (const [path, source] of pages.filter(([, source]) => source.includes('class="brand"'))) {
    assert.match(source, /<strong>Art of War 3 Global Conflict<\/strong>/, path);
    assert.match(source, /<small>Community Wiki<\/small>/, path);
  }
});

test("mobile video cards wrap titles without arbitrary word splitting", () => {
  assert.match(css, /\.video-card span\s*\{(?=[^}]*overflow-wrap:\s*normal)(?=[^}]*word-break:\s*normal)[^}]*\}/);
});

test("mobile buttons and brand text have a bounded inline layout", () => {
  assert.match(css, /\.brand[\s\S]*min-width: 0/);
  assert.match(css, /\.button[\s\S]*white-space: normal/);
  assert.match(css, /\.video-card[\s\S]*minmax\(0, 1fr\)/);
});

test("home hero matches section hero height on desktop", () => {
  assert.match(css, /\.hero\s*\{(?=[^}]*min-height:\s*340px)[^}]*\}/);
  assert.match(css, /\.page-hero\s*\{(?=[^}]*min-height:\s*340px)[^}]*\}/);
});
