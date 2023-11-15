const mongoose = require("mongoose");

const favoriteLocationSchema = new mongoose.Schema({
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },

  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  subHeading: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("FavoriteLocation", favoriteLocationSchema);
