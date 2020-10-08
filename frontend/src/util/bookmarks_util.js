import axios from 'axios';

export const saveArticle = (userId, article) => {
  return axios.post("/api/articles/save", article)
    .then((res) => {
      const obj = {
        userId,
        articleId: res.data.articleId
      }
      return axios.patch("/api/users/articles", obj)
    });
}

export const unSaveArticle = (userId, articleId) => {
  const obj = {
    userId,
    articleId
  }
  return axios.patch("/api/users/articles", obj);
}

export const fetchSavedArticles = articleIds => {
  const obj = {
    articleIds
  }
  return axios.post("/api/articles/", obj);
}