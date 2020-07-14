import React from "react";
import ReactDOM from "react-dom";
import NewArtistForm from "./NewArtistForm";

describe("NewArtistForm Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewArtistForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
