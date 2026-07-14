window.AOW = window.AOW || {};

const videoData = {
  guides: {
    title: "Обучающие",
    items: [
      { title: "Простое выделение юнитов. Урок 1", id: "ajoeN2migw8" },
      { title: "Выделение юнитов рамкой. Урок 2", id: "2mpd-ZZv7jc" },
      { title: "Кнопка «Выбрать всех юнитов». Урок 3", id: "XjvdBm7Qs1g" },
      { title: "Атака и движение. Урок 4", id: "jzSKOgwbHk8" },
      { title: "Управление группами юнитов. Урок 5", id: "x9ii4lMJwZE" },
      { title: "Туман Войны. Урок 6", id: "92Eq0GrtyKk" }
    ]
  },
  players: {
    title: "Видео от игроков",
    items: [
      { title: "Гайд на авиа", id: "iqLSmeB96tg" },
      { title: "Гайд для новичков", id: "8lhEKQcETFk" },
      { title: "Что строить в первую очередь", id: "uWcbq8ro_i0" },
      { title: "Что качать новичкам", id: "V8INAdRkXT0" },
      { title: "Как отбить раш", id: "px-oNrYA3Jg" },
      { title: "Как играть с ПК", id: "s9-g4kNMj3Q" },
      { title: "Гайд для новичков", id: "H4khGlqqheo" },
      { title: "Советы новичкам", id: "8w1Vmcv2icY" },
      { title: "Как выходить в разведку", id: "JdbBwVUNqok" },
      { title: "Как дефать крепогрен", id: "GubivfmW588" },
      { title: "Прокачка Сопротивления", id: "VicVANGDO-c" },
      { title: "Гайд на авиа", id: "0AmSQhmk4W4" },
      { title: "Всё о настройках Gangsta", id: "azpy5r1hiKc" },
      { title: "Всё о настройках Caesari", id: "Ki8gZHNKV6M" }
    ]
  },
  tournaments: {
    title: "Соревнования",
    items: [
      { title: "Турнир Воля случая", id: "B7nYDYuAfjo" },
      { title: "Блиц-дуэль", id: "syUODtPiyCg" },
      { title: "Зомби-блиц", id: "BjsQiqpf-2M" },
      { title: "В поисках Наутилуса", id: "OdflXOaJDvg" },
      { title: "Знатная добыча", id: "ArG536L2gic" },
      { title: "Надёжный напарник", id: "2KlPMJ9j-1Q" },
      { title: "Как за каменной стеной", id: "puBuTLZroRU" },
      { title: "Большие резервы", id: "lEOlfoCNm80" },
      { title: "Две крепости", id: "fopZlbTem1E" },
      { title: "Дороже золота", id: "-xfocqgl5jg" },
      { title: "Тыквенное безумие", id: "tL2erdAgaCA" },
      { title: "Новогодний переполох", id: "MZV2T26P_Ds" },
      { title: "Всё для фронта", id: "Bm12IJ84JSE" }
    ]
  },
  updates: { title: "Обновления", items: [] },
  trailers: { title: "Трейлеры", items: [] },
  developers: { title: "Ответы разработчиков", items: [] },
  interesting: { title: "Интересные Видео", items: [] }
};

