const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const prices = async (req, res) => {
  const prices = await stripe.prices.list();
  //   console.log("prices", prices);
  res.json(prices.data.reverse());
};

const createSubscription = async (req,res) =>{

}
module.exports = {prices, createSubscription}