const { Notification, validate } = require("../../models/notification");
const { Task, validateTask } = require("../../models/task");
const { startOfToday, add } = require("date-fns");
const express = require("express");
const router = express.Router();

router.get("/all-notifications", async (req, res) => {
  const notifications = await Notification.find();
  res.send(notifications);
});

// returns the about to be dued tasks
router.get("/close-due", async (req, res) => {
  const notNotified = await Notification.find({ notifiedUser: false });
  const taskIds = notNotified.map((notification) => {
    return notification.taskId.toString();
  });

  const tasks = await Task.find({
    dueDate: {
      $gte: startOfToday(),
      $lte: add(startOfToday(), { days: 4 }),
    },
    status: false,
  }).sort({ dueDate: 1 });
  const tasksToNotify = tasks.filter((x) => {
    return taskIds.indexOf(x.id.toString()) !== -1;
  });
  res.send(tasksToNotify);
});

router.post("/create", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const notification = new Notification({
    taskId: req.body.taskId,
  });
  notification.save(notification);
  res.send(notification);
});

// update notifications
router.patch("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const notification = await Notification.findByIdAndUpdate(req.params.id, {
    notifiedUser: req.body.notifiedUser,
  });
  if (!notification)
    return res.status(404).send("This notification cannot be found");

  res.send(notification);
});

router.delete("/:id", async (req, res) => {
  const notification = await Notification.findByIdAndRemove(req.params.id);

  if (!notification)
    return res.status(404).send("This notification cannot be found");
  res.send(notification);
});

module.exports = router;
