import React from "react";
import ReactDOM from "react-dom";
import ChartRow from "./ChartRow";

describe("ChartRow Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ChartRow />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
