import { connect } from "react-redux";
import Articles from "./articles";

const mSTP = (state,ownProps) => {
    return {
        articles: state.entities.articles[state.ui.currentCountry],
        country: state.entities.countries[state.ui.currentCountry],
        hidden: ownProps.hidden
    }
}

// const mDTP = dispatch => {
//     return {

//     }
// }

export default connect(mSTP,null)(Articles);