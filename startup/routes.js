const morgan = require("morgan");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const authRouter = require("../routes/authRoutes");
const eventRouter = require("../routes/eventRoutes");
const stripeRouter = require("../routes/stripeRoutes");
const contactRouter = require("../routes/contactRoutes");
const ratingRouter = require("../routes/ratingRoutes");

module.exports = function (app) {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cookie());

  app.use("/api", authRouter);
  app.use("/api", eventRouter);
  // app.use("/api/stripe", stripeRouter);
  app.use("/api", contactRouter);
  app.use("/api", ratingRouter);
};
