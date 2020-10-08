import * as Bookmark from "../util/bookmarks_util";

export const FETCH_SAVED_ARTICLES = "FETCH_SAVED_ARTICLES";
export const RECEIVE_BOOKMARK_ERRORS = "RECEIVE_BOOKMARK_ERRORS";
export const RECEIVE_SAVED_ARTICLE_IDS = "RECEIVE_SAVED_ARTICLE_IDS"

export const receiveSavedArticleIDs = articleIds => {
    return {
        type: RECEIVE_SAVED_ARTICLE_IDS,
        articleIds
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

export const fetchSavedArticles = articleIds => dispatch => {
  Bookmark.fetchSavedArticles(articleIds)
    .then(articles => {
      return dispatch(receiveArticles(articles.data))
    })
    .catch(err => {
      return dispatch(receiveBookMarkErrors(err))
    })
}

export const saveArticle = (userId, article) => dispatch => {
    Bookmark.saveArticle(userId, article)
      .then((response) => {
        return dispatch(receiveSavedArticleIDs(response.data.savedArticleIds));
      })
      .catch((err) => {
        return dispatch(receiveBookMarkErrors(err));
      });
}

export const unSaveArticle = (userId, articleId) => dispatch => {
  Bookmark.unSaveArticle(userId, articleId)
    .then((response) => {
      return dispatch(receiveSavedArticleIDs(response.data.savedArticleIds));
    })
    .catch((err) => {
      return dispatch(receiveBookMarkErrors(err));
    });
}