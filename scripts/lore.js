window.AOW = window.AOW || {};

AOW.renderPublishedLore = () => {
  const page = document.querySelector("[data-lore-list]");
  if (!page) return;
  document.querySelectorAll("[data-published-lore-id]").forEach((item) => item.remove());
  AOW.getPublishedLore().forEach((item) => {
    const target = document.querySelector(`[data-lore-list="${item.category}"]`);
    if (!target) return;
    const href = `lore/article.html?id=${encodeURIComponent(item.id)}`;
    if (item.category === "Досье персонажей") {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.publishedLoreId = item.id;
      const link = document.createElement("a");
      link.href = href;
      link.innerHTML = `<h3>${AOW.escapeHtml(item.title || "Без названия")}</h3><p>${AOW.escapeHtml(item.lead || "Лор-материал.")}</p>`;
      card.append(link);
      if (AOW.isAuthor()) {
        const edit = document.createElement("a");
        edit.className = "edit-publication-button";
        edit.href = `author.html?edit=lore:${encodeURIComponent(item.id)}`;
        edit.textContent = "✎ Редактировать";
        card.append(edit);
      }
      target.append(card);
      return;
    }
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedLoreId = item.id;
    const meta = document.createElement("span");
    meta.textContent = `${item.category} · ${AOW.formatDate(item.date)}`;
    const title = document.createElement("h3");
    title.textContent = item.title || "Без названия";
    const lead = document.createElement("p");
    lead.textContent = item.lead || "Лор-материал.";
    const link = document.createElement("a");
    link.href = href;
    link.textContent = "Читать";
    article.append(meta, title, lead, link);
    if (AOW.isAuthor()) {
      const edit = document.createElement("a");
      edit.className = "edit-publication-button";
      edit.href = `author.html?edit=lore:${encodeURIComponent(item.id)}`;
      edit.textContent = "✎ Редактировать";
      article.append(edit);
    }
    target.append(article);
  });
};

AOW.renderPublishedLoreArticle = () => {
  const container = document.querySelector("#published-lore");
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedLore().find((entry) => entry.id === id);
  container.innerHTML = item
    ? `<article class="news-article"><div class="article-meta">${AOW.escapeHtml(item.category)} · ${AOW.formatDate(item.date)}</div><h1>${AOW.escapeHtml(item.title)}</h1><p class="article-lead">${AOW.escapeHtml(item.lead)}</p><img class="article-hero-image" src="${AOW.escapeHtml(AOW.articleImageUrl(item.image))}" alt="" /><section><h2>Лор</h2><div>${AOW.markdown(String(item.body || ""))}</div></section></article>`
    : '<section class="content-section"><h1>Материал не найден</h1><p>Материал мог быть удалён из локального хранилища браузера.</p></section>';
  if (item && AOW.isAuthor()) {
    const edit = document.createElement("a");
    edit.className = "edit-publication-button";
    edit.href = `../author.html?edit=lore:${encodeURIComponent(item.id)}`;
    edit.textContent = "✎ Редактировать";
    container.querySelector("article").append(edit);
  }
};

AOW.renderPublishedLore();
AOW.renderPublishedLoreArticle();
AOW.readyPublishedContent?.then(() => {
  AOW.renderPublishedLore();
  AOW.renderPublishedLoreArticle();
});
