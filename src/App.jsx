import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
    </Switch>
    <Footer />
  </Router>
);

export default App;
