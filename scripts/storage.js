window.AOW = window.AOW || {};

AOW.getStoredList = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

AOW.escapeHtml = (value) => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

AOW.safeImageUrl = (value) => {
  const url = String(value || "");
  return /^(data:image\/(png|jpeg|webp);base64,|source materials\/images\/)/i.test(url)
    ? url
    : "source materials/images/banner.jpg";
};
AOW.articleImageUrl = (value) => {
  const url = AOW.safeImageUrl(value);
  return url.startsWith("source materials/") ? `../${url}` : url;
};

AOW.normalizeSearch = (value) => String(value || "").toLocaleLowerCase("ru-RU").replace(/ё/g, "е").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
AOW.matchesSearch = (query, ...values) => {
  const terms = AOW.normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return true;
  const searchable = AOW.normalizeSearch(values.join(" "));
  return terms.every((term) => searchable.includes(term));
};

AOW.tagMarkup = (value) => String(value || "").split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => `<span>${AOW.escapeHtml(tag)}</span>`).join("");

AOW.getPublishedNews = () => AOW.getStoredList("aowPublishedNews");
AOW.getDeletedNews = () => AOW.getStoredList("aowDeletedNews");
AOW.saveDeletedNews = (items) => localStorage.setItem("aowDeletedNews", JSON.stringify(items));

AOW.getPublishedWiki = () => AOW.getStoredList("aowPublishedWiki");
AOW.getDeletedWiki = () => AOW.getStoredList("aowDeletedWiki");
AOW.saveDeletedWiki = (items) => localStorage.setItem("aowDeletedWiki", JSON.stringify(items));

AOW.getPublishedLore = () => AOW.getStoredList("aowPublishedLore");
AOW.getPublishedVideos = () => AOW.getStoredList("aowPublishedVideos");
AOW.authorSessionLifetime = 12 * 60 * 60 * 1000;
AOW.getAuthorToken = () => {
  try {
    const session = JSON.parse(localStorage.getItem("aowAuthorSession") || "null");
    if (session?.token && session.expiresAt > Date.now()) return session.token;
  } catch {}
  localStorage.removeItem("aowAuthorSession");
  const legacyToken = sessionStorage.getItem("aowGithubToken");
  if (legacyToken) AOW.saveAuthorToken(legacyToken);
  return legacyToken;
};
AOW.saveAuthorToken = (token) => {
  if (!token) {
    localStorage.removeItem("aowAuthorSession");
    sessionStorage.removeItem("aowGithubToken");
    return;
  }
  localStorage.setItem("aowAuthorSession", JSON.stringify({ token, expiresAt: Date.now() + AOW.authorSessionLifetime }));
  sessionStorage.removeItem("aowGithubToken");
};
AOW.isAuthor = () => Boolean(AOW.getAuthorToken());
AOW.deletePublication = async (type, id) => {
  const token = AOW.getAuthorToken();
  if (!token || !AOW.publisherApiUrl) return { ok: false, error: "author_session_required" };
  const response = await fetch(`${AOW.publisherApiUrl.replace(/\/$/, "")}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, type, id, action: "delete" })
  });
  return { ...(await response.json().catch(() => ({}))), ok: response.ok };
};

AOW.getDrafts = () => AOW.getStoredList("aowDrafts");
AOW.saveDrafts = (drafts) => localStorage.setItem("aowDrafts", JSON.stringify(drafts));

const publicationStorageKeys = {
  wiki: "aowPublishedWiki",
  news: "aowPublishedNews",
  lore: "aowPublishedLore",
  video: "aowPublishedVideos"
};
AOW.removePublication = async (type, item) => {
  if (!window.confirm(`Удалить «${item.title || "этот материал"}»?`)) return false;
  const result = await AOW.deletePublication(type, item.id);
  if (!result.ok) {
    window.alert("Удаление не прошло. Войдите через GitHub заново.");
    return false;
  }
  const key = publicationStorageKeys[type];
  localStorage.setItem(key, JSON.stringify(AOW.getStoredList(key).filter((entry) => entry.id !== item.id)));
  return true;
};
AOW.publicationControls = (type, item, onDelete) => {
  if (!AOW.isAuthor()) return [];
  const edit = document.createElement("button");
  edit.className = "edit-wiki-button";
  edit.type = "button";
  edit.textContent = "✎ Редактировать";
  edit.addEventListener("click", () => {
    window.location.href = `${location.pathname.includes("/") && /\/(wiki|news|lore)\//.test(location.pathname) ? "../" : ""}author.html?edit=${type}:${encodeURIComponent(item.id)}`;
  });
  const remove = document.createElement("button");
  remove.className = "delete-news-button";
  remove.type = "button";
  remove.textContent = "Удалить";
  remove.addEventListener("click", async () => {
    if (await AOW.removePublication(type, item)) onDelete?.();
  });
  return [edit, remove];
};
const storageScript = document.currentScript?.src || "scripts/storage.js";
const publicationDataUrl = new URL("../data/published-content.json", storageScript).toString();

AOW.readyPublishedContent = fetch(publicationDataUrl, { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("publication_data_unavailable");
    return response.json();
  })
  .then((content) => {
    Object.entries(publicationStorageKeys).forEach(([type, key]) => {
      const remote = Array.isArray(content[type]) ? content[type] : [];
      localStorage.setItem(key, JSON.stringify(remote.slice(0, 100)));
    });
    return content;
  })
  .catch(() => null);
