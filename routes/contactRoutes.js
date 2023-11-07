const express = require("express");
const { contactUs } = require("../controller/contactController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/contact-us", authMiddleware, contactUs);

module.exports = router;
