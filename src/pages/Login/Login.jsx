import React, { useCallback } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";

const Login = ({ firebase, handleLogin }) => {
  const loginGoogle = useCallback(() => {
    firebase.loginGoogle().then(() => {
      handleLogin(firebase.loggedInUser);
    });
  }, [handleLogin, firebase]);

  const loginGithub = useCallback(() => {
    firebase.loginGithub().then(() => {
      handleLogin(firebase.loggedInUser);
    });
  }, [handleLogin, firebase]);

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
