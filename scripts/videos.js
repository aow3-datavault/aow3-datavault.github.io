window.AOW = window.AOW || {};

const videoCategories = {
  guides: "Обучающие",
  tournaments: "Соревнования",
  updates: "Обновления",
  trailers: "Трейлеры",
  developers: "Ответы разработчиков",
  interesting: "Интересные Видео",
  players: "Видео от игроков"
};

const getYoutubeId = (value) => {
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
  } catch {}
  return "";
};

const initializeVideoCatalog = () => {
  const videoData = Object.fromEntries(Object.entries(videoCategories).map(([key, title]) => [key, { title, items: [] }]));
  AOW.getPublishedVideos().forEach((item) => {
    const category = Object.entries(videoCategories).find(([, title]) => title === item.category)?.[0];
    const youtubeId = getYoutubeId(item.video);
    if (category && youtubeId) videoData[category].items.push({ ...item, youtubeId, publishedAt: Date.parse(item.publishedAt || item.date) || 0 });
  });
  Object.values(videoData).forEach(({ items }) => items.sort((a, b) => b.publishedAt - a.publishedAt));

  AOW.videoSearchEntries = Object.entries(videoData).flatMap(([categoryKey, category]) => category.items.map((item) => ({
    title: item.title,
    description: `Видео из категории «${category.title}».`,
    tags: `видео ${category.title}`,
    url: `videos.html?category=${encodeURIComponent(categoryKey)}&video=${encodeURIComponent(item.id)}`,
    section: "Видео"
  })));

  const videoScope = document.querySelector("[data-videos]");
  if (!videoScope) return;
  const player = document.querySelector("#video-player");
  const list = document.querySelector("#video-list");
  const title = document.querySelector("#video-category-title");
  const renderVideos = (category, selectedId) => {
    const data = videoData[category];
    title.textContent = data.title;
    list.innerHTML = "";
    if (!data.items.length) {
      player.removeAttribute("src");
      const empty = document.createElement("div");
      empty.className = "video-empty";
      empty.textContent = "Материалы появятся позже.";
      list.append(empty);
      return;
    }
    const selectedIndex = Math.max(0, data.items.findIndex((item) => item.id === selectedId));
    data.items.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `video-card${index === selectedIndex ? " active" : ""}`;
      const thumbnail = document.createElement("img");
      thumbnail.src = `https://i.ytimg.com/vi/${item.youtubeId}/mqdefault.jpg`;
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      const name = document.createElement("span");
      name.textContent = item.title;
      button.append(thumbnail, name);
      button.addEventListener("click", () => {
        player.src = `https://www.youtube.com/embed/${item.youtubeId}`;
        list.querySelectorAll(".video-card").forEach((card) => card.classList.toggle("active", card === button));
      });
      list.append(button);
      if (AOW.isAuthor()) list.append(...AOW.publicationControls("video", item, () => {
        data.items = data.items.filter((entry) => entry.id !== item.id);
        renderVideos(category, data.items[0]?.id);
      }));
    });
    player.src = `https://www.youtube.com/embed/${data.items[selectedIndex].youtubeId}`;
  };
  videoScope.querySelectorAll("[data-video-category]").forEach((button) => {
    button.addEventListener("click", () => {
      videoScope.querySelectorAll("[data-video-category]").forEach((item) => item.classList.toggle("active", item === button));
      renderVideos(button.dataset.videoCategory);
    });
  });
  const params = new URLSearchParams(window.location.search);
  const category = videoData[params.get("category")] ? params.get("category") : "guides";
  videoScope.querySelectorAll("[data-video-category]").forEach((button) => button.classList.toggle("active", button.dataset.videoCategory === category));
  renderVideos(category, params.get("video"));
};

(AOW.readyPublishedContent || Promise.resolve()).then(initializeVideoCatalog);
