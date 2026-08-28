window.AOW = window.AOW || {};

AOW.renderPublishedLore = () => {
  const page = document.querySelector("[data-lore-list]");
  if (!page) return;
  document.querySelectorAll("[data-published-lore-id]").forEach((item) => item.remove());
  const worldHistoryOrder = ["confederation-resistance", "syndicate", "peruvian-conflict", "modifications", "nutricore-global", "new-year-traditions", "irish-resistance-gold"];
  const publishedLore = AOW.getPublishedLore();
  const worldHistory = publishedLore.filter((item) => AOW.categoryKey(item.category) === "world-history").sort((left, right) => {
    const leftOrder = worldHistoryOrder.indexOf(left.id.replace(/-en$/, ""));
    const rightOrder = worldHistoryOrder.indexOf(right.id.replace(/-en$/, ""));
    return (leftOrder === -1 ? worldHistoryOrder.length : leftOrder) - (rightOrder === -1 ? worldHistoryOrder.length : rightOrder);
  });
  let worldHistoryIndex = 0;
  publishedLore.map((item) => AOW.categoryKey(item.category) === "world-history" ? worldHistory[worldHistoryIndex++] : item).forEach((item) => {
    const target = document.querySelector(`[data-lore-list="${item.category}"]`);
    if (!target) return;
    const href = `lore/article.html?id=${encodeURIComponent(item.id)}&category=${encodeURIComponent(AOW.categoryKey(item.category))}`;
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedLoreId = item.id;
    const meta = document.createElement("span");
    meta.textContent = AOW.categoryTitle(AOW.categoryKey(item.category));
    const title = document.createElement("h3");
    title.textContent = item.title || AOW.t("Без названия");
    const lead = document.createElement("p");
    lead.textContent = item.lead || AOW.t("Материал сюжета.");
    article.append(meta, title, lead);
    article.append(...AOW.publicationControls("lore", item, AOW.renderPublishedLore));
    AOW.makePublicationClickable(article, href);
    target.append(article);
  });
};

AOW.renderPublishedLoreArticle = () => {
  const container = document.querySelector("#published-lore");
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedLore().find((entry) => entry.id === id);
  container.innerHTML = item
    ? `<article class="news-article"><div class="article-meta">${AOW.escapeHtml(AOW.categoryTitle(AOW.categoryKey(item.category)))}</div><h1>${AOW.escapeHtml(item.title)}</h1><p class="article-lead">${AOW.escapeHtml(item.lead)}</p>${item.image ? `<img class="article-hero-image" src="${AOW.escapeHtml(AOW.articleImageUrl(item.image))}" alt="" />` : ""}<section><div>${AOW.markdown(String(item.body || "").replace(/^## (Досье|Рассказ|История мира)\s*\n/, ""))}</div></section></article>`
    : `<section class="content-section"><h1>${AOW.t("Материал не найден")}</h1><a class="article-back" href="../index.html">${AOW.t("На главную")}</a></section>`;
  AOW.fitArticleTitles?.();
  if (item) {
    const article = container.querySelector("article");
    article.prepend(AOW.publicationBackLink("lore", item));
    article.append(AOW.publicationBackLink("lore", item), ...AOW.publicationControls("lore", item, AOW.renderPublishedLoreArticle));
  }
};

AOW.renderPublishedLore();
AOW.renderPublishedLoreArticle();
AOW.readyPublishedContent?.then(() => {
  AOW.renderPublishedLore();
  AOW.renderPublishedLoreArticle();
});
