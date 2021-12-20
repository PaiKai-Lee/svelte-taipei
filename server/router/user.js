const express = require("express");
const router = express.Router();
const { createHash } = require("crypto");
const { User } = require("../DB/db");

const shuffled = (string) => string.split('').sort(function () { return 0.5 - Math.random() }).join('');

const checkSession = (req, res, next) => {
    if (req.session.login !== true) return
    next();
}

router.post('/login', async (req, res) => {
    let { account, password: userPassword } = req.body
    let user = await User.findOne({ account }).exec();
    // 沒有此帳號
    if (user === null) return res.status(400).json({ "status": "error", "msg": "帳號或密碼錯誤" })

    let { password, salt, name } = user;
    let result = checkPWD(userPassword, salt, password);

    // 密碼錯誤
    if (result === false) return res.status(400).json({ "status": "error", "msg": "帳號或密碼錯誤" })

    if (req.session.login !== true) {
        req.session.login = true
    }

    res.json({ "status": "ok", "name": name })
})
function checkPWD(userPassword, salt, password) {
    const hash = createHash('sha256');
    hash.update(userPassword + salt);
    let correctPWD = hash.digest('hex')
    return (correctPWD === password) ? true : false
}

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
    salt = shuffled(salt);
    let { password } = req.body
    const hash = createHash('sha256');
    hash.update(password + salt);
    req.password = hash.digest('hex');
    req.salt = salt;
    next();
}

// router.use(checkSession)
//以下API登入後才可執行

module.exports = router;