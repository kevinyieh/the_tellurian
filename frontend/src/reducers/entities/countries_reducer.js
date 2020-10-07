import { RECEIVE_COUNTRY, RECEIVE_COUNTRIES } from '../../actions/country_actions';

const CountriesReducer = (state = {}, action) => {
    Object.freeze(state);
   
    switch(action.type) {
        case RECEIVE_COUNTRY:
            return Object.assign({}, state, {
              [action.country.cca2]: action.country,
            });
        case RECEIVE_COUNTRY:
            return Object.assign({}, state, { [action.country.cca2]: action.country })
            
        default: 
            return state;
    }
}

export default CountriesReducer;