require("dotenv").config();
const express = require("express");
const app=express();
const port = 8000;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const passport= require('passport');
const User = require('./models/User');
const mongoose = require("mongoose");
//connect mongoDb

mongoose.connect("mongodb+srv://jayaggarwal99288:"+process.env.MONGO_PASSWORD +"@cluster0.1excpfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
{  
    useNewUrlParser : true,
    useUnifiedTopology:true
}).then((x)=>{
    console.log("connected to mongo")
}).catch((err)=>{
    console.log("error while connecting to mongo" + err)
});


//connect to passport for authentication


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));





app.get("/",(req,res)=>{
    res.send("hello World");
})

app.listen(port,(err)=>{
    if(!err) console.log("Server is running on port 3001")
});