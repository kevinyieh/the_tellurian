import {
  FETCH_SAVED_ARTICLES
} from '../../actions/bookmark_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  debugger;
  switch(action.type) {
    case FETCH_SAVED_ARTICLES:
      const articles = {};
      action.articles.forEach(article => {
        articles[article._id] = article;
      })
      return articles;
    default:
      return state;
  }
}