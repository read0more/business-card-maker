import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
