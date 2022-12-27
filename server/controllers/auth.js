// import express from 'express'
const express = require("express");
const {User} = require('../helpers/auth');
const {mongodb,dbName,dbUrl} = require('../config');
const {mongoose,usersModel,foodModel,orderModel} = require('../models/user');
const jwt = require("jsonwebtoken");
// import { reset } from 'nodemon';
const reset = require('nodemon');
const { hashPassword,comparePassword, hashedPassword, createToken,validateToken} = require('../helpers/auth');
mongoose.connect(dbUrl);



let resgister = async (req,res)=>{
    // try{
    //     const{name,password,email} = (req.body);
    //     if(!name){
    //         return res.json({
    //             error: "Name is required",
    //         });
    //     }
    //     if(!name || password.length < 6){
    //         return res.json({
    //             error: "Password is required and should be 6 characters long",
    //         });
    //     }
    //     const exist = await User.findOne({email});
    //     if(exist){
    //         return res.json({
    //             error: "Email is taken",
    //         });
    //     }
    //     const hashPassword = await hashPassword(password);
    //     try{
    //         const user = await new User({name,password:hashPassword,email}).save();
    //         console.log(user);
    //         const {password,...rest} = user._doc;
    //         return res.json({
    //             user: rest,
    //         });
    //     }catch(err){
    //         console.log(err)
    //     }

    //     // res.json({
    //     //     data: "This is /register endpoint",
    //     // });
    // }catch(err){
    //     console.log(err);
    // }
        try {
          let users = await usersModel.find({email:req.body.email})
          if(users.length>0)
          {
            res.send({
              statusCode:400,
              message:"User Already Exists"
            })
          }
          else
          {
            let hashedPassword = await hashPassword(req.body.password)
            req.body.password = hashedPassword
            let user = await usersModel.create(req.body)
            res.send({
              statusCode:200,
              message:"User Creation Successfull!",
              user,
              token
            })
          }
    
        } catch (error) {
          console.log(error)
          res.send({
            statusCode:500,
            message:"Internal Server Error",
            error
          })
        }
};


let login = async (req,res) =>{
    // try{
    //     // console.log(req.body);
    //     const user =  await User.findOne({email: req.body.email});
    //     if(!user){
    //         return res.json({
    //             error : "No user found",
    //         });
    //     }

    //         const match = await comparePassword(req.body.password,user.password)
    //         if(!match){
    //             return res.json({
    //                 error : "Wrong password",
    //             });
    //         }
    //         const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn : "7d",});

    //         const {password,...rest} = user._doc;
    //         return res.json({
    //             token,
    //             user: rest,
    //         });
            
    // }catch(err){
    //     console.log(err);
    // }
    // try {
      let user = await usersModel.findOne({email:req.body.email})
      if(user)
      {
         let validatePwd = await comparePassword(req.body.password,user.password)
         if(validatePwd){
            let token = await createToken({email:user.email})
            res.send({
              statusCode:200,
              message:"Login Successfull",
              token,
              userId:user._id
            })
          }
         else
         {
          res.send({
            statusCode:401,
            message:"Incorrect Password"
          })
         }
  
      }
      else
      {
        res.send({
          statusCode:400,
          message:"User Does Not Exists"
        })
      }
  
    // } catch (error) {
    //   console.log(error)
    //   res.send({
    //     statusCode:500,
    //     message:"Internal Server Error",
    //     error
    //   })
    // }
}


module.exports = {resgister,login}