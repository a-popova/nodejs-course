const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getUser = async id => {
  return User.findById(id);
};

const createUser = async user => {
  return User.create(user);
};

const updateUser = async (id, newInfo) => {
  return User.updateOne({ _id: id }, newInfo);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
