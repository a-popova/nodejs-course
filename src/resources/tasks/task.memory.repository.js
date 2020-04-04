const Task = require('./task.model');

const tasks = [
  {
    id: '1',
    title: 'Strings',
    order: '1',
    description: 'Tasks to train strings operations',
    userId: '1',
    boardId: '1',
    columnId: '1'
  },
  {
    id: '2',
    title: 'Algorithms',
    order: '2',
    description: 'Tasks to train algorithms operations',
    userId: '1',
    boardId: '1',
    columnId: '2'
  }
];

const getAll = async () => {
  return tasks;
};

const getAllByBoard = async params => {
  return tasks.filter(task => task.boardId === (params.boardId || params));
};

const getTask = async params => {
  return tasks.find(task => task.id === params.id);
};

const createTask = async (params, objDetails) => {
  const { title, order, description, userId, columnId } = objDetails;
  const boardId = params.boardId;
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (params, newInfo) => {
  const currentTask = tasks.find(task => task.id === params.id);
  if (currentTask) {
    Object.assign(currentTask, newInfo);
    return currentTask;
  }
  return false;
};

const deleteTask = async params => {
  const index = tasks.findIndex(task => task.id === params.id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getAllByBoard,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
