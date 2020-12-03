import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";

const Login = ({ authService }) => {
  const history = useHistory();
  const goToHome = (userId) => {
    history.push({
      pathname: "/home",
      state: { id: userId },
    });
  };

  const onLogin = (event) => {
    authService
      .login(event.currentTarget.textContent)
      .then((data) => goToHome(data.user.uid));
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      user && goToHome(user.uid);
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1 className={styles.title}>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
