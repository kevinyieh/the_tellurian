const axios = require('axios');
const cheerio = require("cheerio");

const getArticle = async url => {
  try {
    const { data } = await axios.get(
      url
    );
    const $ = cheerio.load(data);
    const paragraphs = [];

    $('div.content__article-body > p').each( (_i, p) => {
        const para = $(p).text();
        paragraphs.push(para);
    });
    return paragraphs;
  } catch (errpr) {
    throw error;
  }
}

getArticle()
  .then(console.log)