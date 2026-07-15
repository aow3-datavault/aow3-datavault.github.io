window.AOW = window.AOW || {};

AOW.wikiCategoryToPanel = { "Для новичков": "beginners", "Фракции": "factions", "Юниты": "units", "Герои": "heroes", "Режимы игры": "modes", "Экономика": "economy", "FAQ": "faq", "Полный функционал": "features" };

AOW.renderPublishedWiki = () => {
  const wikiPage = document.querySelector('[data-tabs="wiki"]');
  if (!wikiPage) return;
  wikiPage.querySelectorAll(".published-row").forEach((row) => row.remove());
  const deleted = AOW.getDeletedWiki();
  wikiPage.querySelectorAll("[data-wiki-id]").forEach((row) => {
    if (deleted.includes(row.dataset.wikiId)) row.remove();
  });
  AOW.getPublishedWiki().forEach((item) => {
    const panel = wikiPage.querySelector(`[data-panel="${AOW.categoryKey(item.category) || "beginners"}"]`);
    if (!panel) return;
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedWikiId = item.id;
    const meta = document.createElement("span");
    meta.textContent = `${AOW.categoryTitle(AOW.categoryKey(item.category))} · ${AOW.formatDate(item.date)}`;
    const title = document.createElement("h3");
    title.textContent = item.title || AOW.t("Без названия");
    const lead = document.createElement("p");
    lead.textContent = item.lead || AOW.t("Опубликованная Wiki-страница.");
    const link = document.createElement("a");
    link.href = `wiki/article.html?id=${encodeURIComponent(item.id)}`;
    link.textContent = AOW.t("Читать");
    article.append(meta, title, lead);
    article.append(link);
    article.append(...AOW.publicationControls("wiki", item, AOW.renderPublishedWiki));
    AOW.makePublicationClickable(article, link.href);
    panel.prepend(article);
  });
};

AOW.initWikiSearch = () => {
  const wikiSearch = document.querySelector("#wiki-search");
  if (!wikiSearch) return;
  const wikiPage = document.querySelector('[data-tabs="wiki"]');
  let selectedTab = wikiPage.querySelector(".tab-button.active")?.dataset.tab || "beginners";
  const filterWiki = () => {
    const query = wikiSearch.value.trim().toLowerCase();
    wikiPage.querySelectorAll(".article-row").forEach((row) => {
      row.classList.toggle("hidden", !AOW.matchesSearch(query, row.textContent));
    });
    if (!query) {
      wikiPage.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === selectedTab));
      wikiPage.querySelectorAll(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.tab === selectedTab));
      const title = wikiPage.querySelector("#wiki-title");
      if (title && AOW.tabTitles[selectedTab]) title.textContent = AOW.t(AOW.tabTitles[selectedTab]);
      return;
    }
    wikiPage.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", Boolean(panel.querySelector(".article-row:not(.hidden)"))));
    wikiPage.querySelectorAll(".tab-button").forEach((button) => button.classList.remove("active"));
    const title = wikiPage.querySelector("#wiki-title");
    if (title) title.textContent = AOW.t("Результаты поиска");
  };
  wikiSearch.addEventListener("input", filterWiki);
  wikiPage.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTab = button.dataset.tab;
    });
  });
};

AOW.renderPublishedWikiArticle = () => {
  const publishedWiki = document.querySelector("#published-wiki");
  if (!publishedWiki) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedWiki().find((entry) => entry.id === id);
  publishedWiki.innerHTML = item
    ? `<article class="news-article"><div class="article-meta">${AOW.escapeHtml(AOW.categoryTitle(AOW.categoryKey(item.category)))} · ${AOW.formatDate(item.date)}</div><h1>${AOW.escapeHtml(item.title)}</h1><p class="article-lead">${AOW.escapeHtml(item.lead)}</p>${item.image ? `<img class="article-hero-image" src="${AOW.escapeHtml(AOW.articleImageUrl(item.image))}" alt="" />` : ""}<section><div>${AOW.markdown(String(item.body || ""))}</div></section></article>`
    : `<section class="content-section"><h1>${AOW.t("Wiki-страница не найдена")}</h1><p>${AOW.t("Материал мог быть удалён из локального хранилища браузера.")}</p></section>`;
  if (item) publishedWiki.querySelector("article").append(...AOW.publicationControls("wiki", item, AOW.renderPublishedWikiArticle));
};

AOW.renderPublishedWiki();
AOW.initWikiSearch();
AOW.renderPublishedWikiArticle();
AOW.readyPublishedContent?.then(() => {
  AOW.renderPublishedWiki();
  AOW.renderPublishedWikiArticle();
});
window.addEventListener("pageshow", AOW.renderPublishedWiki);
window.addEventListener("storage", (event) => {
  if (event.key === "aowAuthorSession") AOW.renderPublishedWiki();
});
