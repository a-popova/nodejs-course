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
  //   const currentUser = usersArray.find(item => item.id === id);
  //   if (currentUser) {
  //     Object.assign(currentUser, newInfo);
  //     return currentUser;
  //   }
  //   return null;
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
