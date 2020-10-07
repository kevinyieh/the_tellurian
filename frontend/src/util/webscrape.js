const axios = require('axios');
const cheerio = require("cheerio");

const getArticle = async url => {
    try {
        const { data } = await axios.get(
            // "https://www.theguardian.com/world/2020/sep/03/samoas-ruling-party-faces-new-threat-after-nearly-40-years-in-power"
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
    .then( x => console.log(x))