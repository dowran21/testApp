const UserModel = require("../database/models/UsersModel");
const { GenerateAccessToken, GenerateRefreshToken, HashPassword, ComparePassword } = require("../utils");
const {ObjectId} = require("mongoose")

const Register = async (req, res) =>{

    const {username, birth_date, password, email} = req.body;
    // console.log(req.body, "hello")
    const file = req.file;
    console.log(req.files)
    const date = new Date(birth_date)
    const hashedPassword = await HashPassword(password)
    const user = new UserModel({username, birth_date:date, password:hashedPassword, birth_date:user.birth_date, email, image:file?.path});
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
        const data = {id:user._id, username:user.username, email:user.email, birth_date:user.birth_date, image:user.image};
        const access_token = await GenerateAccessToken(data);
        const refresh_token = await GenerateRefreshToken(data)
        return res.status(200).json({data, access_token, refresh_token})   
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)
    }
}

const LoadUser = async(req, res) =>{
    const {id} = req.user;
    try {
        const user =  await UserModel.findOne({_id:id})
        if(!user)
            return res.status(401).send("login or paassword incorrect");
        const data = {id:user._id, username:user.username, email:user.email, birth_date:user.birth_date, image:user.image};
        const access_token = await GenerateAccessToken(data);
        return res.status(200).json({data, access_token})   
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)   
    }
} 

const UpdateUser = async (req, res) =>{
    const {id} = req.user
    const {email, password, birth_date} = req.body;
    const file = req.file;
    const hashedPassword = await HashPassword(password)
    try {
        const user = await UserModel.findOneAndUpdate({_id:id },  {email, password:hashedPassword, birth_date, image:file.path}, {new:true})
        console.log(user)
        const data = {id:user._id, username:user.username, email:user.email, birth_date:user.birth_date, image:user.image};
        const access_token = await GenerateAccessToken(data);
        return res.status(200).json({data, access_token})
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)
    }
}

const GetOrherUsers = async (req, res) =>{
    const {id} = req.user;
    console.log(id);
    try {
        const users = await UserModel.find({_id:{$ne:id}}, "_id username email birth_date image" )
        return res.status(200).json({users})
    } catch (e) {
        console.log(e)
        return res.status(500).send(false)
    }
}

module.exports = {
    Register,
    Login,
    GetOrherUsers,
    LoadUser,
    UpdateUser
}