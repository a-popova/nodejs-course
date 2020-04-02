const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = objDetails => usersRepo.createUser(objDetails);

const updateUser = (id, newInfo) => usersRepo.updateUser(id, newInfo);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
