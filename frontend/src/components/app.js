import React from 'react';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import MainPageContainer from './main/main_page_container';
import Team from './team/team.js'
import "../stylesheets/index.css";

const App = () => (
  <div className="app">
    <Switch>
      <ProtectedRoute path="/main" component={MainPageContainer} />
      <AuthRoute exact path="/" component={Splash} />
      <Route exact path="/team" component={Team} />
    </Switch>
  </div>
);

export default App;