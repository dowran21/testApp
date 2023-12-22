const UserModel = require("../database/models/UsersModel");
const { GenerateAccessToken, GenerateRefreshToken, HashPassword, ComparePassword } = require("../utils");
const {ObjectId} = require("mongoose")

const Register = async (req, res) =>{

    const {username, birth_date, password, email} = req.body;
    // console.log(req.body, "hello")
    const file = req.file;
    console.log(file)
    const date = new Date(birth_date)
    const hashedPassword = await HashPassword(password)
    const user = new UserModel({username, birth_date:date, password:hashedPassword, email, image:file.path});
    try {
        await user.save();
        const data = {id:user._id, username, email, image:user.image};
        const access_token = await GenerateAccessToken(data);
        const refresh_token = await GenerateRefreshToken(data)
        return res.status(200).json({data, access_token, refresh_token})        
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)
    }
}

const Login = async (req, res) =>{
    const {username, password} = req.body;
    try {
        const user = await UserModel.findOne({username:username})
        // console.log(data)
        if(!user)
            return res.status(401).send("login or paassword incorrect");
        const hashedPassword = user.password;
        const compare = await ComparePassword(password, hashedPassword);
        if(!compare)
            return res.status(401).send("login or paassword incorrect");
        const data = {id:user._id, username:user.username, email:user.email, image:user.image};
        const access_token = await GenerateAccessToken(data);
        const refresh_token = await GenerateRefreshToken(data)
        return res.status(200).json({data, access_token, refresh_token})   
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)
    }
}

const GetOrherUsers = async (req, res) =>{
    const {id} = req.user;
    console.log(id);
    try {
        const people = await UserModel.find({_id:{$ne:id}})
        return res.status(200).json({people})
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)
    }
}

module.exports = {
    Register,
    Login,
    GetOrherUsers
}