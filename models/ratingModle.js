const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    totalRatings: {
      type: Number,
      default: 0,
    },
    ratingBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
