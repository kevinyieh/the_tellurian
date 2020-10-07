// HAVE ONE FILE WITH ALL NEWS API FETCHES
import * as NewsFetchAPI from "../util/news_fetch_nyt";

export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";

const receiveArticles = articles => {
    return {
        type: RECEIVE_ARTICLES,
        articles
    }
}

export const fetchArticles = (cca2, countryName) => dispatch => {
    return NewsFetchAPI.nytFetch(cca2,countryName)
        .then((articles) => dispatch(receiveArticles(articles)))
}