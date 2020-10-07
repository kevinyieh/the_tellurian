import { connect } from "react-redux";
import NavBar from "./navbar";

const mSTP = state => {
    return {
      loggedIn: state.session.isLoggedIn,
    };
}

const mDTP = dispatch => {
    return {

    }
}

export default connect(mSTP,mDTP)(NavBar);