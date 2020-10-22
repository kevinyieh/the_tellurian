import * as Bookmark from "../util/bookmarks_util";

export const FETCH_SAVED_ARTICLES = "FETCH_SAVED_ARTICLES";
export const RECEIVE_BOOKMARK_ERRORS = "RECEIVE_BOOKMARK_ERRORS";
export const RECEIVE_SAVED_URLS = "RECEIVE_SAVED_URLS"

export const receiveSavedURLs = articleURLs => {
    return {
        type: RECEIVE_SAVED_URLS,
        articleURLs
    }
}

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

export const fetchSavedArticles = articleURLs => dispatch => {
  debugger;
  return Bookmark.fetchSavedArticles(articleURLs)
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
      .then((response) => {
        return dispatch(receiveSavedURLs(response.data.savedURLs));
      })
      .catch((err) => {
        return dispatch(receiveBookMarkErrors(err));
      });
}

export const unSaveArticle = (userId, articleURL) => dispatch => {
    return Bookmark.unSaveArticle(userId, articleURL)
    .then((response) => {
      return dispatch(receiveSavedURLs(response.data.savedURLs));
    })
    .catch((err) => {
      return dispatch(receiveBookMarkErrors(err));
    });
}