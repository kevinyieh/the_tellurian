import React from 'react';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
// import { Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import MainPage from './main/main_page';
import "../stylesheets/index.css";

const App = () => (
  <div className="app">
    <Switch>
      <ProtectedRoute path="/main" component={MainPage} />
      <AuthRoute exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;