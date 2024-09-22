require('dotenv').config();
const jwt=require('jsonwebtoken');
const Verify_User=(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        const token=authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.secret);
        const {username,id}=decoded;
        req.username=username;
        req.id=id;
        next();
    }
    catch{
        next("Authentication Error!")
    }
}
module.exports=Verify_User;