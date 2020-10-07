import * as APIUtil from "../util/session_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
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

export const login = user => dispatch => {
    return APIUtil.login(user)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.authenticate(token);
        let decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
      })
      .catch((err) => {
        debugger;
        dispatch(receiveErrors(err.response.data));
    });
}

export const signup = (user) => (dispatch) =>
  APIUtil.signup(user).then(
    (res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.authenticate(token);
      let decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    },
    (err) => dispatch(receiveErrors(err.response.data))
);

// export const signup = user => dispatch =>
//   APIUtil.signup(user)
//     .then(APIUtil.login(user))
//     .then((res) => {
//       const { token } = res.data;
//       localStorage.setItem("jwtToken", token);
//       APIUtil.authenticate(token);
//       let decoded = jwt_decode(token);
//       dispatch(receiveCurrentUser(decoded));
//     })
//     .catch((err) => {
//       dispatch(receiveErrors(err.response.data));
// });

// export const signup = (user) => (dispatch) =>
//   APIUtil.signup(user).then(
//     () => dispatch(receiveUserSignIn()),
//     (err) => dispatch(receiveErrors(err.response.data))
//   );

  
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