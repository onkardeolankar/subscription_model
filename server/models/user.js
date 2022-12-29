// import mongoose from 'mongoose'
const express = require("express");
const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:64,
    },
    stripe_customer_id: String,
    subscriptions: [],
});

let usersModel = mongoose.model("User",userSchema);
module.exports={mongoose,usersModel}