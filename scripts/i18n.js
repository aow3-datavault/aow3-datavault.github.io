window.AOW = window.AOW || {};

AOW.language = localStorage.getItem("aowLanguage") === "en" ? "en" : "ru";

const translations = {
  "Главная навигация": "Main navigation",
  "Выбор языка": "Language selection",
  "Видео": "Videos",
  "Сюжет": "Lore",
  "Сообщество": "Community",
  "Официальная база знаний": "Official knowledge base",
  "Все права защищены. © Gear Games, 2026.": "All rights reserved. © Gear Games, 2026.",
  "О проекте": "About",
  "Открыть": "Open",
  "Читать": "Read",
  "Редактировать": "Edit",
  "Удалить": "Delete",
  "Назад": "Back",
  "Без названия": "Untitled",
  "Материалы появятся позже.": "Materials will appear later.",
  "Материал сюжета.": "Lore material.",
  "Опубликованная новость.": "Published news item.",
  "Опубликованная Wiki-страница.": "Published Wiki page.",
  "Материал не найден": "Material not found",
  "Материал мог быть удалён из локального хранилища браузера.": "The material may have been removed from this browser's local storage.",
  "Wiki-страница не найдена": "Wiki page not found",
  "Новость не найдена": "News item not found",
  "Wiki и гайды": "Wiki and guides",
  "Справочник для новичков и опытных командиров: механики, фракции, юниты, герои, режимы и экономика.": "A reference for new and experienced commanders: mechanics, factions, units, heroes, modes, and economy.",
  "Поиск по Wiki": "Search Wiki",
  "Категории": "Categories",
  "Для новичков": "For beginners",
  "Фракции": "Factions",
  "Юниты": "Units",
  "Герои": "Heroes",
  "Режимы игры": "Game modes",
  "Экономика": "Economy",
  "Полный функционал": "Full feature index",
  "Новости": "News",
  "Раздел для обновлений игры, событий, турниров и оффлайн-мероприятий.": "Updates, events, tournaments, and offline activities.",
  "Поиск по новостям": "Search news",
  "Обновления": "Updates",
  "События": "Events",
  "Турниры": "Tournaments",
  "Оффлайн": "Offline",
  "Досье персонажей": "Character dossiers",
  "История мира": "World history",
  "Рассказы": "Stories",
  "Все наши видео, удобно разбитые по категориям!": "All our videos, organized by category.",
  "Обучающие": "Guides",
  "Соревнования": "Competitive",
  "Трейлеры": "Trailers",
  "Ответы разработчиков": "Developer answers",
  "Интересные Видео": "Interesting videos",
  "Видео от игроков": "Player videos",
  "Соцсети, фан-кит, партнеры, медиа.": "Social media, fan kit, partners, and media.",
  "Социальные сети": "Social media",
  "Канал сообщества": "Community channel",
  "Фан-кит": "Fan kit",
  "Материалы для авторов: логотипы, арты, баннеры и шаблоны для публикаций.": "Assets for creators: logos, artwork, banners, and publication templates.",
  "Партнерская программа": "Partner program",
  "Переходите на каналы наших партнёров и подписывайтесь!": "Visit our partners' channels and subscribe!",
  "Здесь будут условия участия, требования к авторам и форма связи с командой сообщества.": "Participation terms, creator requirements, and contact details for the community team will appear here.",
  "Канал партнера": "Partner channel",
  "Медиа": "Media",
  "Скриншот": "Screenshot",
  "Арт": "Artwork",
  "Промо": "Promo",
  "Баннер": "Banner",
  "Глобальный поиск": "Global search",
  "Результаты поиска": "Search results",
  "Введите ключевое слово.": "Enter a keyword.",
  "Ничего не найдено.": "Nothing found.",
  "Разделы сайта": "Site sections",
  "Wiki и гайды": "Wiki and guides",
  "База для новичков, фракции, юниты, герои, экономика и FAQ.": "A knowledge base for beginners: factions, units, heroes, economy, and FAQ.",
  "Туториалы, турниры, ответы разработчиков, трейлеры и развлекательные ролики.": "Tutorials, tournaments, developer answers, trailers, and entertainment.",
  "Персонажи, история мира и рассказы.": "Characters, world history, and stories.",
  "Социальные сети, фан-кит, партнеры и медиа-материалы.": "Social networks, fan kit, partners, and media assets.",
  "Официальная база знаний": "Official knowledge base",
  "О проекте": "About",
  "Art of War 3 Community Wiki — официальный сайт сообщества Art of War 3.": "Art of War 3 Community Wiki is the official website of the Art of War 3 community.",
  "Зачем нужен сайт": "Why this site exists",
  "Этот портал собирает знания об игре в одном месте: новости, гайды, справочные материалы, сюжет, видео, турниры и ссылки сообщества.": "This portal brings game knowledge together in one place: news, guides, reference materials, lore, videos, tournaments, and community links.",
  "Сайт ведёт команда сообщества Art of War 3. Материалы создаются для игроков, авторов гайдов, организаторов турниров и всех командиров, которым нужен удобный справочник по игре.": "The Art of War 3 community team runs the site. Its materials are for players, guide authors, tournament organizers, and every commander who needs a handy game reference.",
  "В будущем здесь появятся полноценные публикации, авторская зона, архив турниров, база видео и разделы с материалами для партнёров.": "Full publications, an author area, a tournament archive, a video library, and partner resource sections will appear here.",
  "Открыть Wiki": "Open Wiki",
  "Юниты, герои, экономика, FAQ...": "Units, heroes, economy, FAQ...",
  "Энергия, штаб, фракции, герои, FAQ...": "Energy, headquarters, factions, heroes, FAQ...",
  "Патч, событие, турнир, оффлайн...": "Patch, event, tournament, offline...",
  "Новички": "Beginners",
  "Язык публикации": "Publication language",
  "Тип материала": "Material type",
  "Wiki-страница": "Wiki page",
  "Новость": "News item",
  "Текст": "Text",
  "Пишите материал в Markdown": "Write the material in Markdown",
  "Предпросмотр": "Preview",
  "Сохранить черновик": "Save draft",
  "Черновики": "Drafts",
  "Авторская зона": "Author area",
  "Закрытый раздел для редакторов сайта.": "A restricted area for site editors.",
  "Вход": "Sign in",
  "Войдите через GitHub-аккаунт с правом записи в репозиторий организации.": "Sign in with a GitHub account that has write access to the organization repository.",
  "Войти через GitHub": "Sign in with GitHub",
  "Панель автора": "Author panel",
  "Выйти": "Sign out",
  "Заголовок": "Title",
  "Название материала": "Material title",
  "тег1, тег2, тег3": "tag1, tag2, tag3",
  "Категория": "Category",
  "Краткое описание": "Short description",
  "Изображение": "Image",
  "Изображение не выбрано": "No image selected",
  "Убрать изображение": "Remove image",
  "Ссылка YouTube": "YouTube URL",
  "Мини-игры": "Mini-games",
  "Активности": "Activities",
  "Тактический квиз": "Tactical quiz",
  "Боевой календарь": "Battle calendar",
  "Случайный билд": "Random build",
  "Запустить": "Launch",
  "Сгенерировать": "Generate",
  "Турнирный центр": "Tournament hub",
  "Регистрация": "Registration",
  "Скрытая зона для будущих активностей на том же домене, без пункта в основной навигации.": "A hidden area for future activities on the same domain, without a main-navigation entry.",
  "Заглушка мини-игры.": "Mini-game placeholder.",
  "Заглушка активности.": "Activity placeholder.",
  "Заглушка генератора.": "Generator placeholder.",
  "Art of War Masters: комьюнити-соревнования, расписание, сетки, правила, призы, рейтинги и архив матчей.": "Art of War Masters: community competitions, schedules, brackets, rules, prizes, rankings, and a match archive.",
  "Расписание": "Schedule",
  "Расписание соревнований": "Competition schedule",
  "Правила": "Rules",
  "Правила и формат": "Rules and format",
  "Сетка": "Bracket",
  "Сетка Masters": "Masters bracket",
  "Призы": "Prizes",
  "Архив": "Archive",
  "История победителей": "Winners history",
  "Записи": "Recordings",
  "Записи матчей": "Match recordings",
  "Рейтинг": "Ranking",
  "Рейтинг игроков": "Player ranking",
  "Команды": "Teams",
  "Рейтинг команд": "Team ranking"
};

