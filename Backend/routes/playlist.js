const express  = require('express');
const router = express.Router();
const passport= require("passport")
const Playlist = require("../models/Playlist")
const User= require("../models/User")

const Song = require("../models/Song")

router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currUser=req.user;
    const {name,thumbnail,songs}=req.body;
    if(!name || !thumbnail || !songs){
        return res.status(400).json({msg:"Please fill all the fields"});
    }
    const playlistData={name,thumbnail,songs,owner:currUser._id,collaborators:[]};
    const playlist = await Playlist.create(playlistData);

    return res.status(200).json({
        message:"playlist created",
        data:playlist
    }
    )
})

//: to get playlistId variable
//if not /playlist we will not know which one is variable for playlist is which is artistId

router.get("/get/playlist/:playlistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const playlistId = req.params.playlistId;   
    const playlist= await Playlist.findOne({_id:playlistId});
   
    if(!playlist){
        return res.status(400).json({msg:"Playlist not found not valid Id"});

    }
    return res.status(404).json({data:playlist});
})
router.get(
    "/get/me",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const artistId = req.user._id;

        const playlists = await Playlist.find({owner: artistId}).populate(
            "owner"
        );
        return res.status(200).json({data: playlists});
    }
);


//get all playlist by an artist

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId= req.params.artistId;;
    const artist = await User.findOne({_id:artistId});
    if(!artist){
        return res.status(301).json({err:"invalid artist ID"})
    }
    const playlists = await Playlist.find({owner:artistId});
    //if no playlist empty array do in frontend
    return res.status(200).json({data:playlists});
})


//add song to playlist
router.post("/add/song",passport.authenticate("jwt",{session:false}),async (req,res)=>{
  
    const currUser= req.user;
    const {playlistId,songId}= req.body;
     
    const playlist=await Playlist.findOne({_id:playlistId});

    if(!playlist){
        return res.status(304).json({msg:"Playlist not found"});
    }
    
    if(!playlist.owner.equals(currUser._id) || playlist.collaborators.includes(currUser._id)){
        return res.status(400).json({err:"Not allowed"})
    }

    const song = await Song.findOne({_id:songId});
    
    if(!song){
        return res.status(304).json({msg:"Song not found"});
    }

    playlist.songs.push(songId);
    
    // Save the updated playlist
    await playlist.save();



   
    //to save our changes in database

    return res.status(200).json({
        msg:"Song added to playlist"
    })


})






module.exports=router;