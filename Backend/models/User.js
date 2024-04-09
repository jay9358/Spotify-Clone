const mongoose = require("mongoose");

// creating mongoose schema

const User = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    email:{type :String , unique :true}, 
    username: { type: String, required: true },
    likedSongs:{type:String ,default:""},
    likedPlaylist:{type:String, default:""},
    subscribedartist:{type:String,default:""}




});

const Usermodel=  mongoose.model('User', User);

module.exports=Usermodel;
