import {connect} from 'react-redux';
import {fetchSavedArticles, unSaveArticle } from "../../actions/bookmark_actions";
import Feed from './feed';

const mSTP = state => ({
  savedArticles: state.entities.savedArticles,
  currentUser: state.session.user
})

const mDTP = dispatch => ({
  fetchSavedArticles: userId => fetchSavedArticles(userId)(dispatch),
  unSaveArticle: (userId, articleURL) => dispatch(unSaveArticle(userId, articleURL))
})

export default connect(mSTP, mDTP)(Feed);