const express = require("express");
const router = express.Router();
const Country = require("../../models/Country");

router.get("/", (req, res) => {
  
    Country.findOne({ cca2: req.body.cca2 })
        .then(country => {
            if (country) {
                return res.json(country)
            } else {
                return res.status(404).json({ country: "No country found" })
            }
        })
       
})

router.get("/test", (req, res) => res.json({ msg: "This is the countries route" }));

module.exports = router;