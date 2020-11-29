import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase from "./service/Firebase";
import Cloudinary from "./service/Cloudinary";

const firebase = new Firebase();
const cloudinary = new Cloudinary();

ReactDOM.render(
  <React.StrictMode>
    <App firebase={firebase} cloudinary={cloudinary} />
  </React.StrictMode>,
  document.getElementById("root")
);
