const mongoose = require("mongoose");

const usersSchemas =new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
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

usersSchemas.pre("save",async function(){
    this.id = await User.count()
    this.createdTime = new Date(Date.now()-(new Date().getTimezoneOffset()*60000)); 
})
const User = mongoose.model("User",usersSchemas);

module.exports = User