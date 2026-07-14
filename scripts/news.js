window.AOW = window.AOW || {};

AOW.newsCategoryToPanel = { "Обновления": "updates", "События": "events", "Турниры": "tournaments", "Оффлайн": "offline" };

AOW.renderPublishedNews = () => {
  const newsPage = document.querySelector('[data-tabs="news"]');
  if (!newsPage) return;
  newsPage.querySelectorAll(".published-row").forEach((row) => row.remove());
  const deleted = AOW.getDeletedNews();
  newsPage.querySelectorAll("[data-news-id]").forEach((row) => {
    if (deleted.includes(row.dataset.newsId)) row.remove();
  });
  AOW.getPublishedNews().forEach((item) => {
    const panel = newsPage.querySelector(`[data-panel="${AOW.categoryKey(item.category) || "updates"}"]`);
    if (!panel) return;
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedId = item.id;
    article.dataset.searchTags = item.tags || "";
    const meta = document.createElement("span");
    meta.textContent = `${AOW.categoryTitle(AOW.categoryKey(item.category))} · ${AOW.formatDate(item.date)}`;
    const title = document.createElement("h3");
    title.textContent = item.title || AOW.t("Без названия");
    const lead = document.createElement("p");
    lead.textContent = item.lead || AOW.t("Опубликованная новость.");
    const link = document.createElement("a");
    link.href = `news/article.html?id=${encodeURIComponent(item.id)}`;
    link.textContent = AOW.t("Читать");
    article.append(meta, title, lead, link);
    article.append(...AOW.publicationControls("news", item, AOW.renderPublishedNews));
    panel.prepend(article);
  });
};

AOW.initNewsSearch = () => {
  const newsSearch = document.querySelector("#news-search");
  if (!newsSearch) return;
  newsSearch.addEventListener("input", () => {
    const query = newsSearch.value.trim().toLowerCase();
    document.querySelectorAll('[data-tabs="news"] .article-row').forEach((row) => {
      row.classList.toggle("hidden", !AOW.matchesSearch(query, row.textContent, row.dataset.searchTags));
    });
  });
};

AOW.renderPublishedArticle = () => {
  const publishedArticle = document.querySelector("#published-article");
  if (!publishedArticle) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedNews().find((entry) => entry.id === id);
  publishedArticle.innerHTML = item
    ? `<article class="news-article"><div class="article-meta">${AOW.escapeHtml(AOW.categoryTitle(AOW.categoryKey(item.category)))} · ${AOW.formatDate(item.date)}</div><h1>${AOW.escapeHtml(item.title)}</h1><p class="article-lead">${AOW.escapeHtml(item.lead)}</p><img class="article-hero-image" src="${AOW.escapeHtml(AOW.articleImageUrl(item.image))}" alt="" /><section><div>${AOW.markdown(String(item.body || ""))}</div></section></article>`
    : `<section class="content-section"><h1>${AOW.t("Новость не найдена")}</h1><p>${AOW.t("Материал мог быть удалён из локального хранилища браузера.")}</p></section>`;
  if (item) publishedArticle.querySelector("article").append(...AOW.publicationControls("news", item, AOW.renderPublishedArticle));
};

AOW.renderPublishedNews();
AOW.initNewsSearch();
AOW.renderPublishedArticle();
AOW.readyPublishedContent?.then(() => {
  AOW.renderPublishedNews();
  AOW.renderPublishedArticle();
});
