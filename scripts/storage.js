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

AOW.normalizeSearch = (value) => String(value || "").toLocaleLowerCase("ru-RU").replace(/ё/g, "е").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
AOW.matchesSearch = (query, ...values) => {
  const terms = AOW.normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return true;
  const searchable = AOW.normalizeSearch(values.join(" "));
  return terms.every((term) => searchable.includes(term));
};

AOW.getPublishedNews = () => AOW.getStoredList("aowPublishedNews");
AOW.getDeletedNews = () => AOW.getStoredList("aowDeletedNews");
AOW.saveDeletedNews = (items) => localStorage.setItem("aowDeletedNews", JSON.stringify(items));

AOW.getPublishedWiki = () => AOW.getStoredList("aowPublishedWiki");
AOW.getDeletedWiki = () => AOW.getStoredList("aowDeletedWiki");
AOW.saveDeletedWiki = (items) => localStorage.setItem("aowDeletedWiki", JSON.stringify(items));

AOW.getDrafts = () => AOW.getStoredList("aowDrafts");
AOW.saveDrafts = (drafts) => localStorage.setItem("aowDrafts", JSON.stringify(drafts));
