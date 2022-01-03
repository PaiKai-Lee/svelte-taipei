const express = require("express");
const router = express.Router();
const { Attraction } = require("../DB/db");

router.get('/', async (req, res) => {
    let { page = 0, keyword = "" } = req.query
    page = parseInt(page)
    let regex = ""
    if (keyword.trim() !== "") {
        regex = new RegExp(keyword, "i")
    }
    let searchFrom = page * 12
    try{
        let results = await Attraction.find({ name: { $regex: regex }, id: { $gt: searchFrom} }, { _id: 0, __v: 0 }).sort({ "id": 1 }).limit(12)
        results.forEach(item => {
            item.images.splice(1)
        })
        let nextPage = (results.length / 12) === 1 ? page+=1 : null
        res.json({ "nextPage": nextPage, "data": results })
    }catch(err){
        console.log(err.message)
        res.status(500).json({ "status": "1003" })
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let result = await Attraction.findOne({ id }, { _id: 0, __v: 0 })
    res.json({ "data": result })
})

module.exports = router;