const express = require("express");
const tasks = require("../routes/task");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/tasks", tasks);
  app.use(error);
};
