import { connect } from "react-redux";
import CountryData from "./country_data";

const mSTP = state => {
    return {
        country: state.entities.countries[state.ui.currentCountry]
    }
}

const mDTP = dispatch => {
    return {

    }
}

export default connect(mSTP,mDTP)(CountryData);