AOW.t = (value) => AOW.language === "en" ? (translations[value] || value) : value;
AOW.categoryKey = (value) => ({
  "Для новичков": "beginners", "For beginners": "beginners",
  "Фракции": "factions", "Factions": "factions",
  "Юниты": "units", "Units": "units",
  "Герои": "heroes", "Heroes": "heroes",
  "Режимы игры": "modes", "Game modes": "modes",
  "Экономика": "economy", "Economy": "economy",
  "FAQ": "faq",
  "Полный функционал": "features", "Full feature index": "features",
  "Обновления": "updates", "Updates": "updates",
  "События": "events", "Events": "events",
  "Турниры": "tournaments", "Tournaments": "tournaments",
  "Оффлайн": "offline", "Offline": "offline",
  "Досье персонажей": "dossiers", "Character dossiers": "dossiers",
  "История мира": "world-history", "World history": "world-history",
  "Рассказы": "stories", "Stories": "stories",
  "Обучающие": "guides", "Guides": "guides",
  "Соревнования": "tournaments", "Competitive": "tournaments",
  "Трейлеры": "trailers", "Trailers": "trailers",
  "Ответы разработчиков": "developers", "Developer answers": "developers",
  "Интересные Видео": "interesting", "Interesting videos": "interesting",
  "Видео от игроков": "players", "Player videos": "players"
}[value] || value);

