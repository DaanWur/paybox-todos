const mongoose = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    notifiedUser: {
      default: false,
      type: Boolean,
    },
    taskId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  })
);

function validateNotification(task) {
  const schema = Joi.object({
    notifiedUser: Joi.boolean().default(false),
    taskId: Joi.objectId().required(),
  });
  return schema.validate(task);
}
exports.Notification = Notification;
exports.validate = validateNotification;
