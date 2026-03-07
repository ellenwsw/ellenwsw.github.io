import React from "react";
import ReactDOM from "react-dom";

jest.mock("./components/degreeCard/DegreeCard", () => () => null);

import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
