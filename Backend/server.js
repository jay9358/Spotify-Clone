require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app=express();
const port = 8080;

app.use(cors());

app.use(express.json());

const authRoutes= require("./routes/Auth")
const songRoutes=require("./routes/song")
const playlistRoutes= require("./routes/playlist")


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



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'ABC#123'; // Use environment variable for secret key

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload._id }); // Ensure the payload key matches
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}));




app.get("/",(req,res)=>{
    res.send("hello World");
})
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);


app.listen(port,(err)=>{
    if(!err) console.log("Server is running on port "+ port)
});


