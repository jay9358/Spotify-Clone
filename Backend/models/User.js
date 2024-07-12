const mongoose = require("mongoose");

// creating mongoose schema

const User = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    password:{type: String,required:true},
    email:{type :String , unique :true}, 
    username: { type: String, required: true },
    likedSongs:{type:String ,default:""},
    likedPlaylist:{type:String, default:""},
    subscribedartist:{type:String,default:""},




});

const Usermodel=  mongoose.model('User', User);

module.exports=Usermodel;
