import React from "react";
import styles from "./CardPreview.module.css";

const CardPreview = () => {
  return (
    <address className={styles["card-preview"]}>
      <img src="/images/default_logo.png" alt="profile" />
      <div className={styles["card-data"]}>
        <h1>Name</h1>
        <h2>Company</h2>
        <hr />
        <h2>Position</h2>
        <h2>E-mail</h2>
        <p>Introduce</p>
      </div>
    </address>
  );
};

export default CardPreview;
