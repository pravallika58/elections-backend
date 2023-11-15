const FavoriteLocation = require("../models/favoriteLocation");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");

const saveLocation = asyncHandler(async (req, res) => {
  try {
    const { latitude, longitude, title, subTitle, subHeading } = req.body;
    const user = req.user;
    console.log(user._id);
    const favoriteLocation = await FavoriteLocation.create({
      latitude,
      longitude,
      title,
      subTitle,
      subHeading,
      user: user._id,
    });

    res.status(201).send({
      status: true,
      message: "Location saved successfully",
      data: favoriteLocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Server error" });
  }
});

const removeLocation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const location = await FavoriteLocation.findById(id);
    if (!location) {
      return res
        .status(404)
        .send({ status: false, message: "Location not found" });
    }
    await FavoriteLocation.findByIdAndDelete(id);

    res
      .status(200)
      .send({ status: true, message: "Location removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "Server error" });
  }
});

const getLocations = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const allFavoriteLocations = await FavoriteLocation.find({
      user: user._id,
    });

    res.status(200).send({
      status: true,
      message: "Locations fetched successfully",
      data: allFavoriteLocations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: "Server error" });
  }
});

module.exports = {
  saveLocation,
  getLocations,
  removeLocation,
};
