// import express from 'express'
const express = require("express");
const {User} = require('../helpers/auth');
const jwt = require("jsonwebtoken");
// import { reset } from 'nodemon';
const reset = require('nodemon');
const { hashPassword,comparePassword, hashedPassword } = require('../helpers/auth');
let resgister = async (req,res)=>{
    try{
        const{name,password,email} = (req.body);
        if(!name){
            return res.json({
                error: "Name is required",
            });
        }
        if(!name || password.length < 6){
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: "Email is taken",
            });
        }
        const hashPassword = await hashPassword(password);
        try{
            const user = await new User({name,password:hashPassword,email}).save();
            console.log(user);
            const {password,...rest} = user._doc;
            return res.json({
                user: rest,
            });
        }catch(err){
            console.log(err)
        }

        // res.json({
        //     data: "This is /register endpoint",
        // });
    }catch(err){
        console.log(err);
    }
};

let login = async (req,res) =>{
    try{
        // console.log(req.body);
        const user =  await User.findOne({email: req.body.email});
        if(!user){
            return res.json({
                error : "No user found",
            });
        }

            const match = await comparePassword(req.body.password,user.password)
            if(!match){
                return res.json({
                    error : "Wrong password",
                });
            }
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn : "7d",});

            const {password,...rest} = user._doc;
            return res.json({
                token,
                user: rest,
            });
            
    }catch(err){
        console.log(err);
    }
}
module.exports = {resgister,login}