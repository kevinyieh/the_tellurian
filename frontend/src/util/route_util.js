import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

// Auth component: if user already logged in & visits a login or signup page, redirect them to map page.
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/main" />
      )
    }
  />
);

//Protected: users can only access if they are logged in
const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  loggedIn: state.session.isLoggedIn,
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
