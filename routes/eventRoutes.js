const express = require("express");
const {
  createEvent,
  getSingleEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addEventFavorite,
  removeEventFavorite,
  uploadFeatureImage,
  uploadImages,
} = require("../controller/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  featureImage,
  eventsImages,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/create-event", authMiddleware, createEvent);
router.post("/add-favorite/:id", authMiddleware, addEventFavorite);
router.post("/remove-favorite/:id", authMiddleware, removeEventFavorite);

router.get("/:id", getSingleEvent);
router.get("/", getAllEvents);

router.put("/:id", authMiddleware, updateEvent);
router.put(
  "/featureImage/:id",
  authMiddleware,
  uploadPhoto.array("featureimage", 1),
  featureImage,
  uploadFeatureImage
);
router.put(
  "/eventImages/:id",
  authMiddleware,
  uploadPhoto.array("featureimage", 5),
  eventsImages,
  uploadImages
);

router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
