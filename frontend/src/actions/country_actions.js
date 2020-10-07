import * as APIUtil from '../util/countries_api_util';

export const RECEIVE_COUNTRY = "RECEIVE_COUNTRY";
export const RECEIVE_COUNTRY_ERRORS = "RECEIVE_COUNTRY_ERRORS"

export const receiveCountry = country => {
    return {
        type: RECEIVE_COUNTRY,
        country
    }
}

export const receiveCountryErrors = errors => {
    return {
        type: RECEIVE_COUNTRY_ERRORS,
        errors
    }
}


export const fetchcountry = country => dispatch => 
    APIUtil.fetchCountry(country)
        .then(country => dispatch(receiveCountry(country.data)))
        .catch(err => dispatch(receiveCountryErrors(err)))

