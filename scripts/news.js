window.AOW = window.AOW || {};

AOW.newsCategoryToPanel = { "Обновления": "updates", "События": "events", "Турниры": "tournaments", "Оффлайн": "offline" };

AOW.renderPublishedNews = () => {
  const newsPage = document.querySelector('[data-tabs="news"]');
  if (!newsPage) return;
  const deleted = AOW.getDeletedNews();
  newsPage.querySelectorAll("[data-news-id]").forEach((row) => {
    if (deleted.includes(row.dataset.newsId)) row.remove();
  });
  AOW.getPublishedNews().forEach((item) => {
    const panel = newsPage.querySelector(`[data-panel="${AOW.newsCategoryToPanel[item.category] || "updates"}"]`);
    if (!panel) return;
    const article = document.createElement("article");
    article.className = "article-row published-row";
    article.dataset.publishedId = item.id;
    article.innerHTML = `<span>${item.category} · ${AOW.formatDate(item.date)}</span><h3>${item.title}</h3><p>${item.lead || "Опубликованная новость."}</p><a href="news/article.html?id=${item.id}">Читать</a>`;
    panel.prepend(article);
  });
};

AOW.applyNewsAdminControls = () => {
  const newsPage = document.querySelector('[data-tabs="news"]');
  if (!newsPage || localStorage.getItem("aowAuthorLoggedIn") !== "true") return;
  newsPage.querySelectorAll(".article-row").forEach((row) => {
    if (row.querySelector(".delete-news-button")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-news-button";
    button.innerHTML = "🗑 Удалить";
    button.addEventListener("click", () => {
      const title = row.querySelector("h3")?.textContent || "эту новость";
      if (!window.confirm(`Удалить новость «${title}»?`)) return;
      if (row.dataset.publishedId) {
        localStorage.setItem("aowPublishedNews", JSON.stringify(AOW.getPublishedNews().filter((item) => item.id !== row.dataset.publishedId)));
      }
      if (row.dataset.newsId) {
        const deleted = AOW.getDeletedNews();
        if (!deleted.includes(row.dataset.newsId)) {
          deleted.push(row.dataset.newsId);
          AOW.saveDeletedNews(deleted);
        }
      }
      row.remove();
    });
    row.append(button);
  });
};

AOW.initNewsSearch = () => {
  const newsSearch = document.querySelector("#news-search");
  if (!newsSearch) return;
  newsSearch.addEventListener("input", () => {
    const query = newsSearch.value.trim().toLowerCase();
    document.querySelectorAll('[data-tabs="news"] .article-row').forEach((row) => {
      row.classList.toggle("hidden", query && !row.textContent.toLowerCase().includes(query));
    });
  });
};

AOW.renderPublishedArticle = () => {
  const publishedArticle = document.querySelector("#published-article");
  if (!publishedArticle) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedNews().find((entry) => entry.id === id);
  publishedArticle.innerHTML = item ? `<article class="news-article"><div class="article-meta">${item.category} · ${AOW.formatDate(item.date)}</div><h1>${item.title}</h1><p class="article-lead">${item.lead || ""}</p><img class="article-hero-image" src="${item.image}" alt="" /><section><h2>Текст новости</h2><div>${AOW.markdown(item.body || "")}</div></section></article>` : '<section class="content-section"><h1>Новость не найдена</h1><p>Материал мог быть удалён из локального хранилища браузера.</p></section>';
};

AOW.renderPublishedNews();
AOW.applyNewsAdminControls();
AOW.initNewsSearch();
AOW.renderPublishedArticle();
