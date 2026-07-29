window.AOW = window.AOW || {};

const searchEntries = [
  { title: "Сюжет", description: "Персонажи, история мира и рассказы.", url: "lore.html", section: "Сюжет" },
  { title: "Сообщество", description: "Социальные сети, фан-кит, партнеры и медиа.", url: "community.html", section: "Сообщество" },
  { title: "О проекте", description: "Назначение и развитие Community Wiki.", url: "about.html", section: "О проекте" }
];

const publishedWikiSearchEntries = () => (AOW.getPublishedWiki?.() || []).map((item) => ({
  title: item.title,
  description: item.lead,
  url: `wiki/article.html?id=${encodeURIComponent(item.id)}&category=${encodeURIComponent(AOW.wikiCategoryKey(item.category))}`,
  section: `Wiki · ${AOW.wikiCategoryTitle(AOW.wikiCategoryKey(item.category))}`
}));

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

  const results = [...publishedWikiSearchEntries(), ...searchEntries, ...(AOW.videoSearchEntries || [])].filter((entry) => AOW.matchesSearch(trimmedQuery, entry.title, entry.description, entry.section));
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
  AOW.readyPublishedContent?.then(() => renderSearchResults(searchInput.value));
}
