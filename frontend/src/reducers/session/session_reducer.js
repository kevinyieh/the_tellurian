import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT
} from "../../actions/session_actions";

const initialState = {
  isLoggedIn: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const user = Object.assign({}, action.currentUser);
      console.log(user);
      delete user.email;
      console.log(state);
      console.log(user);
      return {
        isLoggedIn: !!action.currentUser,
        user
      };
    case RECEIVE_LOGOUT:
      return {
        isLoggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
}