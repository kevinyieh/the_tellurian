import React from 'react';
import ReactDOM from 'react-dom';

// We will create this component shortly
import Root from './components/root';

// We set this up in the last section
import configureStore from './store/store';

// We will use this to parse the user's session token

// import jwt_decode from 'jwt-decode';
import { fetchCountry } from './actions/country_actions';
import { fetchArticles } from "./actions/article_actions";

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById("root");
  let store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchCountry = fetchCountry;
  window.fetchArticles = fetchArticles;
  ReactDOM.render(<Root store={store} />, root);
});