const channelVideoAdditions = {
  guides: [
    ["Что улучшать в Мастерской?", "HGcFJ9OPcvo"],
    ["Как работает система подбора соперников?", "SJ9iX5qMiZU"],
    ["Инструкция по оплате для Android", "1fTAc2w6eWI"]
  ],
  tournaments: [],
  updates: [
    ["Режим зрителя", "z_Kpkj-2EJg"],
    ["Добро пожаловать в Тренировочное Лобби", "mrJUkpk-2pU"],
    ["Легендарная лига", "MKYHRDpWPVc"],
    ["Первые эпические модификации", "aNadIlUS7eI"],
    ["Обновление биома «Джунгли»", "xm-0JoDPs7Q"],
    ["Модификации уже в игре", "VPTbPLLiT0c"],
    ["Обновление «Старая Гвардия»", "VTIU9uXwplA"],
    ["Глобальное обновление: Новое освещение", "CNwkCQDBPQI"],
    ["Премиум-статус: награды без рекламы", "mmCktQQJdgs"],
    ["Обновление PvP-лобби", "mkwceTtvMEw"],
    ["Сообщение Синдиката", "5XXT1IDlbao"],
    ["Премиум 2.0", "qQrV-RLUR-M"],
    ["Чёрный рынок", "8T3FFXWLVBI"],
    ["Обновление баланса: «Калибровка орудий». Конфедерация", "rL-nkYHsxrM"],
    ["Обновление баланса: «Калибровка орудий». Сопротивление", "isr1BybxJAw"],
    ["Обновление баланса: Перезагрузка меты", "B79c8zmtHOc"],
    ["Мастерская 2.0", "r3EEGlgq1O0"],
    ["Обновление игрового баланса", "kPXrmWDMdyA"],
    ["Обновление баланса: «Протокол Феникс»", "5bUOxNwQjq0"]
  ],
  trailers: [
    ["Самый эпичный гайд по Атланту", "FZI2baxNxsY"],
    ["Десять лет крутых побед! Нам 10 лет!", "cPjmuN27Y1g"],
    ["День рождения Art of War 3. 10 лет в бою", "0yBRaq128fg"],
    ["Равная прокачка в новом режиме 3х3", "gC2YkBqI1CE"],
    ["Возвращение Джокера: Удар из космоса 2026", "lpqtTWOncg4"],
    ["Событие «День святого Патрика»", "ubPHcN4X7KQ"],
    ["Событие «Лунный новый год»", "pA6BEkLcFP0"],
    ["Новогоднее событие «Битва за Ёлки»", "rlT1AFtYogA"],
    ["Событие «Чёрная Пятница»", "gWI97CijgE4"],
    ["Событие «Хэллоуин 2025»", "94M8FOa9bcc"],
    ["День рождения Gear Games. 19 лет", "bOFpMtjL1Qk"],
    ["День рождения Art of War. 9 лет в бою", "VvqaRIDG2lg"],
    ["Возвращение Джокера: Удар из космоса", "o1aLxVQBhJE"],
    ["Событие «Лунный новый год»", "IfBgdsQjosI"],
    ["Новогоднее событие «Битва за Ёлки»", "nN54TJElxFQ"],
    ["Саламандра. Новый герой Сопротивления", "XnYLXzG9zd4"],
    ["Псион. Новый герой Конфедерации", "gxFwKcW5i_A"],
    ["Псион и Саламандра. Новые герои", "E800vSlfjFg"],
    ["Событие «Летняя жара 2024»", "OEm_zDkmiSw"],
    ["День рождения Art of War 3. 8 лет в бою", "9eESMzuSWXE"],
    ["Игровое событие «Ловушка Джокера»", "bC85u53mGjQ"],
    ["Смотритель. Новый Герой Конфедерации", "AK7QtbtwSm0"],
    ["Росомаха. Новый Герой Сопротивления", "OjLBaiVRu5o"],
    ["Трейлер «Новые Герои 2024»", "ZQhSW0dZQgc"],
    ["Новогоднее событие «Ёлки»", "u-3no55Ez48"],
    ["Событие «Хэллоуин»", "EvrPDgb7a-s"],
    ["Событие «Летняя жара»", "vZYU00ggf1A"],
    ["Art of War 7 лет", "pDbxahaxoC4"],
    ["Бизон. Внеплановое отключение электроэнергии", "GW_LkFscrPs"],
    ["Тревожные вести от разведки Сопротивления", "bt2Cdra5Ilw"]
  ],
  developers: [
    ["Ответы разработчиков 3", "fW2z_NF15Lw"],
    ["Ответы разработчиков #2", "ltOs6KvIR4I"],
    ["Ответы разработчиков", "YjSywPq29SE"],
    ["Ответы разработчиков. Дайджест 5 сентября", "cGYhq1h-TGI"],
    ["Ответы разработчиков: новая лига и баланс", "82D6zuxDQK0"],
    ["Ответы разработчиков [03.07]", "nqOTWn1NHzc"],
    ["Дайджест разработчиков. Интервью с Gear Games", "mlbn3muKE3E"],
    ["Дайджест разработки, 12 апреля", "ed0QJsKekLM"],
    ["Стрим разработчиков. Дайджест, 29 марта", "d9hO75wG8w8"],
    ["Стрим разработчиков. Дайджест, 22 марта", "8Pw5pYH5XG0"]
  ],
  interesting: [
    ["Новый режим Art of War: MOBA", "jGk5ZYYWtZU"],
    ["Ночные бои и погодные эффекты", "suJSwSZNWU0"],
    ["Турнир на GGFEST. Финальные бои", "LsoQFU5WAbc"],
    ["Art of War Masters '26 SPRING. Лучшие моменты", "refGHzqeYns"],
    ["Art of War Masters '26 WINTER. Лучшие моменты", "pSvHuMDQY1Y"],
    ["Art of War Masters '25 FALL. Лучшие моменты", "oLq-pfWDszw"],
    ["Клановая Схватка. Лучшие Моменты", "24UTbX1RPuE"],
    ["Gear Games FEST 2025", "L-Y_CDsGXL0"],
    ["Почему Конфедерация использует шагоходы?", "YzdBhRuERbY"],
    ["Баланс героев поддержки: Смотритель и Оса", "rWZ6gi2GxlI"],
    ["Как озвучивали Бизона", "SfAfuyrGFmQ"],
    ["Срочное донесение Командов", "S_lBdnQwJ94"],
    ["Разрушители мифов. Эпизод 2", "Dn39BskdZU0"],
    ["Джон Доу говорит на разных языках", "CvGaVij6dbA"],
    ["Как озвучивали Росомаху?", "5cUZ-GGy1xI"],
    ["Разрушители мифов", "Kv_KPkJ254c"],
  ],
  players: []
};

