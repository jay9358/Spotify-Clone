const express  = require('express');
const router = express.Router();
const User  = require("../models/User");
const bcrypt = require('bcrypt');

const {getToken}= require("../utils/helpers");
router.post('/register',async (req,res)=>{
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
     console.log(hashedPassword)
     const newUserdata= {email,
          password:hashedPassword,
          firstName,
          lastName,
          username};
     const newUser= await User.create(newUserdata);





     const token=await getToken(email,newUser);
     const userToreturn = {...newUser.toJSON(),token};
     console.log(userToreturn);
     delete userToreturn.password;


     return res.status(200).json({
          message:"user created successfully",
          data:userToreturn
     });




});

router.post('/login', async(req,res)=>{
     const {email,password}=req.body;
     const user =await User.findOne({email:email});
     if(!user){
          return res.status(403).json({err:"Invalid credemtials"});
     }
     
     const ispasswordValid = await bcrypt.compare(password, user.password);
      if(!ispasswordValid){
          return res.status(403).json({err:"Invalid credentials pass"})
     }

     const token = await getToken(user.email,user);

     const userToreturn = {...user.toJSON(),token};
     delete userToreturn.password;

     return res.status(200).json({
          message: 'Login successful',
          data: userToreturn
      });
});
     
module.exports=router;