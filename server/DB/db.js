const mongoose = require('mongoose');
const fs = require("fs/promises");
const Attraction = require("./models/Attractions");
const User = require("./models/Users");
mongoose.connect('mongodb://localhost:27017/taipei')
.then(()=>{console.log(`connectec to mongoDB`)})
.catch(e=>console.log(e));
async function readFile() {
    let data = await fs.readFile(`../public/data/taipei-attractions.json`)
    data = JSON.parse(data);
    let res = data.result;
    return res
}
//整理後存入DB
async function insert() {
    try {
        let res = await readFile();
        let { results } = res;
        let goodData = results.map(item => {
            let convertData = item.file.split("http").slice(1).map(item => item.replace(":", "https:"))
            convertData = convertData.filter(item => item.slice(item.length - 3) !== "mp3")
            item.file = convertData
            return item
        })
        console.log(goodData.length)
        goodData.forEach((res) => {
            Attraction.create({
                id: res._id,
                name: res.stitle,
                category: res.CAT2,
                description: res.xbody,
                address: res.address,
                transport: res.info,
                mrt: res.MRT,
                latitude: res.latitude,
                longitude: res.longitude,
                images: res.file
            }).catch(e=>console.log(e));
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports={
    Attraction,
    User
}