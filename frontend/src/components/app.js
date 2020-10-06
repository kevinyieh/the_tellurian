import React from 'react';
import { ProtectedRoute } from '../util/route_util';
import { Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import MainPage from './main/main_page';
import "../stylesheets/index.css";

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={Splash} />
      <Route exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;