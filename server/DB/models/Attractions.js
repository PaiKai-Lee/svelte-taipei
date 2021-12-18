const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    id:Number,
    name:String,
    category:String,
    description:String,
    address:String,
    transport:String,
    mrt:String,
    latitude:Number,
    longitude:Number,
    images:[String]
})

module.exports = mongoose.model("Attraction",attractionSchema);