import { connect } from "react-redux";
import Articles from "./articles";
import { fetchSavedArticles, saveArticle, unSaveArticle } from "../../../actions/bookmark_actions";

const mSTP = (state,ownProps) => {
    return {
      currentUser: state.session.user,
      articles: state.entities.articles[state.ui.currentCountry],
      savedArticles: state.entities.savedArticles,
      country: state.entities.countries[state.ui.currentCountry],
      hidden: ownProps.hidden,
    };
}

const mDTP = dispatch => {
    return {
      saveArticle: (userId, article) => dispatch(saveArticle(userId, article)),
      fetchSavedArticles: (userId) =>
        dispatch(fetchSavedArticles(userId)),
        unSaveArticle: (userId, articleURL) => dispatch(unSaveArticle(userId, articleURL)),
    };
}

export default connect(mSTP,mDTP)(Articles);