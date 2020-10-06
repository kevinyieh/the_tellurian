import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT
} from "../../actions/session_actions";

const initialState = {
  authenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        authenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_LOGOUT:
      return {
        authenticated: false,
        user: undefined,
      };
    default:
      return state;
  }
}