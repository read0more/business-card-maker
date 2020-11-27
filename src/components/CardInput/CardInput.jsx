import React from "react";
import styles from "./CardInput.module.css";

const CardInput = () => {
  return (
    <address className={styles["card-input"]}>
      <input type="text" className={styles.name} />
      <input type="text" className={styles.company} />
      <select className={styles.theme}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input type="text" className={styles.position} />
      <input type="email" className={styles.email} />
      <textarea className={styles.introduce} />
      <label className={styles["file-label"]}>
        파일 이름
        <input type="file" className={styles.file} accept="image/*" />
      </label>
      <button className={styles.delete}>Delete</button>
    </address>
  );
};

export default CardInput;
