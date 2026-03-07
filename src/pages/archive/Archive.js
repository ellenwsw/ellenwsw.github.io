import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import {
  archivePosts,
  archiveSettings,
  themeOrder,
} from "../../data/archivePosts";
import "./Archive.css";

const uniqueValues = (values) => [...new Set(values)].sort();

const toPrettyTagLabel = (tag) =>
  tag
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : ""))
    .join(" ");

export default function Archive({ theme, onToggle }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const showPrivate = archiveSettings.includePrivateByDefault;

  const availableTags = useMemo(() => {
    const tagValues = uniqueValues(archivePosts.flatMap((post) => post.tags));

    return tagValues.map((value) => {
      const matchedPost = archivePosts.find((post) =>
        post.tags.includes(value)
      );
      return {
        value,
        label: matchedPost?.tagLabels?.[value] || toPrettyTagLabel(value),
      };
    });
  }, []);

  const filteredPosts = useMemo(() => {
    return archivePosts
      .filter((post) => (showPrivate ? true : !post.isPrivate))
      .filter((post) => {
        const text = [
          post.title,
          post.course,
          post.degree,
          post.theme,
          ...post.keySkills,
          ...post.tags,
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(searchTerm.toLowerCase());
      })
      .filter((post) =>
        selectedTag === "all" ? true : post.tags.includes(selectedTag)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchTerm, selectedTag, showPrivate]);

  const groupedPosts = useMemo(() => {
    const grouped = filteredPosts.reduce((acc, post) => {
      if (!acc[post.theme]) {
        acc[post.theme] = [];
      }
      acc[post.theme].push(post);
      return acc;
    }, {});

    const orderedThemes = [
      ...themeOrder.filter((entry) => grouped[entry]),
      ...Object.keys(grouped).filter((entry) => !themeOrder.includes(entry)),
    ].sort((a, b) => {
      const latestInA = Math.max(
        ...grouped[a].map((post) => new Date(post.date))
      );
      const latestInB = Math.max(
        ...grouped[b].map((post) => new Date(post.date))
      );
      return latestInB - latestInA;
    });

    return orderedThemes.map((themeName) => ({
      themeName,
      posts: grouped[themeName].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    }));
  }, [filteredPosts]);

  return (
    <div
      className="archive-page"
      style={{ backgroundColor: theme.body, color: theme.text }}
    >
      <Header theme={theme} onToggle={onToggle} />
      <main className="archive-main">
        <section className="archive-hero">
          <h1>{archiveSettings.title}</h1>
          <p>{archiveSettings.subtitle}</p>
        </section>

        <section
          className="archive-controls"
          style={{ backgroundColor: theme.highlight }}
        >
          <input
            aria-label="Search academic archive"
            type="text"
            placeholder="Search by theme, skill, or keywords"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            value={selectedTag}
            onChange={(event) => setSelectedTag(event.target.value)}
            aria-label="Filter by tag"
          >
            <option value="all">All tags</option>
            {availableTags.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </select>
        </section>

        <section className="archive-results">
          {groupedPosts.length === 0 && (
            <p className="empty-results">No posts matched your filters.</p>
          )}

          {groupedPosts.map((group) => (
            <div key={group.themeName} className="theme-group">
              <h2>{group.themeName}</h2>
              <div className="post-grid">
                {group.posts.map((post) => (
                  <article
                    key={post.slug}
                    className={`post-card ${post.isPrivate ? "private" : ""}`}
                    style={{ borderColor: theme.imageHighlight }}
                  >
                    <div className="post-card-meta">
                      <span>{post.course}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3>
                      <Link to={`/academic-archive/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p>{post.degree}</p>
                    <div className="chip-row">
                      {post.keySkills.map((skill) => (
                        <span key={`${post.slug}-${skill}`} className="chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {post.isPrivate && (
                      <small className="private-label">Private entry</small>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer theme={theme} onToggle={onToggle} />
      <TopButton theme={theme} />
    </div>
  );
}
