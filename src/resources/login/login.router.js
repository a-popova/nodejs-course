const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const isUserValid = await loginService.authenticateUser(req.body);
    if (isUserValid) {
      console.log('hi');
    } else {
      throw new Error(403, 'Forbidden');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
