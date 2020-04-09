const router = require('express').Router({ mergeParams: true });
const ErrorHandler = require('../../errorHandler');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await tasksService.getAllByBoard(req.params);
      if (!tasks.length) {
        throw new ErrorHandler(401, 'Access token is missing or invalid');
      }
      res.json(tasks);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler(400, 'Bad request');
      }
      const newTask = await tasksService.createTask(req.params, req.body);
      res.json(newTask);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.getTask(req.params);
      if (!task) {
        throw new ErrorHandler(404, 'Bad request');
      }
      res.json(task);
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler(400, 'Bad request');
      }
      const updatedTask = await tasksService.updateTask(req.params, req.body);
      if (!updatedTask) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.json(updatedTask);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedTask = await tasksService.deleteTask(req.params);
      if (!deletedTask) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(204).end();
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
