import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./styles/index.css";
import App from "./App";

import Framework7 from "framework7/lite/bundle";
import Framework7React from "framework7-react";

Framework7.use(Framework7React);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
