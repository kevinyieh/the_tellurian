import {
  FETCH_SAVED_ARTICLES,
  REMOVE_UNSAVED_ARTICLE
} from '../../actions/bookmark_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case FETCH_SAVED_ARTICLES:
      const articles = {};
      action.articles.forEach(article => {
        articles[article.articleURL] = article;
      })
      return articles;
    case REMOVE_UNSAVED_ARTICLE:
      const savedArticles = Object.assign({}, state);
      delete savedArticles[action.articleURL];
      return savedArticles;
    default:
      return state;
  }
}