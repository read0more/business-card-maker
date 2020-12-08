import React, { memo } from "react";
import styles from "./Loader.module.css";

const Loader = memo(() => (
  <div className={styles["loading-container"]}>
    <div className={styles.loader}></div>
  </div>
));

export default Loader;
