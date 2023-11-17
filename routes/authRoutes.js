const express = require("express");
const {
  registerUser,
  loginUser,
  handleRefreshToken,
  forgotPasswordToken,
  resetPassword,
  logOut,
  updateUser,
  getUser,
} = require("../controller/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, userImg } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.get("/logout", logOut);
router.get("/me", authMiddleware, getUser);
router.get("/refresh", handleRefreshToken);

router.put(
  "/update-profile",
  authMiddleware,
  uploadPhoto.array("images", 1),
  userImg,
  updateUser
);

router.put("/reset-password/:token", resetPassword);

module.exports = router;
