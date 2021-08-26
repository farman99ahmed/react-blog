import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UsersPage from "./components/UsersPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreateArticle from "./components/CreateArticle";
import AuthContext from './context/AuthContext';
import { useState } from "react";
import ArticlesPage from "./components/ArticlesPage";
import MyAccount from "./components/MyAccount";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: null, email: null, mobile: null, id: null, token: null, picture: null });
  const value = {currentUser, setCurrentUser}

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <NavigationBar />
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/createarticle" exact component={CreateArticle} />
          <PrivateRoute path="/users" exact component={UsersPage} />
          <PrivateRoute path="/articles" exact component={ArticlesPage} />
          <PrivateRoute path="/account" exact component={MyAccount} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
