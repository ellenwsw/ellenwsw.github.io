import React, { Component } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import { settings } from "../portfolio.js";
import Error404 from "../pages/errors/error404/Error";
import ResumePage from "../pages/resume/Resume.js";
import Archive from "../pages/archive/Archive";
import ArchivePost from "../pages/archive/ArchivePost";
import MGEMCapstone from "../pages/mgemCapstone/MGEMCapstone";

export default class Main extends Component {
  componentDidMount() {
    document.documentElement.style.setProperty(
      "--scrollbar-color",
      this.props.theme.imageHighlight
    );
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.theme &&
      this.props.theme &&
      prevProps.theme.imageHighlight !== this.props.theme.imageHighlight
    ) {
      document.documentElement.style.setProperty(
        "--scrollbar-color",
        this.props.theme.imageHighlight
      );
    }
  }
  render() {
    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route
            path="/"
            exact
            render={(props) =>
              settings.isSplash ? (
                <Splash
                  {...props}
                  theme={this.props.theme}
                  onToggle={this.props.onToggle}
                />
              ) : (
                <Home
                  {...props}
                  theme={this.props.theme}
                  onToggle={this.props.onToggle}
                />
              )
            }
          />
          <Route
            path="/home"
            render={(props) => (
              <Home
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          <Route
            path="/work-experience"
            exact
            render={(props) => (
              <Experience
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          <Route
            path="/experience"
            exact
            render={() => <Redirect to="/work-experience" />}
          />
          <Route
            path="/education"
            render={(props) => (
              <Education
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          {settings.isSplash && (
            <Route
              path="/splash"
              render={(props) => (
                <Splash
                  {...props}
                  theme={this.props.theme}
                  onToggle={this.props.onToggle}
                />
              )}
            />
          )}

          <Route
            path="/resume"
            render={(props) => (
              <ResumePage
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          <Route
            path="/academic-archive"
            exact
            render={(props) => (
              <Archive
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          <Route
            path="/mgem-capstone"
            render={(props) => (
              <MGEMCapstone
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          <Route
            path="/academic-archive/:slug"
            render={(props) => (
              <ArchivePost
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
          <Route
            path="*"
            render={(props) => (
              <Error404
                {...props}
                theme={this.props.theme}
                onToggle={this.props.onToggle}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
