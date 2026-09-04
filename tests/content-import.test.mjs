import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const content = JSON.parse(await readFile(new URL("../data/published-content.json", import.meta.url), "utf8"));
const lorePage = await readFile(new URL("../lore.html", import.meta.url), "utf8");
const common = await readFile(new URL("../scripts/common.js", import.meta.url), "utf8");
const i18n = await readFile(new URL("../scripts/i18n.js", import.meta.url), "utf8");

const youtubeId = (value) => {
  const url = new URL(value);
  return url.hostname.includes("youtu.be") ? url.pathname.slice(1) : url.searchParams.get("v");
};

const requiredRussianVideos = [
  {
    id: "video-VXM7N36meCY",
    title: "Обновление баланса: «Превосходство в воздухе»",
    language: "ru",
    category: "Обновления",
    video: "https://www.youtube.com/watch?v=VXM7N36meCY",
  },
  {
    id: "video-dPXbh_7g1lQ",
    title: "Военная академия. Подготовка к бою",
    language: "ru",
    category: "Обновления",
    video: "https://www.youtube.com/watch?v=dPXbh_7g1lQ",
  },
  {
    id: "video-znS8WoiKYCo",
    title: "Как на САМОМ ДЕЛЕ выглядит Gear Games Fest",
    language: "ru",
    category: "Интересные Видео",
    video: "https://www.youtube.com/watch?v=znS8WoiKYCo",
  },
  {
    id: "video-LuEBgGW7vvQ",
    title: "Что же происходило на Gear Games Fest?",
    language: "ru",
    category: "Интересные Видео",
    video: "https://www.youtube.com/watch?v=LuEBgGW7vvQ",
  },
];

test("includes the Raúl Cortes dossier without an invented image", () => {
  const dossier = content.lore.find((item) => item.id === "lore-ru-raul-cortes");
  assert.equal(dossier.title, "Досье: командующий Рауль Кортес");
  assert.equal(dossier.category, "Досье персонажей");
  assert.equal(dossier.image, "");
  assert.match(dossier.body, /Рауль Кортес/);
});

test("imports the military academies and approved hero lore", () => {
  const expectedIds = [
    "military-academies",
    "hero-seraphim",
    "hero-mole",
    "hero-atlant",
    "hero-bison",
    "hero-cerberus",
    "hero-wasp",
    "hero-solaris",
    "hero-leviathan",
  ];
  const imported = content.lore.filter((item) => expectedIds.includes(item.id));
  assert.deepEqual(imported.map((item) => item.id), expectedIds);
  assert.equal(imported[0].category, "История мира");
  assert.deepEqual(imported.slice(1).map((item) => item.category), Array(8).fill("Герои"));
  assert.match(imported.find((item) => item.id === "hero-seraphim").body, /Энрико Макиавелли/);
  assert.match(imported.find((item) => item.id === "hero-atlant").body, /Гарри Крюс/);
  assert.match(imported.find((item) => item.id === "hero-bison").body, /Владимир Вольтович/);
  assert.equal(imported.some((item) => /Громовержец|Потрошитель/.test(item.title)), false);
});

test("renders Heroes as a separate lore category", () => {
  assert.match(lorePage, /data-tab="heroes">Герои</);
  assert.match(lorePage, /data-panel="heroes"><div data-lore-list="Герои"><\/div>/);
  assert.match(common, /heroes: "Герои"/);
  assert.match(i18n, /"Герои": "heroes"/);
});

test("has unique YouTube IDs and excludes the audited livestreams", () => {
  const ids = content.video.map((item) => youtubeId(item.video));
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ["_6rQaH4WIJ0", "nhfHMLUSzGQ", "JA-cf4V2Z8w", "H77cRTTNz14", "5gf9opwOKsA", "j57TbFs1Gsg"]) assert.equal(ids.includes(id), false);
});

test("includes the four required Russian videos with their audited metadata", () => {
  const requiredIds = new Set(requiredRussianVideos.map((item) => item.id));
  const importedVideos = content.video
    .filter((item) => requiredIds.has(item.id))
    .map(({ id, title, language, category, video }) => ({ id, title, language, category, video }));
  assert.deepEqual(importedVideos, requiredRussianVideos);
});
