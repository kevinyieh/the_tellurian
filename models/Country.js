const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    officialname: {
        type: String,
        required: true
    },
    cca2: {
        type: String,
        required: true 
    },
    cca3: {
        type: String,
        required: true
    },
    capital: {
        type: Array,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        required: true 
    },
    population: {
        type: Number,
        required: true 
    },
    gdp: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng : {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    currencies: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Country = mongoose.model('countries', CountrySchema);