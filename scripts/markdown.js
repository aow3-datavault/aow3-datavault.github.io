window.AOW = window.AOW || {};

AOW.inlineMarkdown = (text) => text
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
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

    if (/^###\s+/.test(line)) html += `<h3>${AOW.inlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`;
    else if (/^##\s+/.test(line)) html += `<h2>${AOW.inlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`;
    else if (/^#\s+/.test(line)) html += `<h1>${AOW.inlineMarkdown(line.replace(/^#\s+/, ""))}</h1>`;
    else if (/^>\s+/.test(line)) html += `<blockquote>${AOW.inlineMarkdown(line.replace(/^>\s+/, ""))}</blockquote>`;
    else if (line.trim()) html += `<p>${AOW.inlineMarkdown(line)}</p>`;
  });

  closeList();
  return html;
};
