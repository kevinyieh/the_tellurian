import axios from 'axios';

export const saveArticle = (userId, article) => {
  return axios.post("/api/articles/save", article)
    .then((res) => {
      const obj = {
        userId,
        articleURL: res.data.articleURL
      }
      return axios.patch("/api/users/articles", obj)
    });
}

export const unSaveArticle = (userId, articleURL) => {
  const obj = {
    userId,
    articleURL
  }
  return axios.patch("/api/users/articles", obj);
}

// export const fetchSavedArticles = articleURLs => {
//   const obj = {
//     articleURLs
//   }
//   return axios.post("/api/articles/", obj);
// }

export const fetchSavedArticles = userId => {
  const obj = {
    userId
  }
  return axios.post("/api/users/articles", obj);
}

// export const fetchUsersArticles = async (userId) => {
//   const obj = {
//     userId
//   }
//   const result = await axios.post("/api/users/articles");
//   return result.savedArticles;
// }
