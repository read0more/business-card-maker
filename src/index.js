import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase from "./service/Firebase";

const firebase = new Firebase();

ReactDOM.render(
  <React.StrictMode>
    <App firebase={firebase} />
  </React.StrictMode>,
  document.getElementById("root")
);
