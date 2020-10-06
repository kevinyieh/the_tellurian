import * as APIUtil from "../util/session_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const logoutUser = () => ({
  type: RECEIVE_LOGOUT,
});

export const login = user => dispatch =>
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.authenticate(token);
      let decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
});


//this don't work right
export const signup = (user) => (dispatch) =>
  APIUtil.signup(user).then(login(user));


  
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  APIUtil.authenticate(false);
  dispatch(logoutUser());
};

const demoUser = {
  email: "demo@demo.demo",
  password: "demodemodemo"
};

export const demo = () => login(demoUser);