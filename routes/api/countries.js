const express = require("express");
const router = express.Router();
const Country = require("../../models/Country");

router.post("/", (req, res) => {
  Country.findOne({ cca2: req.body.cca2 })
    .then(country => {
      if (country) {
        return res.json(country)
      } else {
        return res.status(404).json({ country: "No country found" })
      }
    })  
})

router.post("/search", (req, res) => {
  let searchparams = new RegExp('^' + req.body.searchparams, 'i')
  Country.find({ name: { $regex: searchparams } })
    .then(matches => {
      return res.json(matches)
    })
})

module.exports = router;