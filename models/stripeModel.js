const mongoose = require("mongoose");

const stripeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stripe", stripeSchema);
