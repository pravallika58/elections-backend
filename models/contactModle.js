const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Contact", contactSchema);
