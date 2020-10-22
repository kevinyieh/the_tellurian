import { 
  RECEIVE_BOOKMARK_ERRORS, 
  FETCH_SAVED_ARTICLES
} from '../../actions/bookmark_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_BOOKMARK_ERRORS:
      return action.errors;
    case FETCH_SAVED_ARTICLES:
      return [];
    default:
      return state;
  }
}