const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const GenerateAccessToken = async (data) =>{
    return JWT.sign(data, process.env.ACCESS_TOKEN, {expiresIn:"1h"})
}

const GenerateRefreshToken = async (data) =>{
    return JWT.sign(data, process.env.REFRESH_TOKEN, {expiresIn:"1d"})
}

const HashPassword = async (password) =>{
    return bcrypt.hashSync(password, 5)
}

const ComparePassword = async (password, hashedPassword) =>{
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    GenerateAccessToken,
    GenerateRefreshToken,
    HashPassword, 
    ComparePassword
}