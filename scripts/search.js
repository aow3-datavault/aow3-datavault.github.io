window.AOW = window.AOW || {};

const searchEntries = [
  { title: "Первый час в игре", description: "Интерфейс, первые бои, развитие базы и старт для новичков.", url: "wiki/first-hour.html", section: "Wiki" },
  { title: "Конфедерация и Сопротивление", description: "Сравнение фракций, стилей игры, сильных сторон и подходов.", url: "wiki/factions-overview.html", section: "Wiki" },
  { title: "Роли юнитов", description: "Пехота, техника, авиация, поддержка и состав армии.", url: "wiki/unit-roles.html", section: "Wiki" },
  { title: "Основы героев", description: "Роли героев, способности и применение в бою.", url: "wiki/heroes-basics.html", section: "Wiki" },
  { title: "Режимы игры", description: "PvP, события и тренировочные сценарии.", url: "wiki/game-modes.html", section: "Wiki" },
  { title: "Ресурсы и темп развития", description: "Производство, армия, технологии и экономика.", url: "wiki/economy-tempo.html", section: "Wiki" },
  { title: "Частые вопросы", description: "Ответы на вопросы о прогрессе, режимах и аккаунте.", url: "wiki/faq-start.html", section: "Wiki" },
  { title: "Индекс систем игры", description: "Навигация по системам и возможностям Art of War 3.", url: "wiki/feature-index.html", section: "Wiki" },
  { title: "Сюжет", description: "Персонажи, история мира и рассказы.", url: "lore.html", section: "Сюжет" },
  { title: "Сообщество", description: "Социальные сети, фан-кит, партнеры и медиа.", url: "community.html", section: "Сообщество" },
  { title: "О проекте", description: "Назначение и развитие Community Wiki.", url: "about.html", section: "О проекте" }
];

const searchInput = document.querySelector("#site-search");
const searchResults = document.querySelector("#search-results");
const searchStatus = document.querySelector("#search-status");
const searchPanel = document.querySelector(".search-results-panel");

const renderSearchResults = (query) => {
  if (!searchResults || !searchStatus) return;
  const trimmedQuery = query.trim();
  searchResults.replaceChildren();
  searchPanel?.classList.toggle("is-searching", Boolean(trimmedQuery));
  if (!trimmedQuery) {
    searchStatus.textContent = AOW.t("Введите ключевое слово.");
    return;
  }

  const results = [...searchEntries, ...(AOW.videoSearchEntries || [])].filter((entry) => AOW.matchesSearch(trimmedQuery, entry.title, entry.description, entry.section));
  searchStatus.textContent = results.length
    ? (AOW.language === "en" ? `Materials found: ${results.length}` : `Найдено материалов: ${results.length}`)
    : AOW.t("Ничего не найдено.");
  results.forEach((entry) => {
    const result = document.createElement("a");
    result.className = "search-result";
    result.href = entry.url;
    const section = document.createElement("span");
    section.textContent = entry.section;
    const title = document.createElement("h3");
    title.textContent = entry.title;
    const description = document.createElement("p");
    description.textContent = entry.description;
    result.append(section, title, description);
    searchResults.append(result);
  });
};

if (searchInput) {
  const query = new URLSearchParams(window.location.search).get("q") || "";
  searchInput.value = query;
  renderSearchResults(query);
  searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
  window.addEventListener("aow:videos-ready", () => renderSearchResults(searchInput.value));
}
