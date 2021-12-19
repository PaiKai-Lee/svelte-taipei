const express = require("express");
const router = express.Router();
const { createHash } = require("crypto");
const { User } = require("../DB/db");

const shuffled = (string) => string.split('').sort(function () { return 0.5 - Math.random() }).join('');

router.post('/login', async (req, res) => {
    res.send(`<h1>hellow world</h1>`)
})

router.post('/create', cryptoPWD, async (req, res) => {
    let { name, account } = req.body
    let { password, salt } = req
    try {
        await User.create({
            name: name,
            account: account,
            password: password,
            salt: salt
        })
        res.json({ "status": "ok" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ "status": "error" })
    }
})
function cryptoPWD(req, res, next) {
    let t = Date.now()
    let salt = `${process.env.SYCRET_KEY}${t}`
    salt=shuffled(salt);
    let { password } = req.body
    const hash = createHash('sha256');
    hash.update(password + salt);
    req.password = hash.digest('hex');
    req.salt = salt;
    next();
}

module.exports = router;