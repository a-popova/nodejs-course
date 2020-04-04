const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = objDetails => usersRepo.createUser(objDetails);

const updateUser = (id, newInfo) => usersRepo.updateUser(id, newInfo);

const deleteUser = async id => {
  const user = await usersRepo.deleteUser(id);
  if (user) {
    const tasks = await tasksService.getAll();
    await Promise.all(
      tasks
        .filter(task => task.userId === id)
        .map(task => {
          return tasksService.updateTask({ id: task.id }, { userId: null });
        })
    );
  }
  return user;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
