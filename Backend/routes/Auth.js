const express  = require('express');
const router = express.Router();
const User  = require("../models/User");
const {getToken}= require("../utils/helpers");
router.post('./register',async (req,res)=>{
     const {username,firstName,lastName,email,password}= req.body;

     //check if user existed throw error if yes

     const user =await User.findOne({email:email});
     if(user){
          res.status(403).json({
               message:"user already exists"
          })
     }

     //password change to hash password for security purpose

     const hashedPassword = await bcrypt.hash(password,10);
     const newUserdata= {email,
          password:hashedPassword,
          firstName,
          lastName,
          username};
     const newUser= await User.create(newUserdata);





     const token=await gettoken(email,newUser);
     const userToreturn = {...newUser.toJSON(),token};
     delete userToreturn.password;

     return res.status(200).json({
          message:"user created successfully",
          data:userToreturn
     });




});
     