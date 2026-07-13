window.AOW = window.AOW || {};

AOW.tabTitles = {
  updates: "Обновления",
  events: "События",
  tournaments: "Турниры",
  offline: "Оффлайн",
  beginners: "Для новичков",
  factions: "Фракции",
  units: "Юниты",
  heroes: "Герои",
  modes: "Режимы игры",
  economy: "Экономика",
  faq: "FAQ",
  features: "Полный функционал"
};

AOW.formatDate = (value) => {
  if (!value) return new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  return new Date(`${value}T00:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
};

AOW.initTabs = () => {
  document.querySelectorAll("[data-tabs]").forEach((scope) => {
    scope.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.dataset.tab;
        scope.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
        scope.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab));
        const newsTitle = scope.querySelector("#news-title");
        if (newsTitle && AOW.tabTitles[tab]) newsTitle.textContent = AOW.tabTitles[tab];
        const wikiTitle = scope.querySelector("#wiki-title");
        if (wikiTitle && AOW.tabTitles[tab]) wikiTitle.textContent = AOW.tabTitles[tab];
      });
    });
  });
};

AOW.initTabs();
