const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: {
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
        type: String,
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
        type: Decimal128,
        required: true
    },
    lat: {
        type: Decimal128,
        required: true
    },
    lng : {
        type: Decimal128,
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