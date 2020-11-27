import React, { useCallback } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";
import firebase from "firebase/app";
import "firebase/auth";

const Login = ({ handleLogin }) => {
  const loginGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    handleLogin(provider);
  }, [handleLogin]);

  const loginGithub = useCallback(() => {
    const provider = new firebase.auth.GithubAuthProvider();
    handleLogin(provider);
  }, [handleLogin]);

  return (
    <>
      <div className={styles.background}></div>
      <section className={styles.container}>
        <Header />
        <div className={styles["login-box"]}>
          <h1 className={styles.title}>Login</h1>
          <button className={styles.button} onClick={loginGoogle}>
            Google
          </button>
          <button className={styles.button} onClick={loginGithub}>
            Github
          </button>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;
