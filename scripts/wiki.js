window.AOW = window.AOW || {};

AOW.wikiCategoryToPanel = { "Для новичков": "beginners", "Фракции": "factions", "Юниты": "units", "Герои": "heroes", "Режимы игры": "modes", "Экономика": "economy", "FAQ": "faq", "Полный функционал": "features" };

AOW.renderPublishedWiki = () => {
  const wikiPage = document.querySelector('[data-tabs="wiki"]');
  if (!wikiPage) return;
  const deleted = AOW.getDeletedWiki();
  wikiPage.querySelectorAll("[data-wiki-id]").forEach((row) => {
    if (deleted.includes(row.dataset.wikiId)) row.remove();
  });
  AOW.getPublishedWiki().forEach((item) => {
    const panel = wikiPage.querySelector(`[data-panel="${AOW.wikiCategoryToPanel[item.category] || "beginners"}"]`);
    if (!panel) return;
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedWikiId = item.id;
    article.dataset.searchTags = item.tags || "";
    const meta = document.createElement("span");
    meta.textContent = `${item.category} · ${AOW.formatDate(item.date)}`;
    const title = document.createElement("h3");
    title.textContent = item.title || "Без названия";
    const lead = document.createElement("p");
    lead.textContent = item.lead || "Опубликованная Wiki-страница.";
    const link = document.createElement("a");
    link.href = `wiki/article.html?id=${encodeURIComponent(item.id)}`;
    link.textContent = "Читать";
    article.append(meta, title, lead, link);
    panel.prepend(article);
  });
};

AOW.initWikiSearch = () => {
  const wikiSearch = document.querySelector("#wiki-search");
  if (!wikiSearch) return;
  wikiSearch.addEventListener("input", () => {
    const query = wikiSearch.value.trim().toLowerCase();
    document.querySelectorAll('[data-tabs="wiki"] .article-row').forEach((row) => {
      row.classList.toggle("hidden", !AOW.matchesSearch(query, row.textContent, row.dataset.searchTags));
    });
  });
};

AOW.renderPublishedWikiArticle = () => {
  const publishedWiki = document.querySelector("#published-wiki");
  if (!publishedWiki) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedWiki().find((entry) => entry.id === id);
  publishedWiki.innerHTML = item
    ? `<article class="news-article"><div class="article-meta">${AOW.escapeHtml(item.category)} · ${AOW.formatDate(item.date)}</div><h1>${AOW.escapeHtml(item.title)}</h1><p class="article-lead">${AOW.escapeHtml(item.lead)}</p><img class="article-hero-image" src="${AOW.escapeHtml(AOW.safeImageUrl(item.image))}" alt="" /><section><h2>Материал</h2><div>${AOW.markdown(String(item.body || ""))}</div></section></article>`
    : '<section class="content-section"><h1>Wiki-страница не найдена</h1><p>Материал мог быть удалён из локального хранилища браузера.</p></section>';
};

AOW.renderPublishedWiki();
AOW.initWikiSearch();
AOW.renderPublishedWikiArticle();
