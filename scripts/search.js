window.AOW = window.AOW || {};

const searchEntries = [
  { title: "Первый час в игре", description: "Интерфейс, первые бои, развитие базы и старт для новичков.", tags: "новички старт база интерфейс", url: "wiki/first-hour.html", section: "Wiki" },
  { title: "Конфедерация и Сопротивление", description: "Сравнение фракций, стилей игры, сильных сторон и подходов.", tags: "фракции конфедерация сопротивление стратегия", url: "wiki/factions-overview.html", section: "Wiki" },
  { title: "Роли юнитов", description: "Пехота, техника, авиация, поддержка и состав армии.", tags: "юниты пехота техника авиация армия", url: "wiki/unit-roles.html", section: "Wiki" },
  { title: "Основы героев", description: "Роли героев, способности и применение в бою.", tags: "герои способности бой", url: "wiki/heroes-basics.html", section: "Wiki" },
  { title: "Режимы игры", description: "PvP, события и тренировочные сценарии.", tags: "режимы pvp события тренировка", url: "wiki/game-modes.html", section: "Wiki" },
  { title: "Ресурсы и темп развития", description: "Производство, армия, технологии и экономика.", tags: "экономика ресурсы производство технологии", url: "wiki/economy-tempo.html", section: "Wiki" },
  { title: "Частые вопросы", description: "Ответы на вопросы о прогрессе, режимах и аккаунте.", tags: "faq вопросы прогресс аккаунт", url: "wiki/faq-start.html", section: "Wiki" },
  { title: "Индекс систем игры", description: "Навигация по системам и возможностям Art of War 3.", tags: "системы механики функционал", url: "wiki/feature-index.html", section: "Wiki" },
  { title: "Видео", description: "Гайды, дневники разработчиков, трейлеры и развлекательные ролики.", tags: "видео гайды дневники разработчиков трейлеры", url: "videos.html", section: "Видео" },
  { title: "Лор", description: "Карта мира, персонажи, история и рассказы.", tags: "лор история персонажи рассказы мир", url: "lore.html", section: "Лор" },
  { title: "Сообщество", description: "Социальные сети, фан-кит, партнеры и медиа.", tags: "сообщество вконтакте telegram youtube rutube whatsapp фан кит", url: "community.html", section: "Сообщество" },
  { title: "О проекте", description: "Назначение и развитие Community Wiki.", tags: "проект база знаний сообщество", url: "about.html", section: "О проекте" }
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
    searchStatus.textContent = "Введите ключевое слово или выберите тег.";
    return;
  }

  const results = searchEntries.filter((entry) => AOW.matchesSearch(trimmedQuery, entry.title, entry.description, entry.tags, entry.section));
  searchStatus.textContent = results.length ? `Найдено материалов: ${results.length}` : "Ничего не найдено.";
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
    const tags = document.createElement("small");
    tags.textContent = entry.tags;
    result.append(section, title, description, tags);
    searchResults.append(result);
  });
};

if (searchInput) {
  const query = new URLSearchParams(window.location.search).get("q") || "";
  searchInput.value = query;
  renderSearchResults(query);
  searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
  document.querySelectorAll("[data-search-tag]").forEach((tag) => {
    tag.addEventListener("click", (event) => {
      event.preventDefault();
      searchInput.value = tag.dataset.searchTag;
      renderSearchResults(searchInput.value);
      searchInput.focus();
    });
  });
}