const videoPublishDates = {
  ajoeN2migw8: 20231202, "2mpd-ZZv7jc": 20231209, XjvdBm7Qs1g: 20231216, jzSKOgwbHk8: 20240210,
  x9ii4lMJwZE: 20240825, "92Eq0GrtyKk": 20240919, iqLSmeB96tg: 20250801, "8lhEKQcETFk": 20250609,
  uWcbq8ro_i0: 20231007, V8INAdRkXT0: 20230610, "px-oNrYA3Jg": 20211229, "s9-g4kNMj3Q": 20250131,
  H4khGlqqheo: 20200106, "8w1Vmcv2icY": 20220810, JdbBwVUNqok: 20220903, GubivfmW588: 20220823,
  "VicVANGDO-c": 20240331, "0AmSQhmk4W4": 20180519, azpy5r1hiKc: 20260107, Ki8gZHNKV6M: 20260108,
  B7nYDYuAfjo: 20231005, syUODtPiyCg: 20230516, "BjsQiqpf-2M": 20230401, OdflXOaJDvg: 20230310,
  ArG536L2gic: 20230310, "2KlPMJ9j-1Q": 20230310, puBuTLZroRU: 20230310, lEOlfoCNm80: 20230310,
  fopZlbTem1E: 20230310, "-xfocqgl5jg": 20230310, tL2erdAgaCA: 20230310, MZV2T26P_Ds: 20230310,
  Bm12IJ84JSE: 20230310, HGcFJ9OPcvo: 20260318, SJ9iX5qMiZU: 20260129, "1fTAc2w6eWI": 20230425,
  "z_Kpkj-2EJg": 20250312, "mrJUkpk-2pU": 20240129, MKYHRDpWPVc: 20251009, aNadIlUS7eI: 20260421,
  "xm-0JoDPs7Q": 20260406, VPTbPLLiT0c: 20260312, VTIU9uXwplA: 20251113, CNwkCQDBPQI: 20241120,
  mmCktQQJdgs: 20240813, mkwceTtvMEw: 20240619, "5XXT1IDlbao": 20240613, "qQrV-RLUR-M": 20230713,
  "8T3FFXWLVBI": 20230316, "rL-nkYHsxrM": 20260625, isr1BybxJAw: 20260624, B79c8zmtHOc: 20250911,
  r3EEGlgq1O0: 20250515, kPXrmWDMdyA: 20241212, "5bUOxNwQjq0": 20260305, FZI2baxNxsY: 20250721,
  cPjmuN27Y1g: 20260428, "0yBRaq128fg": 20260423, gC2YkBqI1CE: 20260422, lpqtTWOncg4: 20260323,
  ubPHcN4X7KQ: 20260316, pA6BEkLcFP0: 20260216, rlT1AFtYogA: 20251218, gWI97CijgE4: 20251120,
  "94M8FOa9bcc": 20251023, bOFpMtjL1Qk: 20250926, VvqaRIDG2lg: 20250424, o1aLxVQBhJE: 20250327,
  IfBgdsQjosI: 20250129, nN54TJElxFQ: 20241219, XnYLXzG9zd4: 20241023, "gxFwKcW5i_A": 20241018,
  E800vSlfjFg: 20241004, OEm_zDkmiSw: 20240702, "9eESMzuSWXE": 20240424, bC85u53mGjQ: 20240328,
  AK7QtbtwSm0: 20240305, OjLBaiVRu5o: 20240220, ZQhSW0dZQgc: 20231231, "u-3no55Ez48": 20231220,
  "EvrPDgb7a-s": 20231025, vZYU00ggf1A: 20230726, pDbxahaxoC4: 20230428, GW_LkFscrPs: 20250719,
  bt2Cdra5Ilw: 20240724, fW2z_NF15Lw: 20251115, ltOs6KvIR4I: 20250617, YjSywPq29SE: 20250421,
  "cGYhq1h-TGI": 20240906, "82D6zuxDQK0": 20240726, nqOTWn1NHzc: 20240705, mlbn3muKE3E: 20240504,
  ed0QJsKekLM: 20240419, d9hO75wG8w8: 20240412, "8Pw5pYH5XG0": 20240405, jGk5ZYYWtZU: 20260401,
  suJSwSZNWU0: 20240401, LsoQFU5WAbc: 20251108, refGHzqeYns: 20260518, pSvHuMDQY1Y: 20260210,
  "oLq-pfWDszw": 20251007, "24UTbX1RPuE": 20250304, "L-Y_CDsGXL0": 20251214, YzdBhRuERbY: 20251210,
  rWZ6gi2GxlI: 20250904, SfAfuyrGFmQ: 20250902, S_lBdnQwJ94: 20241031, Dn39BskdZU0: 20240729,
  CvGaVij6dbA: 20240715, "5cUZ-GGy1xI": 20240409, Kv_KPkJ254c: 20230802
};

