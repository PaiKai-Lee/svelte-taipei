const express = require("express");
const router = express.Router();
const { Attraction } = require("../DB/db");

router.get('/', async(req, res) => {
    let results = await Attraction.find()
    res.json({"data":results})
})
router.get('/:id', async(req, res) => {
    let {id} = req.params;
    let result = await Attraction.findOne({id})
    res.json({"data":result})
})

module.exports = router;