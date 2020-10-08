import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { authenticate } from './util/session_util';
import { logout } from './actions/session_actions';
import { fetchCountry } from './actions/country_actions';
import { fetchArticles } from "./actions/article_actions";
import { 
  fetchSavedArticles,
  saveArticle,
  unSaveArticle
} from "./actions/bookmark_actions"

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

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchCountry = fetchCountry;
  window.fetchArticles = fetchArticles;
  window.saveArticle = saveArticle;
  window.unSaveArticle = unSaveArticle;
  window.fetchSavedArticles = fetchSavedArticles;
  ReactDOM.render(<Root store={store} />, root);
});