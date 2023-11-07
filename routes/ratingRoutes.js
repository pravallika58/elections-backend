const express = require("express");
const { createRating } = require("../controller/ratingController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createRating);

module.exports = router;
