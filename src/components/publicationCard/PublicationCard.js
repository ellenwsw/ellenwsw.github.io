import React from "react";
import "./PublicationCard.css";
import { Fade } from "react-reveal";

export default function PublicationCard({ publication, theme }) {
  return (
    <Fade bottom duration={1500} distance="20px">
      <div className="publication-card" style={{ backgroundColor: theme.body }}>
        <div
          className="publication-card-header"
          style={{ backgroundColor: theme.headerColor }}
        >
          <h2 className="publication-title" style={{ color: theme.text }}>
            {publication.title}
          </h2>
          {publication.year && (
            <span
              className="publication-year"
              style={{ color: theme.secondaryText }}
            >
              {publication.year}
            </span>
          )}
        </div>

        <div className="publication-card-content">
          {publication.authors && (
            <p
              className="publication-meta"
              style={{ color: theme.secondaryText }}
            >
              <strong>Authors:</strong> {publication.authors}
            </p>
          )}
          {publication.venue && (
            <p
              className="publication-meta"
              style={{ color: theme.secondaryText }}
            >
              <strong>Venue:</strong> {publication.venue}
            </p>
          )}
          {publication.description && (
            <p
              className="publication-description"
              style={{ color: theme.text }}
            >
              {publication.description}
            </p>
          )}
          {publication.link && (
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="publication-link"
              style={{ color: theme.accentColor }}
            >
              Read publication ↗
            </a>
          )}
        </div>
      </div>
    </Fade>
  );
}
