import { connect } from "react-redux";
import Articles from "./articles";
import { saveArticle } from '../../../actions/bookmark_actions';

const mSTP = (state,ownProps) => {
    return {
        userId: state.entities.users.id,
        articles: state.entities.articles[state.ui.currentCountry],
        country: state.entities.countries[state.ui.currentCountry],
        hidden: ownProps.hidden
    }
}

const mDTP = dispatch => {
    return {
      saveArticle: (userId, article) => dispatch(saveArticle(userId, article))
    };
}

export default connect(mSTP,mDTP)(Articles);