// import express from 'express'
const express = require("express");
const router = express.Router(); //gives the routing functionality of express app.
const {resgister} = require("../controllers/auth");
const {login} = require("../controllers/auth");


router.post('/register', resgister);
router.get('/login', login);


module.exports = router;