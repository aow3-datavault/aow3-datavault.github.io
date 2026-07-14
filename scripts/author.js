window.AOW = window.AOW || {};

const loginPanel = document.querySelector("#login-panel");
const editorPanel = document.querySelector("#editor-panel");
if (loginPanel && editorPanel) {
  const loginForm = document.querySelector("#login-form");
  const loginMessage = document.querySelector("#login-message");
  const logoutButton = document.querySelector("#logout-button");
  const contentType = document.querySelector("#content-type");
  const contentLanguage = document.querySelector("#content-language");
  const dynamicFields = document.querySelector("#dynamic-fields");
  const editorForm = document.querySelector("#editor-form");
  const body = document.querySelector("#content-body");
  const previewButton = document.querySelector("#preview-button");
  const previewPanel = document.querySelector("#preview-panel");
  const previewContent = document.querySelector("#preview-content");
  const draftsList = document.querySelector("#drafts-list");
  const requestedType = new URLSearchParams(window.location.search).get("type");
  const editReference = new URLSearchParams(window.location.search).get("edit");
  let selectedImage = "source materials/images/banner.jpg";
  let editingItem = null;
  let loginPending = false;

  const toolbar = document.createElement("div");
  toolbar.className = "markdown-toolbar";
  toolbar.innerHTML = '<button type="button" data-md="bold" title="Жирный"><strong>B</strong></button><button type="button" data-md="italic" title="Курсив"><em>I</em></button><button type="button" data-md="h2" title="Заголовок">H2</button><button type="button" data-md="list" title="Список">*</button><button type="button" data-md="quote" title="Цитата">&quot;</button><button type="button" data-md="link" title="Ссылка">Link</button>';
  body.closest("label").querySelector("span").after(toolbar);

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

  const setLoggedIn = (token) => {
    AOW.saveAuthorToken(token);
    const loggedIn = Boolean(token);
    loginPanel.classList.toggle("hidden", loggedIn);
    editorPanel.classList.toggle("hidden", !loggedIn);
  };

  const publisherRequest = async (path, payload) => {
    if (!AOW.publisherApiUrl) throw new Error("publisher_not_configured");
    const response = await fetch(`${AOW.publisherApiUrl.replace(/\/$/, "")}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    return { ...data, ok: response.ok };
  };

  const renderFields = () => {
    const type = contentType.value;
    const categories = {
      wiki: ["Для новичков", "Фракции", "Юниты", "Герои", "Режимы игры", "Экономика", "FAQ", "Полный функционал"],
      news: ["Обновления", "События", "Турниры", "Оффлайн"],
      lore: ["Досье персонажей", "История мира", "Рассказы"],
      video: ["Обучающие", "Соревнования", "Обновления", "Трейлеры", "Ответы разработчиков", "Интересные Видео", "Видео от игроков"]
    };
    const articleFields = ["news", "wiki", "lore"].includes(type) ? '<label><span>Краткое описание</span><input id="content-lead" type="text" maxlength="300" placeholder="Короткое описание материала" /></label><label><span>Изображение</span><input id="content-image" type="file" accept="image/png,image/jpeg,image/webp" /></label>' : "";
    dynamicFields.innerHTML = `<label><span>Заголовок</span><input id="content-title" type="text" maxlength="160" placeholder="Название материала" /></label><label><span>Теги</span><input id="content-tags" type="text" maxlength="240" placeholder="тег1, тег2, тег3" /></label><label><span>Категория</span><select id="content-category">${categories[type].map((item) => `<option value="${item}">${contentLanguage.value === "en" ? AOW.t(item) : item}</option>`).join("")}</select></label>${articleFields}${type === "video" ? '<label><span>Ссылка YouTube</span><input id="content-video" type="url" placeholder="https://www.youtube.com/watch?v=..." /></label>' : ""}`;
    if (["news", "wiki", "lore"].includes(type)) {
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
    language: contentLanguage.value,
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
    if (!["news", "wiki", "lore"].includes(data.typeKey)) return AOW.markdown(data.body || "Предпросмотр пуст.");
    const heading = data.typeKey === "wiki" ? "Материал" : data.typeKey === "lore" ? "Лор" : "Текст новости";
    const emptyLead = data.typeKey === "wiki" ? "Краткое описание Wiki-страницы появится здесь." : data.typeKey === "lore" ? "Краткое описание лор-материала появится здесь." : "Краткое описание новости появится здесь.";
    const emptyBody = data.typeKey === "wiki" ? "Текст Wiki-страницы пока пуст." : data.typeKey === "lore" ? "Текст лор-материала пока пуст." : "Текст новости пока пуст.";
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

  const fillEditor = (item) => {
    contentLanguage.value = item.language || "ru";
    contentType.value = item.typeKey;
    renderFields();
    document.querySelector("#content-title").value = item.title || "";
    document.querySelector("#content-tags").value = item.tags || "";
    document.querySelector("#content-category").value = item.category;
    if (document.querySelector("#content-lead")) document.querySelector("#content-lead").value = item.lead || "";
    selectedImage = AOW.safeImageUrl(item.image || "source materials/images/banner.jpg");
    if (document.querySelector("#content-video")) document.querySelector("#content-video").value = item.video || "";
    body.value = item.body || "";
  };

  draftsList.addEventListener("click", (event) => {
    const openId = event.target.dataset.open;
    const deleteId = event.target.dataset.delete;
    if (openId) {
      const draft = AOW.getDrafts().find((item) => item.id === openId);
      if (!draft) return;
      editingItem = null;
      fillEditor(draft);
    }
    if (deleteId) {
      AOW.saveDrafts(AOW.getDrafts().filter((item) => item.id !== deleteId));
      renderDrafts();
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (loginPending) return;
    loginPending = true;
    try {
      const device = await publisherRequest("/auth/device", {});
      if (!device.ok || !device.device_code) throw new Error(device.error || "device_code_failed");
      loginMessage.replaceChildren();
      const instruction = document.createTextNode(`Откройте GitHub, введите код ${device.user_code}, затем вернитесь сюда. `);
      const link = document.createElement("a");
      link.href = device.verification_uri;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Открыть GitHub";
      loginMessage.append(instruction, link);
      const deadline = Date.now() + device.expires_in * 1000;
      let interval = Math.max(device.interval || 5, 5) * 1000;
      while (Date.now() < deadline) {
        await new Promise((resolve) => window.setTimeout(resolve, interval));
        const token = await publisherRequest("/auth/token", { device_code: device.device_code });
        if (token.access_token) {
          loginMessage.textContent = "";
          setLoggedIn(token.access_token);
          renderDrafts();
          return;
        }
        if (token.error === "slow_down") interval += 5000;
        if (!token.ok || !["authorization_pending", "slow_down"].includes(token.error)) throw new Error(token.error || "authorization_failed");
      }
      loginMessage.textContent = "Время подтверждения истекло. Запустите вход ещё раз.";
    } catch {
      loginMessage.textContent = AOW.publisherApiUrl ? "Не удалось войти через GitHub. Проверьте доступ приложения в организации." : "Публикационный Worker пока не настроен.";
    } finally {
      loginPending = false;
    }
  });

  logoutButton.addEventListener("click", () => setLoggedIn(false));
  contentType.addEventListener("change", () => {
    editingItem = null;
    renderFields();
  });
  contentLanguage.addEventListener("change", () => {
    const category = document.querySelector("#content-category")?.value;
    renderFields();
    if (category) document.querySelector("#content-category").value = category;
  });
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
  publishButton.addEventListener("click", async () => {
    const data = getFormData();
    const stores = {
      wiki: "aowPublishedWiki",
      news: "aowPublishedNews",
      lore: "aowPublishedLore",
      video: "aowPublishedVideos"
    };
    if (data.typeKey === "video" && !/(youtube\.com|youtu\.be)/i.test(data.video)) {
      window.alert("Укажите ссылку на ролик YouTube.");
      return;
    }
    const typeLabels = { wiki: "Wiki-страницу", news: "новость", lore: "лор-материал", video: "видео" };
    const action = editingItem ? "Сохранить изменения" : "Опубликовать";
    if (!window.confirm(`${action} ${typeLabels[data.typeKey]} через GitHub?`)) return;
    const published = AOW.getStoredList(stores[data.typeKey]);
    const updated = {
      ...data,
      id: editingItem?.id || crypto.randomUUID(),
      date: editingItem?.date || data.date,
      publishedAt: editingItem?.publishedAt || new Date().toISOString()
    };
    const token = AOW.getAuthorToken();
    if (!token) {
      setLoggedIn(null);
      window.alert("Сессия GitHub завершена. Войдите снова.");
      return;
    }
    publishButton.disabled = true;
    try {
      const result = await publisherRequest("/publish", { token, type: data.typeKey, item: updated });
      if (!result.ok) throw new Error([result.error, result.github_status, result.detail].filter(Boolean).join(": ") || "publish_failed");
      const index = published.findIndex((item) => item.id === updated.id);
      if (index === -1) published.unshift(updated);
      else published[index] = updated;
      localStorage.setItem(stores[data.typeKey], JSON.stringify(published));
      window.alert(editingItem ? "Изменения отправлены в GitHub Pages." : "Материал отправлен в GitHub Pages.");
    } catch (error) {
      window.alert(`Публикация не прошла: ${error.message}`);
    } finally {
      publishButton.disabled = false;
    }
  });

  const [editType, editId] = (editReference || "").split(":");
  if (["wiki", "news", "lore", "video"].includes(editType) && editId) {
    const stores = { wiki: "aowPublishedWiki", news: "aowPublishedNews", lore: "aowPublishedLore", video: "aowPublishedVideos" };
    editingItem = AOW.getStoredList(stores[editType]).find((item) => item.id === editId) || null;
  }
  contentLanguage.value = AOW.language;
  if (editingItem) contentType.value = editingItem.typeKey;
  else if (["wiki", "news", "lore", "video"].includes(requestedType)) contentType.value = requestedType;
  renderFields();
  if (editingItem) fillEditor(editingItem);
  setLoggedIn(AOW.getAuthorToken());
  renderDrafts();
  AOW.readyPublishedContent?.then(() => {
    if (editingItem || !["wiki", "news", "lore", "video"].includes(editType) || !editId) return;
    const stores = { wiki: "aowPublishedWiki", news: "aowPublishedNews", lore: "aowPublishedLore", video: "aowPublishedVideos" };
    editingItem = AOW.getStoredList(stores[editType]).find((item) => item.id === editId) || null;
    if (editingItem) fillEditor(editingItem);
  });
}
