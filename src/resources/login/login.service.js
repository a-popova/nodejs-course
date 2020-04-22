const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async loginData => {
  const user = await User.find({ login: loginData.login });
  try {
    const match = await bcrypt.compare(loginData.password, user[0].password);
    if (match) {
      const payload = { userId: user[0]._id, login: user[0].login };
      const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
      return token;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { authenticateUser };
