const axios = require('axios');
const nytKey = require("../config/keys").nytKey;

function nytNormalize(resp) {
    return resp.response.docs.map( result => {
        let date = new Date(result.pub_date);
        date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        let imageUrl = result.multimedia.length > 0 ? `https://static01.nyt.com/${result.multimedia[0].url}` : "";
        return {
            headline: result.headline.main,
            body: result.lead_paragraph,
            date,
            articleURL: result.web_url,
            imageUrl,
        }
    })
}

export const nytFetch = async (cca2,countryName) => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:("${countryName}")&api-key=${nytKey}`;
    try{
        const { data } = await axios.get(url);
        const allArticles = nytNormalize(data);
        return {
            [cca2]: allArticles
        }
    }catch (error){
        console.log(error);
    }
        
}