import { connect } from "react-redux";
import Articles from "./articles";

const mSTP = state => {
    return {
        articles: state.entities.articles[state.ui.currentCountry],
        country: state.entities.countries[state.ui.currentCountry]
    }
}

// const mDTP = dispatch => {
//     return {

//     }
// }

export default connect(mSTP,null)(Articles);