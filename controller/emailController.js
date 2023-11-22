const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "anuhyashetty98@gmail.com",
      pass: process.env.MP,
    },
  });

  let info = await transporter.sendMail({
    from: '" Hey" <abc@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
});

module.exports = sendEmail;
