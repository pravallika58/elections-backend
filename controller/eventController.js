const fs = require("fs");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const slugify = require("slugify");
const cloudinaryUploadImage = require("../utils/cloudinary");

const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  if (event) {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, {
      $push: { events: event._id },
    });
  }

  res.send({
    data: event,
    status: true,
  });
});

const getSingleEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findEvent = await Event.findById(id);
    res.json(findEvent);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllEvents = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Event.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const eventsCount = await Event.countDocuments();
      if (skip >= eventsCount) throw new Error("This page does not exists");
    }

    const event = await query;
    res.json(event);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleting = await Event.findByIdAndDelete(id);
    res.status(204).json(deleting);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.eventname) {
      req.body.slug = slugify(req.body.eventname);
    }
    const updatingProduct = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatingProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const addEventFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    event.isLiked = true;
    event.likedBy.push(userId);
    await event.save();
    res.status(200).json({ message: "Event added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const removeEventFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    event.isLiked = false;
    event.likedBy = event.likedBy.filter(
      (userIdInArray) => userIdInArray.toString() !== userId.toString()
    );

    await event.save();
    res.status(200).json({ message: "Event removed from favorites" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findEvent = await Event.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findEvent);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadFeatureImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "featureimage");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findEvent = await Event.findByIdAndUpdate(
      id,
      {
        featureimage: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findEvent);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEvent,
  getSingleEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
  addEventFavorite,
  removeEventFavorite,
  uploadImages,
  uploadFeatureImage,
};
