const axios = require("axios");

export default (cca2,countryName) => {
  return axios.post("/api/news/",{cca2,countryName})
}