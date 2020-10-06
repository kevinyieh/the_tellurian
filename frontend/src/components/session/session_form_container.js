import React from 'react';
import { connect } from "react-redux";
import { 
  login,
  signup,
  demo
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
    demo: <button id="demo" onClick={() => dispatch(demo())}>Log In As Demo User</button>
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
