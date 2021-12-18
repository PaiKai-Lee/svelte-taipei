const express = require("express");
const router = express.Router();
const { User } = require("../DB/db");

router.get('/', (req, res) => {
    res.send(`<h1>hellow world</h1>`)
})

module.exports = router;