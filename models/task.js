const mongoose = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: {
      type: String,
      require: true,
      minlegth: 3,
      maxlength: 128,
    },
    description: {
      type: String,
      required: false,
      maxlength: 255,
    },
    creationDate: {
      required: true,
      type: Date,
      default: Date.now,
    },
    dueDate: {
      required: true,
      type: Date,
    },
  })
);

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(128).required(),
    description: Joi.string().max(255),
    dueDate: Joi.date()
      .format(["YYYY-MM-DD HH:mm", "YYYY/MM/DD"])
      .allow("")
      .required(),
  });
  return schema.validate(task);
}
exports.Task = Task;
exports.validate = validateTask;
