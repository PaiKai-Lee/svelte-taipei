const express = require("express");
const router = express.Router();
const { Attraction } = require("../DB/db");

router.get('/', async (req, res) => {
    let results = await Attraction.find({},{_id:0,__v:0})
    results.forEach(item=>{
        item.images.splice(1)
    })
    console.dir(results)
    res.json({ "data": results })
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let result = await Attraction.findOne({ id },{_id:0,__v:0})
    res.json({ "data": result })
})

module.exports = router;