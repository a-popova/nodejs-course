const Task = require('./task.model');

const getAll = async () => {
  return Task.find({});
};

const getAllByBoard = async params => {
  return await Task.find({ boardId: params.boardId });
};

const getTask = async params => {
  return Task.findById(params.id);
};

const createTask = async (params, objDetails) => {
  const { title, order, description, userId, columnId } = objDetails;
  const boardId = params.boardId;
  return Task.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
};

const updateTask = async (params, newInfo) => {
  return Task.updateOne({ _id: params.id }, newInfo);
};

const deleteTask = async params => {
  return (await Task.deleteOne({ _id: params.id })).deletedCount;
};

module.exports = {
  getAll,
  getAllByBoard,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
