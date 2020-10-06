import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Splash from './splash/splash';
import { Route } from "react-router-dom";
import MainPage from './main/main_page';
import Session from './session/session_form_container';

const App = () => {
  return (
  <div>
    <Switch>
      <Route path="/" component={Session} />
      {/* <Route exact path="/" component={Splash} /> */}
      {/* <Route exact path="/" component={MainPage} /> */}
    </Switch>
  </div>
  )
};

export default App;