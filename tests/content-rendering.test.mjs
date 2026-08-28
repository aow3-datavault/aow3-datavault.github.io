import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const content = JSON.parse(await readFile(new URL("data/published-content.json", root), "utf8"));

test("removes the obsolete training-lobby Wiki article", () => {
  assert.equal(content.wiki.some((item) => item.id === "wiki-ru-c059"), false);
});

test("renames the balance article without deleting its source date", () => {
  const article = content.wiki.find((item) => item.id === "wiki-ru-c061");
  assert.equal(article.title, "Как разработчики балансируют игру?");
  assert.ok(article.date);
});

test("balance article refers to developers rather than an editorial we", () => {
  const article = content.wiki.find((item) => item.id === "wiki-ru-c061");
  assert.doesNotMatch(article.body, /\bМы\b|\bмы\b|\bбалансите\b/);
  assert.match(article.body, /Разработчики/);
});

for (const renderer of ["wiki", "news", "lore"]) {
  test(`${renderer} renderer omits publication date formatting`, async () => {
    const source = await readFile(new URL(`scripts/${renderer}.js`, root), "utf8");
    assert.doesNotMatch(source, /AOW\.formatDate\(item\.date\)/);
  });
}
