const router = require('express').Router();
const { ErrorHandler } = require('../../errorHandler');
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      if (!users.length) {
        throw new ErrorHandler(401, 'Access token is missing or invalid');
      }
      res.json(users.map(User.toResponse));
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler(400, 'Bad request');
      }
      const newUser = await usersService.createUser(req.body);
      res.json(User.toResponse(newUser));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await usersService.getUser(req.params.id);
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      res.json(User.toResponse(user));
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler(400, 'Bad request');
      }
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body
      );
      if (!updatedUser) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.json(User.toResponse(updatedUser));
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedUser = await usersService.deleteUser(req.params.id);
      if (!deletedUser) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(204).end();
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
