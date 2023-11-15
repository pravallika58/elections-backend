const express = require("express");

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  saveLocation,
  getLocations,
  removeLocation,
} = require("../controller/favoriteLocationController");

const router = express.Router();

router.post("/favorite-location", authMiddleware, saveLocation);

router.delete("/favorite-location/:id", authMiddleware, removeLocation);
router.get("/all-location", authMiddleware, getLocations);

module.exports = router;
