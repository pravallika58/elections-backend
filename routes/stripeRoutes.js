const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createPaymentIntent } = require("../controller/stripeController");
const router = express.Router();

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
