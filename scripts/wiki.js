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
    article.innerHTML = `<span>${item.category} · ${AOW.formatDate(item.date)}</span><h3>${item.title}</h3><p>${item.lead || "Опубликованная Wiki-страница."}</p><a href="wiki/article.html?id=${item.id}">Читать</a>`;
    panel.prepend(article);
  });
};

AOW.applyWikiAdminControls = () => {
  const wikiPage = document.querySelector('[data-tabs="wiki"]');
  if (!wikiPage || localStorage.getItem("aowAuthorLoggedIn") !== "true") return;
  wikiPage.querySelectorAll(".article-row").forEach((row) => {
    if (row.querySelector(".delete-wiki-button")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-news-button delete-wiki-button";
    button.innerHTML = "🗑 Удалить";
    button.addEventListener("click", () => {
      const title = row.querySelector("h3")?.textContent || "эту страницу";
      if (!window.confirm(`Удалить Wiki-страницу «${title}»?`)) return;
      if (row.dataset.publishedWikiId) {
        localStorage.setItem("aowPublishedWiki", JSON.stringify(AOW.getPublishedWiki().filter((item) => item.id !== row.dataset.publishedWikiId)));
      }
      if (row.dataset.wikiId) {
        const deleted = AOW.getDeletedWiki();
        if (!deleted.includes(row.dataset.wikiId)) {
          deleted.push(row.dataset.wikiId);
          AOW.saveDeletedWiki(deleted);
        }
      }
      row.remove();
    });
    row.append(button);
  });
};

AOW.initWikiSearch = () => {
  const wikiSearch = document.querySelector("#wiki-search");
  if (!wikiSearch) return;
  wikiSearch.addEventListener("input", () => {
    const query = wikiSearch.value.trim().toLowerCase();
    document.querySelectorAll('[data-tabs="wiki"] .article-row').forEach((row) => {
      row.classList.toggle("hidden", query && !row.textContent.toLowerCase().includes(query));
    });
  });
};

AOW.renderPublishedWikiArticle = () => {
  const publishedWiki = document.querySelector("#published-wiki");
  if (!publishedWiki) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = AOW.getPublishedWiki().find((entry) => entry.id === id);
  publishedWiki.innerHTML = item ? `<article class="news-article"><div class="article-meta">${item.category} · ${AOW.formatDate(item.date)}</div><h1>${item.title}</h1><p class="article-lead">${item.lead || ""}</p><img class="article-hero-image" src="${item.image}" alt="" /><section><h2>Материал</h2><div>${AOW.markdown(item.body || "")}</div></section></article>` : '<section class="content-section"><h1>Wiki-страница не найдена</h1><p>Материал мог быть удалён из локального хранилища браузера.</p></section>';
};

AOW.renderPublishedWiki();
AOW.applyWikiAdminControls();
AOW.initWikiSearch();
AOW.renderPublishedWikiArticle();
