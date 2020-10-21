import { connect } from "react-redux";
import NavBar from "./navbar";

const mSTP = state => {
  const currentCountry = state.entities.countries[state.ui.currentCountry]
  return {
    loggedIn: state.session.isLoggedIn,
    currentCountry: currentCountry ? currentCountry.name : ""
  };
}

export default connect(mSTP)(NavBar);