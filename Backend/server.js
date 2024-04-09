require("dotenv").config();
const express = require("express");
const app=express();
const port = 8000;;
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

app.get("/",(req,res)=>{
    res.send("hello World");
})

app.listen(port,(err)=>{
    if(!err) console.log("Server is running on port 3001")
});