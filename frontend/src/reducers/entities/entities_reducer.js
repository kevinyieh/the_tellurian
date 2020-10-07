import { combineReducers } from 'redux';
import users from './users_reducer';
import countries from './countries_reducer';
import articles from "./articles_reducer"

export default combineReducers({
  users,
  countries,
  articles
});