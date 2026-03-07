import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import "./Experience.css";
import { experience } from "../../portfolio.js";
import { Fade } from "react-reveal";
import ExperienceImg from "./ExperienceImg";

class Experience extends Component {
  render() {
    const theme = this.props.theme;
    const workSection = experience.sections.find(
      (section) => section.title === "Work"
    );
    const workExperiences = workSection?.experiences || [];

    return (
      <div className="experience-main">
        <Header theme={theme} onToggle={this.props.onToggle} />
        <div className="basic-experience">
          <Fade bottom duration={2000} distance="40px">
            <div className="experience-heading-div">
              <div className="experience-heading-img-div">
                <ExperienceImg theme={theme} />
              </div>
              <div className="experience-heading-text-div">
                <h1
                  className="experience-heading-text"
                  style={{ color: theme.text }}
                >
                  {experience.title}
                </h1>
                <p
                  className="experience-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {experience.description}
                </p>
              </div>
            </div>
          </Fade>

          {workExperiences.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.title}`}
              index={index}
              totalCards={workExperiences.length}
              experience={item}
              theme={theme}
            />
          ))}
        </div>
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Experience;
