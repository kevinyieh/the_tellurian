const axios = require("axios");
const {
  nytKey,
  catcherKey,
 } = require("../config/keys");

 //TODO: remove NYT articles from catcher results
 //parse url for nyt link?

function nytNormalize(resp) {
  return resp.response.docs.map((result) => {
    let date = new Date(result.pub_date);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let imageUrl =
      result.multimedia.length > 0
        ? `https://static01.nyt.com/${result.multimedia[0].url}`
        : "";
    return {
      headline: result.headline.main,
      body: result.lead_paragraph,
      date,
      articleURL: result.web_url,
      imageUrl,
    };
  });
}
const nytFetch = async (cca2, countryName) => {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:("${countryName}")&api-key=${nytKey}`;
  try {
    const { data } = await axios({
                                    method:"GET",
                                    header:{ 'Content-Type': 'application/x-www-form-urlencoded' },
                                    url})
    return nytNormalize(data);
  } catch (error) {
    console.log(error);
  }
};

function catcherNormalize(res) {
  return res.data.articles.map((result) => {
    let date = new Date(result.published_date);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return {
      headline: result.title,
      date,
      articleURL: result.link,
      body: result.summary,
      imageUrl: result.media,
    };
  });
}
const catcherFetch = async (cca2) => {
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
    },
  })
    .then((response) => {
      return catcherNormalize(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default async (cca2, countryName) => {
  let articles = [];
  await Promise.allSettled([
    nytFetch(cca2, countryName)
      .then((res) => {
        articles = articles.concat(res)
    }),
    catcherFetch(cca2)
      .then((res) => {
        articles = articles.concat(res)
    })
  ])
    .catch(console.log);
  return { [cca2]: articles }
}