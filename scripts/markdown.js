window.AOW = window.AOW || {};

AOW.markdownImageUrl = (url) => url.startsWith("source materials/") && /\/(wiki|news|lore)\//.test(window.location.pathname)
  ? `../${url}`
  : url;

AOW.inlineMarkdown = (text) => text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;")
  .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+|source materials\/images\/[^)]+)\)/g, (_match, alt, url) => `<img class="article-inline-image" src="${AOW.markdownImageUrl(url)}" alt="${alt}" loading="lazy" />`)
  .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  .replace(/\[([^\]]+)\]\(#([a-z][a-z0-9-]*)\)/gi, '<a href="#$2">$1</a>')
  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  .replace(/\*(.*?)\*/g, "<em>$1</em>");

AOW.markdown = (text) => {
  const lines = text.split("\n");
  let html = "";
  let inList = false;
  const closeList = () => {
    if (!inList) return;
    html += "</ul>";
    inList = false;
  };

  lines.forEach((line) => {
    if (/^-\s+/.test(line)) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${AOW.inlineMarkdown(line.replace(/^-\s+/, ""))}</li>`;
      return;
    }

    closeList();

    const heading = (level) => {
      const text = line.replace(new RegExp(`^#{${level}}\\s+`), "");
      const match = text.match(/^(.*?)\s+\{#([a-z][a-z0-9-]*)\}$/i);
      return `<h${level}${match ? ` id="${match[2]}"` : ""}>${AOW.inlineMarkdown(match ? match[1] : text)}</h${level}>`;
    };
    if (/^###\s+/.test(line)) html += heading(3);
    else if (/^##\s+/.test(line)) html += heading(2);
    else if (/^#\s+/.test(line)) html += heading(1);
    else if (/^>\s+/.test(line)) html += `<blockquote>${AOW.inlineMarkdown(line.replace(/^>\s+/, ""))}</blockquote>`;
    else if (line.trim()) html += `<p>${AOW.inlineMarkdown(line)}</p>`;
  });

  closeList();
  return html;
};
