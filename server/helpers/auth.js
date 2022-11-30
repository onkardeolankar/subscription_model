// import bcrypt from "bcrypt"
const bcrypt = require('bcrypt');

let hashPassword =(password)=>{
    return new Promise((resolve,reject)=>{
        bycrypt.genSalt(12,(err,salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt, (err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        });
    })
}

let comparePassword =(password,hashed) =>{
    return bcrypt.compare(password,hashed);
};

module.exports = {hashPassword, comparePassword}