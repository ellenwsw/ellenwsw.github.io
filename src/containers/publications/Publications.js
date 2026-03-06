import React from "react";
import "./Publications.css";
import { Fade } from "react-reveal";
import PublicationCard from "../../components/publicationCard/PublicationCard";
import { publications } from "../../portfolio";

export default function Publications({ theme }) {
  return (
    <div className="main" id="publications">
      <div className="publications-header-div">
        <Fade bottom duration={2000} distance="20px">
          <h1 className="publications-header" style={{ color: theme.text }}>
            Publications
          </h1>
        </Fade>
      </div>
      <div className="publications-body-div">
        {publications.publications.map((publication) => (
          <PublicationCard
            key={`${publication.title}-${publication.year}`}
            publication={publication}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
