const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../errorHandler');
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.authenticateUser(req.body);
    if (token) {
      res.send(token);
    } else {
      throw new ErrorHandler(403, 'Forbidden');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
