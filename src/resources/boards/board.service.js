const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const createBoard = objDetails => boardsRepo.createBoard(objDetails);

const updateBoard = (id, newInfo) => boardsRepo.updateBoard(id, newInfo);

const deleteBoard = async id => {
  const board = await boardsRepo.deleteBoard(id);
  if (board) {
    const tasksRelated = await tasksService.getAllByBoard(id);
    if (tasksRelated) {
      await Promise.all(
        tasksRelated.map(task =>
          tasksService.deleteTask({ boardId: id, id: task.id })
        )
      );
    }
  }
  return board;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