const initializeVideoCatalog = () => {
const knownVideoIds = new Set(Object.values(videoData).flatMap((category) => category.items.map((item) => item.id)));
Object.entries(channelVideoAdditions).forEach(([category, additions]) => {
  const uniqueAdditions = additions.filter(([, id]) => !knownVideoIds.has(id)).map(([title, id]) => ({ title, id }));
  uniqueAdditions.forEach((item) => knownVideoIds.add(item.id));
  videoData[category].items.push(...uniqueAdditions);
});
const videoCategoryKeys = Object.fromEntries(Object.entries(videoData).map(([key, category]) => [category.title, key]));
const getYoutubeId = (value) => {
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
  } catch {
    return "";
  }
  return "";
};
AOW.getPublishedVideos?.().forEach((item) => {
  const category = videoCategoryKeys[item.category];
  const id = getYoutubeId(item.video);
  if (category && id) videoData[category].items.push({ title: item.title || "Без названия", id, localId: item.id, publishedAt: Date.parse(item.publishedAt) || 0 });
});
Object.values(videoData).forEach(({ items }) => items.sort((a, b) => (b.publishedAt || videoPublishDates[b.id] || 0) - (a.publishedAt || videoPublishDates[a.id] || 0)));

AOW.videoSearchEntries = Object.entries(videoData).flatMap(([categoryKey, category]) => category.items.map((item) => ({
  title: item.title,
  description: `Видео из категории «${category.title}».`,
  tags: `видео ${category.title}`,
  url: `videos.html?category=${encodeURIComponent(categoryKey)}&video=${encodeURIComponent(item.id)}`,
  section: "Видео"
})));

const videoScope = document.querySelector("[data-videos]");
if (videoScope) {
  const player = document.querySelector("#video-player");
  const list = document.querySelector("#video-list");
  const title = document.querySelector("#video-category-title");
  const renderVideos = (category, selectedId) => {
    const data = videoData[category];
    title.textContent = data.title;
    list.innerHTML = "";

    if (!data.items.length) {
      player.removeAttribute("src");
      const empty = document.createElement("div");
      empty.className = "video-empty";
      empty.textContent = "Материалы появятся позже.";
      list.append(empty);
      return;
    }

    const selectedIndex = Math.max(0, data.items.findIndex((item) => item.id === selectedId));
    data.items.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `video-card${index === selectedIndex ? " active" : ""}`;
      const thumbnail = document.createElement("img");
      thumbnail.src = `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`;
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      const name = document.createElement("span");
      name.textContent = item.title;
      button.append(thumbnail, name);
      button.addEventListener("click", () => {
        player.src = `https://www.youtube.com/embed/${item.id}`;
        list.querySelectorAll(".video-card").forEach((card) => card.classList.toggle("active", card === button));
      });
      list.append(button);
      if (item.localId && AOW.isAuthor?.()) {
        const edit = document.createElement("a");
        edit.className = "edit-publication-button";
        edit.href = `author.html?edit=video:${encodeURIComponent(item.localId)}`;
        edit.textContent = "✎ Редактировать";
        list.append(edit);
      }
    });
    player.src = `https://www.youtube.com/embed/${data.items[selectedIndex].id}`;
  };
  videoScope.querySelectorAll("[data-video-category]").forEach((button) => {
    button.addEventListener("click", () => {
      videoScope.querySelectorAll("[data-video-category]").forEach((item) => item.classList.toggle("active", item === button));
      renderVideos(button.dataset.videoCategory);
    });
  });
  const params = new URLSearchParams(window.location.search);
  const category = videoData[params.get("category")] ? params.get("category") : "guides";
  videoScope.querySelectorAll("[data-video-category]").forEach((button) => button.classList.toggle("active", button.dataset.videoCategory === category));
  renderVideos(category, params.get("video"));
}
};

(AOW.readyPublishedContent || Promise.resolve()).then(initializeVideoCatalog);
