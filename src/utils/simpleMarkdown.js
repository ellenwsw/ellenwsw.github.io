import React from "react";

function renderInline(text, keyPrefix) {
  const parts = [];
  const tokenRegex = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let tokenIndex = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      parts.push(
        <img
          key={`${keyPrefix}-img-${tokenIndex++}`}
          src={match[2]}
          alt={match[1] || "Archive post image"}
          loading="lazy"
        />
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
      parts.push(
        <a
          key={`${keyPrefix}-link-${tokenIndex++}`}
          href={match[4]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[3]}
        </a>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : [text];
}

export function simpleMarkdownToElements(markdown) {
  const lines = markdown.split("\n");
  const elements = [];
  let listItems = [];
  let paragraphLines = [];
  let key = 0;

  const flushParagraph = () => {
    if (paragraphLines.length) {
      const paragraphText = paragraphLines.join(" ").trim();
      elements.push(
        <p key={`p-${key++}`}>{renderInline(paragraphText, `p-${key}`)}</p>
      );
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={`ul-${key++}`}>
          {listItems.map((item, index) => (
            <li key={`li-${key++}-${index}`}>
              {renderInline(item, `li-${key}-${index}`)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const imageOnlyMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageOnlyMatch) {
      flushParagraph();
      flushList();
      elements.push(
        <figure key={`fig-${key++}`}>
          <img
            src={imageOnlyMatch[2]}
            alt={imageOnlyMatch[1] || "Archive post image"}
            loading="lazy"
          />
        </figure>
      );
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(<h1 key={`h1-${key++}`}>{line.replace(/^#\s+/, "")}</h1>);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(<h2 key={`h2-${key++}`}>{line.replace(/^##\s+/, "")}</h2>);
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(<h3 key={`h3-${key++}`}>{line.replace(/^###\s+/, "")}</h3>);
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.replace(/^-\s+/, ""));
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      listItems.push(line.replace(/^\d+\.\s+/, ""));
      return;
    }

    paragraphLines.push(line);
  });

  flushParagraph();
  flushList();

  return elements;
}
