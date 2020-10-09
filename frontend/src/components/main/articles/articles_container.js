import { connect } from "react-redux";
import Articles from "./articles";
import { fetchSavedArticles, saveArticle } from "../../../actions/bookmark_actions";

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
      fetchSavedArticles: (articleIds) => dispatch(fetchSavedArticles(articleIds)),
    };
}

export default connect(mSTP,mDTP)(Articles);