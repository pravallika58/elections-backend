const Contact = require("../models/contactModle");
const asyncHandler = require("express-async-handler");

const contactUs = asyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  const contact = await Contact.create({
    email,
    subject,
    message,
  });

  if (contact) {
    res.status(201).json({
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    });
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

module.exports = {
  contactUs,
};
