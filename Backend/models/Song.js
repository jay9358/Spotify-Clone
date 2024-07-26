const mongoose =  require('mongoose');

const Song = new mongoose.Schema({
    name :  {type: String, required: true},
    thumbnail : { type:String , required : true },
    track : { type: String, required: true },
    artist :{type: mongoose.Types.ObjectId,ref: "user",  },
    firstName:{ type: String, required: false},
    lastName:{ type: String, required: false},
})

const Songmodel= mongoose.model( 'Song',Song)
module.exports = Songmodel;