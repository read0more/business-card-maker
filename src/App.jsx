import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useCallback, useEffect, useState } from "react";

const App = ({ firebase, cloudinary }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = firebase.loggedInUser;
    loggedInUser && setUser(loggedInUser);
  }, [firebase.loggedInUser]);

  const handleLogin = useCallback((loggedInUser) => {
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback(() => {
    firebase.signOut();
    setUser(null);
  }, [firebase]);

  return (
    <BrowserRouter>
      <Switch>
        {user ? (
          <>
            <Route path="/home" exact>
              <Home
                firebase={firebase}
                cloudinary={cloudinary}
                handleLogout={handleLogout}
              />
            </Route>
            <Redirect from="*" to="/home" />
          </>
        ) : (
          <>
            <Route path="/" exact>
              <Login firebase={firebase} handleLogin={handleLogin} />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
