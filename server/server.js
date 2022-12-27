// import express from 'express'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import dotenv from 'dotenv';
// import {readdirSync} from 'fs'
// import morgan from 'morgan'

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const fs = require('fs');
const morgan = require('morgan')

require('dotenv').config();
// dotenv.config();
const app = express();

app.use(express.json({limit: "5mb"})); //for receiving data from client to server.
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions));

//db
// mongoose.connect(process.env.DATABASE)
// .then(()=>console.log("Db Connected"))
// .catch((err)=> console.log("Error found",err));


//middlewares


//autolaods
fs.readdirSync('./routes').map((r)=> app.use("/api",require(`./routes/${r}`))); //read this folder with a function n map those files inside it apply them as a middleware and requi each prop.



//listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));