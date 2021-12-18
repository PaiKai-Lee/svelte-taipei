require('dotenv').config()
const express = require("express");
const app = express();
require('./DB/db.js');
const port = process.env.PORT || 3000;
const apiAttraction = require('./router/attraction');
const apiUser = require('./router/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/attraction",apiAttraction);
app.use("/api/user",apiUser);

app.use((req,res)=>{
    res.status(400).send(`<h1> Wrong page </h1>`)
})

app.listen(port,()=>{
    console.log(`Sever is listing on http://localhost:${port}`);
})