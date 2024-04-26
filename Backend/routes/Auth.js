const express  = require('express');
const router = express.Router();
const User  = require("../models/User");
router.post('./register',(req,res)=>{
     const {username,firstName,lastName,email,password}= req.body;

     //check if user existed throw error if yes

     const user = User.findOne({email:email});
})