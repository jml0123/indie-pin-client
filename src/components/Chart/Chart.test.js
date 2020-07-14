import React from "react";
import ReactDOM from "react-dom";
import Chart from "./Chart";

describe("Chart Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Chart />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
