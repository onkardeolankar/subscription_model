const express = require("express");

const router = express.Router();

const { prices, createSubscription } =require("../controllers/subs");
const {requireSignin} = require("../middlewares");

router.get("/prices", prices);
router.post("/create-subscription", requireSignin, createSubscription);

module.exports = router;