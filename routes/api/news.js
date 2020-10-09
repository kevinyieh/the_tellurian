const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  nytKey,
  catcherKey,
  newsapiKey
 } = require("../../frontend/src/config/keys");
const { response } = require("express");

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
    const fullName = result.byline.person.length > 0 ? `${result.byline.person[0].firstname} ${result.byline.person[0].lastname}` : "";
    return {
      headline: result.headline.main,
      body: result.lead_paragraph,
      date,
      articleURL: result.web_url,
      imageUrl,
      source: "New York Times",
      author: fullName
    };
  });
}
const nytFetch = async (countryName) => {
  let now = new Date();
  let month = now.getMonth() === 0 ? 12 : now.getMonth();
  month = month < 10 ? `0${month}` : month;
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const begin_date = `${now.getFullYear()}${month}${day}`;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:("${countryName}")&begin_date=${begin_date}&api-key=${nytKey}`;
  try {
    const { data } = await axios({
                                    method:"GET",
                                    url,
                                    headers: { 
                                        "Access-Control-Allow-Headers": "*",
                                        'X-Requested-With': 'XMLHttpRequest' }
                                  })
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
      source: result.clean_url,
      author: result.author
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
      media: "True"
    }
  })
    .then((response) => {
      return catcherNormalize(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

function newsapiNormalize(res) {
  return res.data.articles.map((result) => {
    let date = new Date(result.publishedAt);
    date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return {
      headline: result.title,
      date,
      articleURL: result.url,
      body: result.content,
      imageUrl: result.urlToImage,
      source: result.source.name,
      author: result.author
    };
  });
}
const newsapiFetch = async (cca2) => {
  const code = cca2.toLowerCase();
  return axios({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${newsapiKey}`
  })
    .then((res) => {
      return newsapiNormalize(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchAll = async (req,res) => {
    const {cca2, countryName} = req.body;
    let articles = [];
    await Promise.allSettled([
      nytFetch(countryName)
        .then((resp) => {
          articles = resp ? articles.concat(resp) : articles;
      }),
      newsapiFetch(cca2)
        .then((resp) => {
          articles = resp ? articles.concat(resp) : articles;
        })
      // catcherFetch(cca2)
      //   .then((resp) => {
      //     articles = resp ? articles.concat(resp) : articles;
      // })
    ]).catch(console.log);
    res.json({ [cca2]: articles });
}

router.post("/",fetchAll);

module.exports = router;