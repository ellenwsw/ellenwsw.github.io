import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./MGEMCapstone.css";

const sampleCode = `library(tidyverse)
library(lubridate)

recovery_summary <- fire_df %>%
  mutate(recovery_year = year(observation_date) - fire_year) %>%
  group_by(recovery_year) %>%
  summarise(mean_ndvi = mean(ndvi, na.rm = TRUE))`;

export default function MGEMCapstone({ theme, onToggle }) {
  return (
    <div
      className="capstone-page"
      style={{ backgroundColor: theme.body, color: theme.text }}
    >
      <Header theme={theme} onToggle={onToggle} />
      <main className="capstone-main">
        <section className="capstone-hero">
          <h1>MGEM Capstone Project</h1>
          <p>
            A standalone project showcase for methods, code, outputs, and
            decision-support insights from my MGEM capstone.
          </p>
        </section>

        <section
          className="capstone-panel"
          style={{ borderColor: theme.imageHighlight }}
        >
          <h2>Project snapshot</h2>
          <ul>
            <li>
              Focus: Environmental analytics + geospatial decision support
            </li>
            <li>Workflow: Data cleaning → modeling → map/report outputs</li>
            <li>Tools: R, ArcGIS Pro, QGIS, Python</li>
          </ul>
        </section>

        <section className="capstone-grid">
          <article
            className="capstone-panel"
            style={{ borderColor: theme.imageHighlight }}
          >
            <h3>Sample code snippet</h3>
            <pre>
              <code>{sampleCode}</code>
            </pre>
          </article>

          <article
            className="capstone-panel"
            style={{ borderColor: theme.imageHighlight }}
          >
            <h3>Sample outputs</h3>
            <div className="capstone-output-list">
              <figure>
                <img
                  src="/archive-posts/images/unnamed-chunk-13-1.png"
                  alt="Sample capstone output 1"
                  loading="lazy"
                />
                <figcaption>Recovery trajectory (sample visual)</figcaption>
              </figure>
              <figure>
                <img
                  src="/archive-posts/images/unnamed-chunk-5-1.png"
                  alt="Sample capstone output 2"
                  loading="lazy"
                />
                <figcaption>Decomposition trend (sample visual)</figcaption>
              </figure>
            </div>
          </article>
        </section>
      </main>
      <Footer theme={theme} />
      <TopButton theme={theme} />
    </div>
  );
}
