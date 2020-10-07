import { RECEIVE_COUNTRY } from '../../actions/country_actions';

const CountriesReducer = (state = {}, action) => {
    Object.freeze(state);
   
    switch(action.type) {
        case RECEIVE_COUNTRY:
            return Object.assign({}, action.country)

        default: 
            return state;
    }
}

export default CountriesReducer;