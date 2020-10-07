import { RECEIVE_COUNTRY } from '../../actions/country_actions';

const currentCountryReducer = (state = null, action) => {
    Object.freeze(state);
<<<<<<< HEAD
    
=======
>>>>>>> e998bf82284bdcd79722f6a8083d9fcfa1ac3872
    switch(action.type) {
        case RECEIVE_COUNTRY:
            return action.country.cca2;

        default:
            return state;
    }
}

export default currentCountryReducer;