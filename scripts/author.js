window.AOW = window.AOW || {};

const loginPanel = document.querySelector("#login-panel");
const editorPanel = document.querySelector("#editor-panel");
if (loginPanel && editorPanel) {
  const loginForm = document.querySelector("#login-form");
  const loginMessage = document.querySelector("#login-message");
  const logoutButton = document.querySelector("#logout-button");
  const contentType = document.querySelector("#content-type");
  const dynamicFields = document.querySelector("#dynamic-fields");
  const editorForm = document.querySelector("#editor-form");
  const body = document.querySelector("#content-body");
  const previewButton = document.querySelector("#preview-button");
  const previewPanel = document.querySelector("#preview-panel");
  const previewContent = document.querySelector("#preview-content");
  const draftsList = document.querySelector("#drafts-list");
  const requestedType = new URLSearchParams(window.location.search).get("type");
  const credentialsDigest = "28cac627945d3f3ae09b7ce4c1f951421d24f815636889c199d568eae84f7cae";
  let selectedImage = "source materials/images/banner.jpg";
  let failedAttempts = 0;
  let blockedUntil = 0;

  const toolbar = document.createElement("div");
  toolbar.className = "markdown-toolbar";
  toolbar.innerHTML = '<button type="button" data-md="bold" title="Жирный"><strong>B</strong></button><button type="button" data-md="italic" title="Курсив"><em>I</em></button><button type="button" data-md="h2" title="Заголовок">H2</button><button type="button" data-md="list" title="Список">*</button><button type="button" data-md="quote" title="Цитата">&quot;</button><button type="button" data-md="link" title="Ссылка">Link</button>';
  body.closest("label").querySelector("span").after(toolbar);

  const digestCredentials = async (name, password) => {
    const bytes = new TextEncoder().encode(`aow3-community-editor:v1|${name}|${password}`);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const insertMarkdown = (before, after = "", fallback = "") => {
    const start = body.selectionStart;
    const end = body.selectionEnd;
    const selected = body.value.slice(start, end);
    const middle = selected || fallback;
    body.setRangeText(`${before}${middle}${after}`, start, end, "end");
    const cursor = selected ? start + before.length + selected.length + after.length : start + before.length + fallback.length;
    body.setSelectionRange(cursor, cursor);
    body.focus();
  };

  toolbar.addEventListener("click", (event) => {
    const action = event.target.closest("button")?.dataset.md;
    if (!action) return;
    if (action === "bold") insertMarkdown("**", "**");
    if (action === "italic") insertMarkdown("*", "*");
    if (action === "h2") insertMarkdown("\n## ");
    if (action === "list") insertMarkdown("\n- ");
    if (action === "quote") insertMarkdown("\n> ");
    if (action === "link") insertMarkdown("[", "](https://)");
  });

  const setLoggedIn = (value) => {
    sessionStorage.setItem("aowAuthorLoggedIn", value ? "true" : "false");
    loginPanel.classList.toggle("hidden", value);
    editorPanel.classList.toggle("hidden", !value);
  };

  const renderFields = () => {
    const type = contentType.value;
    const categories = {
      wiki: ["Для новичков", "Фракции", "Юниты", "Герои", "Режимы игры", "Экономика", "FAQ", "Полный функционал"],
      news: ["Обновления", "События", "Турниры", "Оффлайн"],
      lore: ["Досье персонажей", "История мира", "Рассказы", "Карта мира"],
      video: ["Обучающие", "Соревнования", "Обновления", "Трейлеры", "Ответы разработчиков", "Интересные Видео", "Видео от игроков"]
    };
    const articleFields = ["news", "wiki"].includes(type) ? '<label><span>Краткое описание</span><input id="content-lead" type="text" maxlength="300" placeholder="Короткое описание материала" /></label><label><span>Изображение</span><input id="content-image" type="file" accept="image/png,image/jpeg,image/webp" /></label>' : "";
    dynamicFields.innerHTML = `<label><span>Заголовок</span><input id="content-title" type="text" maxlength="160" placeholder="Название материала" /></label><label><span>Теги</span><input id="content-tags" type="text" maxlength="240" placeholder="тег1, тег2, тег3" /></label><label><span>Категория</span><select id="content-category">${categories[type].map((item) => `<option>${item}</option>`).join("")}</select></label>${articleFields}${type === "video" ? '<label><span>Ссылка YouTube</span><input id="content-video" type="url" placeholder="https://www.youtube.com/watch?v=..." /></label>' : ""}`;
    if (["news", "wiki"].includes(type)) {
      selectedImage = "source materials/images/banner.jpg";
      document.querySelector("#content-image").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          loginMessage.textContent = "Изображение должно быть не больше 2 МБ.";
          event.target.value = "";
          return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          selectedImage = AOW.safeImageUrl(reader.result);
        });
        reader.readAsDataURL(file);
      });
    }
  };

  const getFormData = () => ({
    typeKey: contentType.value,
    title: document.querySelector("#content-title").value.trim() || "Без названия",
    tags: document.querySelector("#content-tags").value.trim(),
    category: document.querySelector("#content-category").value,
    date: new Date().toISOString().slice(0, 10),
    lead: document.querySelector("#content-lead")?.value.trim() || "",
    image: selectedImage,
    video: document.querySelector("#content-video")?.value.trim() || "",
    body: body.value.trim()
  });

  const renderPreview = (data) => {
    if (!["news", "wiki"].includes(data.typeKey)) return AOW.markdown(data.body || "Предпросмотр пуст.");
    const heading = data.typeKey === "wiki" ? "Материал" : "Текст новости";
    const emptyLead = data.typeKey === "wiki" ? "Краткое описание Wiki-страницы появится здесь." : "Краткое описание новости появится здесь.";
    const emptyBody = data.typeKey === "wiki" ? "Текст Wiki-страницы пока пуст." : "Текст новости пока пуст.";
    return `<article class="news-article preview-article"><div class="article-meta">${AOW.escapeHtml(data.category)} · ${AOW.formatDate(data.date)}</div><h1>${AOW.escapeHtml(data.title)}</h1><p class="article-lead">${AOW.escapeHtml(data.lead || emptyLead)}</p><img class="article-hero-image" src="${AOW.escapeHtml(AOW.safeImageUrl(data.image))}" alt="" /><section><h2>${heading}</h2><div>${AOW.markdown(data.body || emptyBody)}</div></section></article>`;
  };

  const renderDrafts = () => {
    const drafts = AOW.getDrafts();
    draftsList.replaceChildren();
    if (!drafts.length) {
      const empty = document.createElement("p");
      empty.className = "muted-text";
      empty.textContent = "Черновиков пока нет.";
      draftsList.append(empty);
      return;
    }
    drafts.forEach((draft) => {
      const row = document.createElement("div");
      row.className = "draft-row";
      const details = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = draft.title;
      const type = document.createElement("span");
      type.textContent = `${draft.type} · ${draft.category}`;
      details.append(title, type);
      const open = document.createElement("button");
      open.type = "button";
      open.dataset.open = draft.id;
      open.textContent = "Открыть";
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.delete = draft.id;
      remove.textContent = "Удалить";
      row.append(details, open, remove);
      draftsList.append(row);
    });
  };

  draftsList.addEventListener("click", (event) => {
    const openId = event.target.dataset.open;
    const deleteId = event.target.dataset.delete;
    if (openId) {
      const draft = AOW.getDrafts().find((item) => item.id === openId);
      if (!draft) return;
      contentType.value = draft.typeKey;
      renderFields();
      document.querySelector("#content-title").value = draft.title;
      document.querySelector("#content-tags").value = draft.tags;
      document.querySelector("#content-category").value = draft.category;
      if (document.querySelector("#content-lead")) document.querySelector("#content-lead").value = draft.lead || "";
      selectedImage = AOW.safeImageUrl(draft.image);
      if (document.querySelector("#content-video")) document.querySelector("#content-video").value = draft.video || "";
      body.value = draft.body || "";
    }
    if (deleteId) {
      AOW.saveDrafts(AOW.getDrafts().filter((item) => item.id !== deleteId));
      renderDrafts();
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!crypto?.subtle) {
      loginMessage.textContent = "Ваш браузер не поддерживает защищённую проверку входа.";
      return;
    }
    if (Date.now() < blockedUntil) {
      loginMessage.textContent = "Слишком много попыток. Повторите вход через минуту.";
      return;
    }
    const name = document.querySelector("#login-name").value.trim();
    const password = document.querySelector("#login-password").value;
    const digest = await digestCredentials(name, password);
    if (name === "admin" && digest === credentialsDigest) {
      failedAttempts = 0;
      loginMessage.textContent = "";
      setLoggedIn(true);
      renderDrafts();
      return;
    }
    failedAttempts += 1;
    if (failedAttempts >= 5) {
      blockedUntil = Date.now() + 60_000;
      failedAttempts = 0;
      loginMessage.textContent = "Слишком много попыток. Повторите вход через минуту.";
      return;
    }
    loginMessage.textContent = "Неверный логин или пароль.";
  });

  logoutButton.addEventListener("click", () => setLoggedIn(false));
  contentType.addEventListener("change", renderFields);
  previewButton.addEventListener("click", () => {
    previewContent.innerHTML = renderPreview(getFormData());
    previewPanel.classList.remove("hidden");
  });
  editorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const typeLabels = { wiki: "Wiki-страница", news: "Новость", lore: "Лор", video: "Видео" };
    const data = getFormData();
    const draft = { id: crypto.randomUUID(), type: typeLabels[data.typeKey], created: new Date().toLocaleString("ru-RU"), ...data };
    const drafts = AOW.getDrafts();
    drafts.unshift(draft);
    AOW.saveDrafts(drafts.slice(0, 50));
    renderDrafts();
  });

  const publishButton = document.createElement("button");
  publishButton.className = "button button-success";
  publishButton.type = "button";
  publishButton.textContent = "Опубликовать";
  editorForm.querySelector(".hero-actions").prepend(publishButton);
  publishButton.addEventListener("click", () => {
    const data = getFormData();
    if (!["news", "wiki"].includes(data.typeKey)) {
      window.alert("Публикация сейчас подключена только для новостей и Wiki-страниц.");
      return;
    }
    const isWiki = data.typeKey === "wiki";
    if (!window.confirm(isWiki ? "Опубликовать Wiki-страницу?" : "Опубликовать новость?")) return;
    const published = isWiki ? AOW.getPublishedWiki() : AOW.getPublishedNews();
    published.unshift({ id: crypto.randomUUID(), publishedAt: new Date().toISOString(), ...data });
    localStorage.setItem(isWiki ? "aowPublishedWiki" : "aowPublishedNews", JSON.stringify(published.slice(0, 100)));
    window.alert(isWiki ? "Wiki-страница опубликована локально." : "Новость опубликована локально.");
  });

  if (["wiki", "news", "lore", "video"].includes(requestedType)) contentType.value = requestedType;
  renderFields();
  setLoggedIn(sessionStorage.getItem("aowAuthorLoggedIn") === "true");
  renderDrafts();
}
