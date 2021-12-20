require('dotenv').config();
require('./DB/db.js');
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const helmet = require('helmet');
const port = process.env.PORT || 3000;
const apiAttraction = require('./router/attraction');
const apiUser = require('./router/user');

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');
app.use(session({
    name: "sessionId",
    secret: process.env.SESS_KEY,
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 60000 * 60 * 24 * 7 }//7天到期
}))

// router
app.use("/api/attraction", apiAttraction);
app.use("/api/user", apiUser);

// error router
app.use((req, res) => {
    res.status(400).send(`<h1> Wrong page </h1>`)
})

app.listen(port, () => {
    console.log(`Sever is listing on http://localhost:${port}`);
})