const router = require('express').Router();
const { ErrorHandler } = require('../../errorHandler');
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.authenticateUser(req.body);
    if (token) {
      res.json({ token });
    } else {
      throw new ErrorHandler(403, 'Forbidden');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
