const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config;
const genrateToken = (user)=>{
    return jwt.sign(user).process.env.SECRET_TOKEN;
}

const register = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).send("email or password is incorrect");
        }
        user = await User.create(req.body);
        const token = genrateToken(user);
        return res.status(200).send({user,token});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}
const login = async(req, res)=>{
    try {
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send("email or password is incorrect");
        }
        const match = user.checkPassword(req.body.password);
        if(!match) {
            return res.status(400).send("email or password is incorrect");
        }
        const token = genrateToken(user.token);
        return res.status(200).send({user,token})
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
}
module.exports = {register,login,genrateToken}