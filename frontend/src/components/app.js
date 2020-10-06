import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import { Route } from "react-router-dom";
import MainPage from './main/main_page';
import "../stylesheets/index.css";

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={Splash} />
      <Route exact path="/main" component={MainPage} />
    </Switch>
  </div>
);

export default App;