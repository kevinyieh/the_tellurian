import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';
import { Route } from "react-router-dom";
import MainPage from './main/main_page';

const App = () => (
  <div>
    <Switch>
        <Route exact path="/main" component={MainPage} />
    </Switch>
  </div>
);

export default App;