window.AOW = window.AOW || {};

AOW.tabTitles = {
  updates: "Обновления",
  events: "События",
  tournaments: "Турниры",
  offline: "Оффлайн",
  basics: "Основы игры",
  interesting: "Интересные статьи",
  competitions: "Соревнования",
  dossiers: "Досье персонажей",
  "world-history": "История мира",
  stories: "Рассказы"
};

AOW.formatDate = (value) => {
  const locale = AOW.language === "en" ? "en-GB" : "ru-RU";
  if (!value) return new Date().toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  return new Date(`${value}T00:00:00`).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
};

AOW.initTabs = () => {
  document.querySelectorAll("[data-tabs]").forEach((scope) => {
    const setTab = (tab) => {
      scope.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("active", item.dataset.tab === tab));
      scope.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tab));
      const title = scope.querySelector("#news-title, #wiki-title, #lore-title");
      if (title && AOW.tabTitles[tab]) title.textContent = AOW.t(AOW.tabTitles[tab]);
    };
    scope.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", () => {
        setTab(button.dataset.tab);
      });
    });
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && scope.querySelector(`[data-panel="${category}"]`)) setTab(category);
  });
};

AOW.initTabs();
