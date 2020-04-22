const User = require('../users/user.model');
const bcrypt = require('bcrypt');

const authenticateUser = async loginData => {
  const hash = await User.find({ login: loginData.login }, 'password');
  bcrypt.compare(loginData.password, hash[0].password, (err, result) => {
    return result === true;
  });
};

module.exports = { authenticateUser };
