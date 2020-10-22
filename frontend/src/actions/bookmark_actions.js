import * as Bookmark from "../util/bookmarks_util";

export const FETCH_SAVED_ARTICLES = "FETCH_SAVED_ARTICLES";
export const RECEIVE_BOOKMARK_ERRORS = "RECEIVE_BOOKMARK_ERRORS";
export const REMOVE_UNSAVED_ARTICLE = "REMOVE_UNSAVED_ARTICLE";

export const receiveBookMarkErrors = errors => {
  return {
    type: RECEIVE_BOOKMARK_ERRORS,
    errors
  }
}

export const receiveArticles = articles => {
  return {
    type: FETCH_SAVED_ARTICLES,
    articles
  }
}

export const fetchSavedArticles = userId => dispatch => {
  return Bookmark.fetchSavedArticles(userId)
    .then(articles => {
      return dispatch(receiveArticles(articles.data))
    })
    .catch(err => {
      debugger;
      return dispatch(receiveBookMarkErrors(err))
    })
}

export const saveArticle = (userId, article) => dispatch => {
    return Bookmark.saveArticle(userId, article)
      .catch((err) => {
        return dispatch(receiveBookMarkErrors(err));
      });
}

export const unSaveArticle = (userId, articleURL) => dispatch => {
    return Bookmark.unSaveArticle(userId, articleURL)
    .then(response => {
      return dispatch(removeUnsavedArticle(response.data.articleURL));
    })
    .catch((err) => {
      return dispatch(receiveBookMarkErrors(err));
    });
}