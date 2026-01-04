const mongoose = require('mongoose');
const Gender=require('./GenderEnum')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        match: [/^.{6,}$/, "Password must be at least 6 characters long"]
    },
    age:{
        type:Number,
        required:true

    },
    gender:{
        type:String,
        enum:[Gender.MALE,Gender.FEMALE],
        default:Gender.MALE
    },

    avatar:{
        type: String,
        default: function () {
        return this.gender === Gender.FEMALE
            ? "https://cdn-icons-png.flaticon.com/512/2922/2922561.png"
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        }
    }
})
module.exports=mongoose.model('User',UserSchema);