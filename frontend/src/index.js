import React from 'react';
import ReactDOM from 'react-dom';

// We will create this component shortly
import Root from './components/root';

// We set this up in the last section
import configureStore from './store/store';

// We will use this to parse the user's session token
// import jwt_decode from 'jwt-decode';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById("root");
  let store = configureStore();
  ReactDOM.render(<Root store={store} />, root);
});