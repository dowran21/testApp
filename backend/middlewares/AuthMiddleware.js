const JWT = require ('jsonwebtoken')
require('dotenv').config()

const VerifyAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization

    if (!token){
        return res.status(401).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(403).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}


const VerifyRefreshToken = async (req, res, next) =>{
    let token = req.headers.authorization
    if (!token){
        return res.status(401).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(403).send("forbidden");
        }
        req.user = decoded;
        next()
    });
  
    
}


module.exports = { 
    VerifyAccessToken,
    VerifyRefreshToken
}