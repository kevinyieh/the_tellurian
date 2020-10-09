import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT
} from "../../actions/session_actions";
import { RECEIVE_SAVED_URLS } from "../../actions/bookmark_actions";

const initialState = {
  isLoggedIn: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const user = Object.assign({}, action.currentUser);
      return {
        isLoggedIn: !!action.currentUser,
        user,
      };
    case RECEIVE_LOGOUT:
      return initialState;
    case RECEIVE_SAVED_URLS:
      const thisUser = Object.assign({}, state.user);
      thisUser.savedArticles = action.articleURLs;
      return {
        isLoggedIn: true,
        user: thisUser
      };
    default:
      return state;
  }
}