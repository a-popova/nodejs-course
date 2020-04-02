const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.createUser(req.body);
  res.json(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.updateUser(req.params.id, req.body);
  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  const deletedUser = await usersService.deleteUser(req.params.id);
  if (deletedUser) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
