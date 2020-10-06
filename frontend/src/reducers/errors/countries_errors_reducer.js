import { RECEIVE_COUNTRY_ERRORS, RECEIVE_COUNTRY } from '../../actions/country_actions';

const _nullErrors = [];

const CountryErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_COUNTRY_ERRORS:
            return action.errors;

        case RECEIVE_COUNTRY:
            return _nullErrors;

        default: 
            return state;
    }
}

export default CountryErrorsReducer;