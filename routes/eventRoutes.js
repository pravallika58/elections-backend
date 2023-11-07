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
const router = express.Router();

router.post("/create-event", authMiddleware, createEvent);
router.post("/add-favorite/:id", authMiddleware, addEventFavorite);
router.post("/remove-favorite/:id", authMiddleware, removeEventFavorite);

router.get("/:id", getSingleEvent);
router.get("/", getAllEvents);

router.put("/:id", authMiddleware, updateEvent);

router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
