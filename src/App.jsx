import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import styles from "./App.module.css";
import Loader from "./components/Loader/Loader";

const App = ({ FileInput, authService, cardRepository }) => {
  const [routes, setRoutes] = useState();

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setRoutes(
          <>
            <Route path="/home" exact>
              <Home
                FileInput={FileInput}
                authService={authService}
                cardRepository={cardRepository}
              />
            </Route>
            <Redirect from="*" to="/home" />
          </>
        );
      } else {
        setRoutes(
          <>
            <Route path="/" exact>
              <Login FileInput={FileInput} authService={authService} />
            </Route>
            <Redirect from="*" to="/" />
          </>
        );
      }
    });
  }, [FileInput, authService, cardRepository]);

  return (
    <div className={styles.app}>
      {routes ? (
        <BrowserRouter>
          <Switch>{routes}</Switch>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
