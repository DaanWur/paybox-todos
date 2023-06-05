const express = require("express");
const error = require("../middleware/error");
const notification = require("../routes/notification");

module.exports = function (app) {
  app.use(express.json());
  app.use("/notifications", notification);
  app.use(error);
};
