window.AOW = window.AOW || {};

AOW.renderPublishedLore = () => {
  const page = document.querySelector("[data-lore-list]");
  if (!page) return;
  document.querySelectorAll("[data-published-lore-id]").forEach((item) => item.remove());
  AOW.getPublishedLore().forEach((item) => {
    const target = document.querySelector(`[data-lore-list="${item.category}"]`);
    if (!target) return;
    const href = `lore/article.html?id=${encodeURIComponent(item.id)}`;
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedLoreId = item.id;
    const meta = document.createElement("span");
    meta.textContent = `${AOW.categoryTitle(AOW.categoryKey(item.category))} · ${AOW.formatDate(item.date)}`;
    const title = document.createElement("h3");
    title.textContent = item.title || AOW.t("Без названия");
    const lead = document.createElement("p");
    lead.textContent = item.lead || AOW.t("Материал сюжета.");
    const link = document.createElement("a");
    link.href = href;
    link.textContent = AOW.t("Читать");
    article.append(meta, title, lead, link);
    article.append(...AOW.publicationControls("lore", item, AOW.renderPublishedLore));
    target.append(article);
  });
};

AOW.renderPublishedLoreArticle = () => {
  const container = document.querySelector("#published-lore");
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedLore().find((entry) => entry.id === id);
  container.innerHTML = item
    ? `<article class="news-article"><div class="article-meta">${AOW.escapeHtml(AOW.categoryTitle(AOW.categoryKey(item.category)))} · ${AOW.formatDate(item.date)}</div><h1>${AOW.escapeHtml(item.title)}</h1><p class="article-lead">${AOW.escapeHtml(item.lead)}</p>${item.image ? `<img class="article-hero-image" src="${AOW.escapeHtml(AOW.articleImageUrl(item.image))}" alt="" />` : ""}<section><div>${AOW.markdown(String(item.body || "").replace(/^## (Досье|Рассказ|История мира)\s*\n/, ""))}</div></section></article>`
    : `<section class="content-section"><h1>${AOW.t("Материал не найден")}</h1><p>${AOW.t("Материал мог быть удалён из локального хранилища браузера.")}</p></section>`;
  if (item) container.querySelector("article").append(...AOW.publicationControls("lore", item, AOW.renderPublishedLoreArticle));
};

AOW.renderPublishedLore();
AOW.renderPublishedLoreArticle();
AOW.readyPublishedContent?.then(() => {
  AOW.renderPublishedLore();
  AOW.renderPublishedLoreArticle();
});
