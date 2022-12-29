// import bcrypt from "bcrypt"
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secretKey = 'process.env.JWT_SECRET'

let hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}

let comparePassword = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

let createToken = async({email})=>{
    let token = await jwt.sign(
        {email},
        secretKey,
        {expiresIn:'1h'}
        )
    return token;
  }

  let validateToken = async(req,res,next)=>{
    if(req.headers && req.headers.authorization)
    {
        let token = req.headers.authorization.split(" ")[1]
        let data =  await decodeToken(token)
        let date = Math.round(new Date()/1000)
        if(date<=data.exp)
        {
            next()
        }
        else{
            res.send({
                statusCode:401,
                message:"Token Expired"
            })
        }
    }
    else
    {
        res.send({
            statusCode:400,
            message:"No token Found"
        })
    }
}

module.exports = {hashPassword, comparePassword,createToken,validateToken}