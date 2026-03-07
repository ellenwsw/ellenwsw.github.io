import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import { archivePosts } from "../../data/archivePosts";
import { simpleMarkdownToElements } from "../../utils/simpleMarkdown";

import "./Archive.css";

const toPrettyTagLabel = (tag) =>
  tag
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : ""))
    .join(" ");

export default function ArchivePost({ theme, onToggle }) {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");

  const post = useMemo(
    () => archivePosts.find((entry) => entry.slug === slug),
    [slug]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      if (!post) {
        setError("Post not found.");
        return;
      }

      try {
        const response = await fetch(post.markdownPath);
        if (!response.ok) {
          throw new Error("Unable to load markdown content");
        }
        const text = await response.text();
        if (isMounted) {
          setMarkdown(text);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    }

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [post]);

  return (
    <div
      className="archive-page"
      style={{ backgroundColor: theme.body, color: theme.text }}
    >
      <Header theme={theme} onToggle={onToggle} />
      <main className="archive-main post-main">
        <Link className="back-link" to="/academic-archive">
          ← Back to Academic Archive
        </Link>

        {!post && <p className="empty-results">Post not found.</p>}

        {post && (
          <>
            <header className="post-header">
              <h1>{post.title}</h1>
              <p>
                {post.degree} · {post.course} ·{" "}
                {new Date(post.date).toLocaleDateString()}
              </p>
              <div className="chip-row">
                {post.tags.map((tag) => (
                  <span key={`${post.slug}-tag-${tag}`} className="chip">
                    {post.tagLabels?.[tag] || toPrettyTagLabel(tag)}
                  </span>
                ))}
              </div>
            </header>

            <section
              className="outputs-box"
              style={{ borderColor: theme.imageHighlight }}
            >
              <h3>Showcased outputs</h3>
              <ul>
                {post.outputs.map((output) => (
                  <li key={`${post.slug}-${output.label}`}>
                    <strong>{output.label}:</strong> {output.note}
                  </li>
                ))}
              </ul>
            </section>

            {error && <p className="empty-results">{error}</p>}
            {!error && markdown && (
              <article className="post-markdown">
                {simpleMarkdownToElements(markdown)}
              </article>
            )}
          </>
        )}
      </main>
      <Footer theme={theme} />
      <TopButton theme={theme} />
    </div>
  );
}
