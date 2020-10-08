import { combineReducers } from 'redux';
import countries from './countries_reducer';
import articles from "./articles_reducer"
import savedArticles from './saved_articles_reducer';

export default combineReducers({
  countries,
  articles,
  savedArticles
});