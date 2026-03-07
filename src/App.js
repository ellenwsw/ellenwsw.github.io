import React, { Component } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { blueTheme, materialDarkTheme } from "./theme";
import { GlobalStyles } from "./global";

const THEME_STORAGE_KEY = "portfolio-theme";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
    };
  }

  componentDidMount() {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark") {
      this.setState({ isDarkMode: true });
    }
  }

  toggleTheme = () => {
    this.setState(
      (prevState) => ({
        isDarkMode: !prevState.isDarkMode,
      }),
      () => {
        window.localStorage.setItem(
          THEME_STORAGE_KEY,
          this.state.isDarkMode ? "dark" : "light"
        );
      }
    );
  };

  render() {
    const theme = this.state.isDarkMode ? materialDarkTheme : blueTheme;

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <div>
            <Main theme={theme} onToggle={this.toggleTheme} />
          </div>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
