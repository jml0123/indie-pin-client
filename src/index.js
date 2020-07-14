import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Press Start 2P", "Source Code Pro"],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
