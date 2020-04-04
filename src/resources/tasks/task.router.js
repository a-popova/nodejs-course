const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllByBoard(req.params);
  if (tasks.length) {
    res.json(tasks);
  } else {
    res.status(401).end();
  }
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getTask(req.params);
  if (task) {
    res.json(task);
  } else {
    res.status(404).end();
  }
});

router.route('/').post(async (req, res) => {
  const newTask = await tasksService.createTask(req.params, req.body);
  res.json(newTask);
});

router.route('/:id').put(async (req, res) => {
  const updatedTask = await tasksService.updateTask(req.params, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).end();
  }
});

router.route('/:id').delete(async (req, res) => {
  const deletedTask = await tasksService.deleteTask(req.params);
  if (deletedTask) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
