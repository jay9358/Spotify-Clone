const express  = require('express');
const router = express.Router();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
  
const Song = require("../models/Song");
const passport = require('passport');
const User = require("../models/User")

router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {name,thumbnail,track}=req.body;
    const artist= req.user._id;
    if(!name || !thumbnail || !track){
        return res.status(404).json({err:"insuffficient details"})
    }
    const user = await User.findOne({ _id: artist });
    if (!user) {
        return res.status(404).json({ err: "User not found" });
    }

    console.log(user);
    firstName=user.firstName;
    lastName=user.lastName;
    console.log(firstName)
    const songDetails= {name,thumbnail,track,artist,firstName,lastName};
    
    const createdsong = await Song.create(songDetails);
    console.log(createdsong)
    return res.status(200).json(createdsong);
})


router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    

    const songs= await Song.find({artist:req.user._id});

    return res.status(200).json({
        data:songs,
        message:"songs fetched successfully"

    })
})
router.get("/get/song/:songId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    
    const {songId} = req.params;
    const songs= await Song.find({_id: songId});
  
    return res.status(200).json({
        data:songs,
        message:"songs fetched successfully"

    })
})

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
   
    const {artistId} = req.params;


    const artistAwait= await User.findOne({_id:artistId})
  
    if(!artistAwait){
        return res.status(301).json({err:"artist not found"});
    }

    const songs= await Song.find({artist:artistId});
  
    return res.status(200).json({
        data:songs,
        message:"songs fetched successfully"

    })


})
router.get("/get/songName/:songName",passport.authenticate("jwt",{session:false}),async (req,res)=>{

    const {songName} = req.params;
    const songs= await Song.find({name:songName});
  
    return res.status(200).json({
        data:songs,
        message:"songs fetched successfully"

    })


})
 

module.exports=router;