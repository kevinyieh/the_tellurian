import axios from "axios";

export const fetchCountry = country => {

    return axios.post('/api/countries/', country)
     
}