import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import firebase from "firebase/app";
import { useCallback, useEffect, useState } from "react";
import { decode as jwtDecode } from "jsonwebtoken";
import {
  setLocalStorageJWT,
  getLoggedInUser,
  removeLoggedInUser,
} from "./utils";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getLoggedInUser();
    user && setUser(user);
  }, []);

  const handleLogin = useCallback((provider) => {
    (async () => {
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const idToken = await result.user.getIdToken();
        setUser(jwtDecode(idToken));
        setLocalStorageJWT(idToken);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleLogout = useCallback(() => {
    (async () => {
      try {
        await firebase.auth().signOut();
        setUser(null);
        removeLoggedInUser();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {user ? (
          <>
            <Route path="/home" exact>
              <Home handleLogout={handleLogout} />
            </Route>
            <Redirect from="*" to="/home" />
          </>
        ) : (
          <>
            <Route path="/" exact>
              <Login handleLogin={handleLogin} />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
