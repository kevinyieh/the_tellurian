const axios = require("axios");

//New York Times
const nytKey = require("../../../config/keys").nytKey;
function nytNormalize(resp) {
  return resp.response.docs.map((result) => {
    let date = new Date(result.pub_date);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let imageUrl =
      result.multimedia.length > 0
        ? `https://static01.nyt.com/${result.multimedia[0].url}`
        : "";
    return {
      headline: result.headline,
      date,
      articleURL: result.web_url,
      body: result.lead_paragraph,
      imageUrl,
    };
  });
}
export const nytFetch = async (cca2, countryName) => {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:("${countryName}")&api-key=${nytKey}`;
  const { data } = await axios.get(url);
  const allArticles = nytNormalize(data);
  return {
    [cca2]: allArticles,
  };
};
// nytFetch("US", "United States").then(console.log);


//NewsCatcher by RapidAPI
const catcherKey = require("../../../config/keys").catcherKey;
function catcherNormalize(res) {
  return res.data.articles.map((result) => {
    let date = new Date(result.published_date);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return {
      headline: result.title,
      date,
      articleURL: result.link,
      body: result.summary,
      imageUrl: result.media
    };
  });
}
export const catcherFetch = async (cca2) => {
  return axios({
    method: "GET",
    url: "https://newscatcher.p.rapidapi.com/v1/latest_headlines",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "newscatcher.p.rapidapi.com",
      "x-rapidapi-key": catcherKey,
      useQueryString: true,
    },
    params: {
      lang: "en",
      country: cca2,
      media: "True",
    }
  })
  .then((response) => {
    return {
      [cca2]: catcherNormalize(response),
    }
  })
  .catch((err) => {
    console.log(err)
  });
}
// catcherFetch("US").then((articles) => console.log(articles));