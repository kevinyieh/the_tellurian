// CAN PROBABLY JUST DELETE THIS FILE
const axios = require('axios');
const guardianKey = require("../../../config/keys")
// import webscrape from "./webscrape";
function guardianNormalize(resp) {
    resp.response.results.map( result => {
        let date = new Date(result.webPublicationDate);
        let date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        return {
            headline: result.webTitle,
            date,
            articleURL: result.webUrl,
        }
    })
}
export const guardianFetch = async (cca2,countryName) => {
    const now = new Date.now();
    const date = `${now.getFullYear()-1}-${now.getMonth()+1}-${1}`;
    const url = `https://content.guardianapis.com/search?q=${countryName}&from-date=${date}&api-key=${guardianKey}`;
    const resp = axios.get(url);
    const allArticles = [];
    return {
        [cca2]: allArticles
    }
}


