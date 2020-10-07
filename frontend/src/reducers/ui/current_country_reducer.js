import { RECEIVE_COUNTRY } from '../../actions/country_actions';

const currentCountryReducer = (state = null, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_COUNTRY:
            return action.country.cca2;

        default:
            return state;
    }
}

export default currentCountryReducer;