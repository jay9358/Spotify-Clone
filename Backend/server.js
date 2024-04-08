const express = require("express");
const app=express();


app.get("/",(req,res)=>{
    res.send("hello World");
})

app.listen(3001,(err)=>{
    if(!err) console.log("Server is running on port 3001")
});