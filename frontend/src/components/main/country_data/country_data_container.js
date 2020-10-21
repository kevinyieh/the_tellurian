import { connect } from "react-redux";
import CountryData from "./country_data";

const mSTP = state => {
    return {
        country: state.entities.countries[state.ui.currentCountry]
    }
}

export default connect(mSTP)(CountryData);