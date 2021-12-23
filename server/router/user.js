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
    try {
        let user = await User.findOne({ account }).exec();
        // 沒有此帳號
        if (user === null) return res.status(400).json({ "status": "1002", "msg": "帳號或密碼錯誤" })

        let { password, salt, name } = user;
        let result = checkPWD(userPassword, salt, password);
        // 密碼錯誤
        if (result === false) return res.status(400).json({ "status": "1002", "msg": "帳號或密碼錯誤" })

        if (req.session.login !== true) {
            req.session.login = true
        }

        res.json({ "status": "1001", "name": name })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ "status": "1003" })
    }

})
function checkPWD(userPassword, salt, password) {
    const hash = createHash('sha256');
    hash.update(userPassword + salt);
    let correctPWD = hash.digest('hex')
    return (correctPWD === password) ? true : false
}


router.post('/create', checkSingupData, cryptoPWD, async (req, res) => {
    let { name, account } = req.body;
    let { password, salt } = req;
    try {
        await User.create({
            name: name,
            account: account,
            password: password,
            salt: salt
        })
        res.json({ "status": "1001" })
    } catch (err) {
        console.log(err.message);
        if (err.message.indexOf("duplicate key error") !== -1) {
            return res.status(400).json({ "status": "1002",  "msg": "帳號已註冊"})
        }
        res.status(500).json({ "status": "1003" })
    }
})
function checkSingupData(req, res, next) {
    let { name, account, password } = req.body;
    name=name.trim();
    account=account.trim();
    password=password.trim();
    if (name === "" || account === "" || password === "") return res.status(400).json({ "status": "1002", "msg": "資料不可空白" })
    if (name.length < 3 || account.length < 3 || password.length < 6) return res.status(400).json({ "status": "1002", "msg": "帳號或姓名過短" })
    next()
}
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