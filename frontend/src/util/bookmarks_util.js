import axios from 'axios';

export const saveArticle = (userId, article) => {
  axios.post("/api/articles", article)
    .then(articleId => {
      return await axios.patch("/api/users", userId, articleId);
    })
    .catch(console.log)
}

export const unSaveArticle = (userId, articleId) => {
  return axios.patch("/api/users", userId, articleId);
}

export const fetchSavedArticles = articleIds => {
  return axios.get("/api/articles", articleIds.join())
}