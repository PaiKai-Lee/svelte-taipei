const mongoose = require("mongoose");

const usersSchemas =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    account: {
        type: String,
        require:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    salt: {
        type: String,
        required:true
    },
    createdTime: {
        type:Date
    },
    favors:{
        type:[String],
        default:[]
    },
    POnumber:{
        type:[String],
        default:[]
    }
})

module.exports = mongoose.model("User",usersSchemas)