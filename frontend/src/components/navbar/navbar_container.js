import { connect } from "react-redux";
import NavBar from "./navbar";

const mSTP = state => {
    return {
      loggedIn: state.session.isLoggedIn
    };
}

export default connect(mSTP)(NavBar);