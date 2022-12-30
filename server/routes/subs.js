const express = require("express");

const router = express.Router();

const { prices, createSubscription, subscriptionStatus, subscriptions } =require("../controllers/subs");
const {requireSignin} = require("../middlewares");

router.get("/prices", prices);
router.post("/create-subscription", requireSignin, createSubscription);
router.get("/subscription-status", requireSignin, subscriptionStatus);
router.get("/subscriptions", requireSignin, subscriptions);

module.exports = router;