import React from "react";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <img src="/images/logo.png" alt="logo" />
    <h1 className={styles.title}>Business Card Maker</h1>
  </header>
);

export default Header;
