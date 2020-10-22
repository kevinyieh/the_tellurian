import {connect} from 'react-redux';
import { fetchCountry } from "../../actions/country_actions";
import {
  fetchArticles,
} from "../../actions/article_actions";
import {  fetchSavedArticles,
} from '../../actions/bookmark_actions';

import MainPage from './main_page';

const mSTP = (state) => ({
  country: state.entities.countries[state.ui.currentCountry],
  articles: state.entities.articles
});

const mDTP = dispatch => {
    return {
      fetchCountry: (country) => dispatch(fetchCountry(country)),
      fetchArticles: (cca2, countryName) =>
        dispatch(fetchArticles(cca2, countryName)),
      fetchSavedArticles: (userId) =>
        fetchSavedArticles(userId)(dispatch),
    };
};


export default connect(mSTP, mDTP)(MainPage);