import { 
  RECEIVE_BOOKMARK_ERRORS, 
  RECEIVE_SAVED_URLS,
  FETCH_SAVED_ARTICLES
} from '../../actions/bookmark_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_BOOKMARK_ERRORS:
      return action.errors;
    case RECEIVE_SAVED_URLS:
      return [];
    case FETCH_SAVED_ARTICLES:
      return [];
    default:
      return state;
  }
}