const countries = require("./countries.json");
const worldbankresponse = (require("./response.json"));
const fs = require('fs');

let seed = {};

countries.forEach(country => {
    seed[country.cca2] = {
        name: country.name.official,
        cca2: country.cca2,
        cca3: country.cca3,
        currencies: Object.keys(country.currencies).map(key => JSON.stringify(country.currencies[key])),
        capital: country.capital,
        region: country.region,
        languages: Object.values(country.languages),
        lat: country.latlng[0],
        lng: country.latlng[1],
    }
})

worldbankresponse[1].forEach(obj => {
    if (seed[obj.country.id] && obj.indicator.id === "SP.POP.TOTL") {
        seed[obj.country.id].population = obj.value;
    } else if (seed[obj.country.id] && obj.indicator.id === "NY.GDP.MKTP.CD") {
        seed[obj.country.id].gdp = obj.value;
    } else if (seed[obj.country.id] && obj.indicator.id === "AG.SRF.TOTL.K2") {
        seed[obj.country.id].area = obj.value
    }
})

console.log(seed);
fs.writeFile('seeds.json', JSON.stringify(seed), (err) => {
    if (err) throw err;
    console.log('The file has been saved');
})