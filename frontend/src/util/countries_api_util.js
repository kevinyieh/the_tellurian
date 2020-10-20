import axios from "axios";

export const fetchCountry = country => {
    return axios.post('/api/countries/', country)
}

export function searchCountries(searchparams) {
    return axios.post('/api/countries/search', searchparams)
}