import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import styles from "./App.module.css";

const App = ({ FileInput, authService, cardRepository }) => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login FileInput={FileInput} authService={authService} />
          </Route>
          <Route path="/home" exact>
            <Home
              FileInput={FileInput}
              authService={authService}
              cardRepository={cardRepository}
            />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
