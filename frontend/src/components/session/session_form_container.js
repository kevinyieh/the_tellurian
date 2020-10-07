import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { 
  login,
  signup,
  logout,
  demo,
  CLEAR_SESSION_ERRORS
} from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch({type: CLEAR_SESSION_ERRORS})
    // demo: <button id="demo" onClick={() => dispatch(demo())}>Log In As Demo User</button>
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
