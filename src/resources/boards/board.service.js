const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const createBoard = objDetails => boardsRepo.createBoard(objDetails);

const updateBoard = (id, newInfo) => boardsRepo.updateBoard(id, newInfo);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
