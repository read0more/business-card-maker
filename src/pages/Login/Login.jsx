import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <>
      <div className={styles.background}></div>
      <section className={styles.container}>
        <Header />
        <div className={styles["login-box"]}>
          <h1 className={styles.title}>Login</h1>
          <button className={styles.button}>Google</button>
          <button className={styles.button}>Github</button>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;
