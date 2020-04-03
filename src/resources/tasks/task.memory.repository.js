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

const getAll = async params => {
  return tasks.filter(task => task.boardId === params.boardId);
};

const getTask = async params => {
  return tasks
    .filter(task => task.boardId === params.boardId)
    .find(task => task.id === params.id);
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

const updateTask = async (id, newInfo) => {
  const currentTask = tasks.find(item => item.id === id);
  const newTask = newInfo;
  Object.assign(currentTask, newTask);
  return currentTask;
};

const deleteTask = async params => {
  const index = tasks.filter(
    task => task.boardId === params.boardId && task.id === params.id
  );

  if (index.length) {
    tasks.slice(index, index + 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
