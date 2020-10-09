import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { 
  login,
  signup,
  CLEAR_SESSION_ERRORS
} from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch({type: CLEAR_SESSION_ERRORS})
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
