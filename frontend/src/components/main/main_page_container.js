import {connect} from 'react-redux';
import { fetchCountry } from "../../actions/country_actions";
import MainPage from './main_page';

const mSTP = (state) => ({});

const mDTP = dispatch => {
    return {
      fetchCountry: (country) => dispatch(fetchCountry(country)),
    };
};


export default connect(mSTP, mDTP)(MainPage);