import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";
import CardInput from "../../components/CardInput/CardInput";
import CardPreview from "../../components/CardPreview/CardPreview";

const Home = ({ handleLogout }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles["card-maker"]}>
          <h2 className={styles.title}>Card Maker</h2>
          <CardInput />
          <CardInput />
          <CardInput />
          <CardInput />
        </section>
        <section className={styles["card-preview"]}>
          <h2 className={styles.title}>Card Preview</h2>
          <CardPreview />
          <CardPreview />
          <CardPreview />
        </section>
      </main>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
      <Footer />
    </>
  );
};

export default Home;