AOW.categoryTitle = (key) => AOW.t({
  beginners: "Для новичков", factions: "Фракции", units: "Юниты", heroes: "Герои", modes: "Режимы игры", economy: "Экономика", faq: "FAQ", features: "Полный функционал",
  updates: "Обновления", events: "События", tournaments: "Турниры", offline: "Оффлайн",
  dossiers: "Досье персонажей", "world-history": "История мира", stories: "Рассказы",
  guides: "Обучающие", trailers: "Трейлеры", developers: "Ответы разработчиков", interesting: "Интересные Видео", players: "Видео от игроков"
}[key] || key);

AOW.setLanguage = (language) => {
  localStorage.setItem("aowLanguage", language);
  window.location.reload();
};

const translateText = (node) => {
  const value = node.nodeValue.trim();
  if (!value || !translations[value]) return;
  node.nodeValue = node.nodeValue.replace(value, translations[value]);
};

const fitHeroTitles = () => {
  document.querySelectorAll(".page-hero h1, .hero-home h1").forEach((title) => {
    title.style.removeProperty("font-size");
    title.style.removeProperty("white-space");
    if (!window.matchMedia("(max-width: 680px)").matches) return;
    const hero = title.parentElement;
    const heroStyle = window.getComputedStyle(hero);
    const availableWidth = hero.clientWidth - parseFloat(heroStyle.paddingLeft) - parseFloat(heroStyle.paddingRight);
    let fontSize = parseFloat(window.getComputedStyle(title).fontSize);
    title.style.whiteSpace = "nowrap";
    while (title.scrollWidth > availableWidth && fontSize > 22) {
      fontSize -= 1;
      title.style.fontSize = `${fontSize}px`;
    }
    if (title.scrollWidth > availableWidth) title.style.removeProperty("white-space");
  });
};

AOW.fitArticleTitles = () => {
  document.querySelectorAll(".news-article h1").forEach((title) => {
    title.style.removeProperty("font-size");
    if (!window.matchMedia("(max-width: 680px)").matches) return;
    const article = title.closest(".news-article");
    const articleStyle = window.getComputedStyle(article);
    const availableWidth = article.clientWidth - parseFloat(articleStyle.paddingLeft) - parseFloat(articleStyle.paddingRight);
    const style = window.getComputedStyle(title);
    const context = document.createElement("canvas").getContext("2d");
    let fontSize = parseFloat(style.fontSize);
    const words = title.textContent.trim().split(/\s+/);
    const letterSpacing = Number.parseFloat(style.letterSpacing);
    const measure = (word) => {
      context.font = `${style.fontStyle} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      return context.measureText(word).width + Math.max(0, word.length - 1) * (Number.isFinite(letterSpacing) ? letterSpacing : 0);
    };
    while (Math.max(...words.map(measure)) > availableWidth && fontSize > 22) fontSize -= 1;
    title.style.fontSize = `${fontSize}px`;
  });
};

const initializeLanguage = () => {
  document.documentElement.lang = AOW.language;
  document.querySelectorAll(".language-switcher").forEach((switcher) => {
    switcher.replaceChildren();
    [["ru", "🇷🇺", "Русский"], ["en", "🇬🇧", "English"]].forEach(([language, flag, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = language === AOW.language ? "active" : "";
      button.setAttribute("aria-current", language === AOW.language ? "true" : "false");
      button.setAttribute("aria-label", label);
      button.innerHTML = `<span class="language-flag">${flag}</span><span class="language-label">${label}</span>`;
      button.addEventListener("click", () => AOW.setLanguage(language));
      switcher.append(button);
    });
  });
  document.querySelectorAll(".topbar").forEach((topbar) => {
    const nav = topbar.querySelector(".main-nav");
    if (!nav || topbar.querySelector(".menu-toggle")) return;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "menu-toggle";
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    toggle.addEventListener("click", () => {
      const open = topbar.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    topbar.insertBefore(toggle, nav);
  });
  if (AOW.language !== "en") {
    fitHeroTitles();
    AOW.fitArticleTitles();
    return;
  }
  document.title = AOW.t(document.title.replace(" | Art of War 3 Community Wiki", "")) + (document.title.includes(" | Art of War 3 Community Wiki") ? " | Art of War 3 Community Wiki" : "");
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(translateText);
  document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => ["placeholder", "aria-label", "title"].forEach((attribute) => {
    if (element.hasAttribute(attribute)) element.setAttribute(attribute, AOW.t(element.getAttribute(attribute)));
  }));
  fitHeroTitles();
  AOW.fitArticleTitles();
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeLanguage);
else initializeLanguage();
let viewportWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth === viewportWidth) return;
  viewportWidth = window.innerWidth;
  fitHeroTitles();
  AOW.fitArticleTitles();
});
window.addEventListener("load", () => {
  fitHeroTitles();
  AOW.fitArticleTitles();
}, { once: true });
document.fonts?.ready?.then(() => {
  fitHeroTitles();
  AOW.fitArticleTitles();
});
