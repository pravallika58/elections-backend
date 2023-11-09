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
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: String,
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
      type: Array,
    },
    images: {
      type: Array,
    },

    isLiked: {
      type: Boolean,
      default: false,
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
