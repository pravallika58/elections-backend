const express = require("express");
const {
  createEvent,
  getSingleEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addEventFavorite,
  removeEventFavorite,
} = require("../controller/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, eventImages } = require("../middlewares/uploadImages");

const router = express.Router();

router.post(
  "/create-event",
  authMiddleware,
  uploadPhoto.array("images", 5),
  eventImages,
  createEvent
);
router.post("/add-favorite/:id", authMiddleware, addEventFavorite);
router.post("/remove-favorite/:id", authMiddleware, removeEventFavorite);

router.get("/:id", getSingleEvent);
router.get("/", getAllEvents);

router.put(
  "/:id",
  authMiddleware,
  uploadPhoto.array("images", 5),
  eventImages,
  updateEvent
);

router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
