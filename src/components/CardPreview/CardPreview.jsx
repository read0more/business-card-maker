import React from "react";
import styles from "./CardPreview.module.css";

const CardPreview = ({ card }) => {
  const { name, company, theme, position, email, introduce, filepath } = card;
  const cardPreviewStyles = `${styles["card-preview"]} ${
    styles[`card-preview--${theme}`]
  }`;

  return (
    <address className={cardPreviewStyles}>
      <img src={filepath || "/images/default_logo.png"} alt="profile" />
      <div className={styles["card-data"]}>
        <h1>{name}</h1>
        <h2>{company}</h2>
        <hr />
        <h2>{position}</h2>
        <h2>{email}</h2>
        <p>{introduce}</p>
      </div>
    </address>
  );
};

export default CardPreview;
