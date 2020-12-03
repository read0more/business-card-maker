import React, { memo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthService from "./service/AuthService";
import ImageUploader from "./service/ImageUploader";
import ImageFileInput from "./components/ImageFileInput/ImageFileInput";
import CardRepository from "./service/CardRepository";

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();

const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      FileInput={FileInput}
      cardRepository={cardRepository}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
