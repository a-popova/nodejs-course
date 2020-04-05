const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getAllByBoard = params => tasksRepo.getAllByBoard(params);

const getTask = params => tasksRepo.getTask(params);

const createTask = (params, objDetails) =>
  tasksRepo.createTask(params, objDetails);

const updateTask = (params, newInfo) => tasksRepo.updateTask(params, newInfo);

const deleteTask = params => tasksRepo.deleteTask(params);

module.exports = {
  getAll,
  getAllByBoard,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
