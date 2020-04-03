const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const users = await boardsService.getAll();
  res.json(users);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoard(req.params.id);
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.createBoard(req.body);
  res.json(newBoard);
});

router.route('/:id').put(async (req, res) => {
  const updatedBoard = await boardsService.updateBoard(req.params.id, req.body);
  if (updatedBoard) {
    res.json(updatedBoard);
  } else {
    res.status(404).send('columns ID do not match');
  }
});

router.route('/:id').delete(async (req, res) => {
  const deletedBoard = await boardsService.deleteBoard(req.params.id);
  if (deletedBoard) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
