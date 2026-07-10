window.AOW = window.AOW || {};

AOW.getPublishedNews = () => JSON.parse(localStorage.getItem("aowPublishedNews") || "[]");
AOW.getDeletedNews = () => JSON.parse(localStorage.getItem("aowDeletedNews") || "[]");
AOW.saveDeletedNews = (items) => localStorage.setItem("aowDeletedNews", JSON.stringify(items));

AOW.getPublishedWiki = () => JSON.parse(localStorage.getItem("aowPublishedWiki") || "[]");
AOW.getDeletedWiki = () => JSON.parse(localStorage.getItem("aowDeletedWiki") || "[]");
AOW.saveDeletedWiki = (items) => localStorage.setItem("aowDeletedWiki", JSON.stringify(items));

AOW.getDrafts = () => JSON.parse(localStorage.getItem("aowDrafts") || "[]");
AOW.saveDrafts = (drafts) => localStorage.setItem("aowDrafts", JSON.stringify(drafts));
