const { Task, validate } = require("../../models/task");
const express = require("express");
const router = express.Router();

function checkRequest(req) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
}

router.get("/", async (req, res) => {
  const tasks = await Task.find().sort("dueDate");
  res.send(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send("This task cannot be found");
  res.send(task);
});

router.post("/create", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const task = new Task({
    title: req.body.title,
    description: req.body.description ? req.body.description : "",
    dueDate: req.body.dueDate,
  });
  task.save(task);
  res.send(task);
});

router.patch("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    dueDate: req.body.dueDate,
  });
  if (!task) return res.status(404).send("This task cannot be found");

  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send("This task cannot be found");
  res.send(task);
});

module.exports = router;
