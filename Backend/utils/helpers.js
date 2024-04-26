exports={}

exports.getToken= async (email,user)=>{
    const token = jwt.sign({identifier:user._id});
     
}

module.exports=exports