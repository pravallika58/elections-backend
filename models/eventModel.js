const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    startdate: {
      type: Date,
    },
    enddate: {
      type: Date,
    },
    starttime: {
      type: String,
    },
    endtime: {
      type: String,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    featureimage: {
      type: String,
    },
    images: {
      type: Array,
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    eventcreator: {
      type: String,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Events", eventSchema);
