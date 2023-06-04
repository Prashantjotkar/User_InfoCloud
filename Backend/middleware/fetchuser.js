var jwt = require("jsonwebtoken");
const JWT_Secret = "you vs you";

const fetchuser=(req,res,next)=>{
    //get the user from jwt token and add user id to req object
    const token=req.header('token');
    if(!token)       return res.status(401).send({ errors:'please authunticate using valid token' });
try {
    const data=jwt.verify(token,JWT_Secret);
    req.user=data.user;
       next();
   
} catch (error) {
    res.status(401).send({ errors:'please authunticate using valid token' });
}
}
module.exports=fetchuser;