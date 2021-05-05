import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Check2FA from "./Check2FA";
import Welcome from "./Welcome";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact={true} path="/" render={() => <App />} />
      <Route exact={true} path="/2fa" render={() => <Check2FA />} />
      <Route exact={true} path="/welcome" render={() => <Welcome />} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
