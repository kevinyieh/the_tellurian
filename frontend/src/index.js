import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { authenticate } from './util/session_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (localStorage.jwtToken) {
    authenticate(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    store = configureStore({ 
      session: { 
        isLoggedIn: true, 
        user: decodedUser 
      }
    });
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});