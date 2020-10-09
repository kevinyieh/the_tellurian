import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT
} from "../../actions/session_actions";
import {
  RECEIVE_SAVED_URLS
} from "../../actions/bookmark_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case(RECEIVE_CURRENT_USER): 
      const user = Object.assign({}, action.currentUser);
      delete user.exp;
      delete user.iat;
      return user;
    case(RECEIVE_LOGOUT):
      return ({});
    case(RECEIVE_SAVED_URLS):
      const thisUser = Object.assign({}, state);
      thisUser.savedArticles = action.articleURLs;
      return thisUser;
    default: 
      return state;
  }
}