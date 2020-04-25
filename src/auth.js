const User = require('./resources/users/user.model');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).send('Unauthorized');
  }
  token = token.slice(7, token.length);
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(data.userId);
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  } catch (err) {
    console.log('Err:', err);
  }
};

module.exports = { authenticate };
