const Rating = require("../models/ratingModle");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Creating Rating
const createRating = asyncHandler(async (req, res) => {
  try {
    const { totalRatings } = req.body;
    if (!totalRatings) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newRating = new Rating({
      totalRatings,
      ratingBy: userId,
    });

    await newRating.save();
    res.status(201).json({ message: "Rating data saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  createRating,
};
