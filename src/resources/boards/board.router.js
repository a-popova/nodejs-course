const router = require('express').Router();
const ErrorHandler = require('../../errorHandler');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAll();
      if (!boards.length) {
        throw new ErrorHandler(401, 'Access token is missing or invalid');
      }
      res.json(boards);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler(400, 'Bad request');
      }
      const newBoard = await boardsService.createBoard(req.body);
      res.json(newBoard);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.getBoard(req.params.id);
      if (!board) {
        throw new ErrorHandler(404, 'Board not found');
      }
      res.json(board);
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new ErrorHandler(400, 'Bad request');
      }
      const updatedBoard = await boardsService.updateBoard(
        req.params.id,
        req.body
      );
      if (!updatedBoard) {
        throw new ErrorHandler(404, 'Bad request');
      }
      res.json(updatedBoard);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedBoard = await boardsService.deleteBoard(req.params.id);
      if (!deletedBoard) {
        throw new ErrorHandler(404, 'Bad request');
      }
      res.status(204).end();
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
