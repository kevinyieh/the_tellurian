const express = require("express");
const router = express.Router();
const Country = require("../../models/Country");

router.get("/country", (req, res) => {
    const cca2 = req.body.cca2

    Country.findOne({ cca2 })
        .then(country => {
            if (country) {
                return res.json(country)
            } else {
                res.status(404).json({ country: "No country found" })
            }
        })
       
})

