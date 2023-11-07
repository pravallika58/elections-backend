const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const StripeData = require("../models/stripeModel");
const asyncHandler = require("express-async-handler");

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, currency } = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    payment_method_types: ["card"],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

module.exports = { createPaymentIntent };
