const videoData = {
  guides: {
    title: "Гайды",
    items: [
      { title: "Гайд на авиа", id: "iqLSmeB96tg" },
      { title: "Гайд для новичков", id: "8lhEKQcETFk" },
      { title: "Что строить в первую очередь", id: "uWcbq8ro_i0" },
      { title: "Что качать новичкам", id: "V8INAdRkXT0" },
      { title: "Как отбить раш", id: "px-oNrYA3Jg" },
      { title: "Как играть с ПК", id: "s9-g4kNMj3Q" },
      { title: "Гайд для новичков", id: "H4khGlqqheo" },
      { title: "Советы новичкам", id: "8w1Vmcv2icY" },
      { title: "Как выходить в разведку", id: "JdbBwVUNqok" },
      { title: "Как дефать крепогрен", id: "GubivfmW588" },
      { title: "Прокачка Сопротивления", id: "VicVANGDO-c" },
      { title: "Гайд на авиа", id: "0AmSQhmk4W4" },
      { title: "Турнир Воля случая", id: "B7nYDYuAfjo" },
      { title: "Блиц-дуэль", id: "syUODtPiyCg" },
      { title: "Зомби-блиц", id: "BjsQiqpf-2M" },
      { title: "В поисках Наутилуса", id: "OdflXOaJDvg" },
      { title: "Знатная добыча", id: "ArG536L2gic" },
      { title: "Надёжный напарник", id: "2KlPMJ9j-1Q" },
      { title: "Как за каменной стеной", id: "puBuTLZroRU" },
      { title: "Большие резервы", id: "lEOlfoCNm80" },
      { title: "Две крепости", id: "fopZlbTem1E" },
      { title: "Дороже золота", id: "-xfocqgl5jg" },
      { title: "Тыквенное безумие", id: "tL2erdAgaCA" },
      { title: "Новогодний переполох", id: "MZV2T26P_Ds" },
      { title: "Всё для фронта", id: "Bm12IJ84JSE" },
      { title: "Туториал 1", id: "ajoeN2migw8" },
      { title: "Туториал 2", id: "2mpd-ZZv7jc" },
      { title: "Туториал 3", id: "XjvdBm7Qs1g" },
      { title: "Туториал 4", id: "jzSKOgwbHk8" },
      { title: "Туториал 5", id: "x9ii4lMJwZE" },
      { title: "Всё о настройках Gangsta", id: "azpy5r1hiKc" },
      { title: "Всё о настройках Caesari", id: "Ki8gZHNKV6M" }
    ]
  },
  tournaments: { title: "Турниры", items: [] },
  dev: { title: "Дневники разработчиков", items: [] },
  trailers: { title: "Трейлеры", items: [] },
  interesting: { title: "Интересные видео", items: [] },
  fun: { title: "Развлекательные", items: [] }
};

const videoScope = document.querySelector("[data-videos]");
if (videoScope) {
  const player = document.querySelector("#video-player");
  const list = document.querySelector("#video-list");
  const title = document.querySelector("#video-category-title");
  const renderVideos = (category) => {
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

    data.items.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `video-card${index === 0 ? " active" : ""}`;
      button.textContent = item.title;
      button.addEventListener("click", () => {
        player.src = `https://www.youtube.com/embed/${item.id}`;
        list.querySelectorAll(".video-card").forEach((card) => card.classList.toggle("active", card === button));
      });
      list.append(button);
    });
    player.src = `https://www.youtube.com/embed/${data.items[0].id}`;
  };
  videoScope.querySelectorAll("[data-video-category]").forEach((button) => {
    button.addEventListener("click", () => {
      videoScope.querySelectorAll("[data-video-category]").forEach((item) => item.classList.toggle("active", item === button));
      renderVideos(button.dataset.videoCategory);
    });
  });
  renderVideos("guides");
}
