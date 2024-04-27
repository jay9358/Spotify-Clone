exports={}
const jwt = require("jwtwebtoken");
exports.getToken= async (email,user)=>{
    const token = jwt.sign({identifier:user._id},"secret");
     return token;
}

module.exports=exports