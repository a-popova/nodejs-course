const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getBoard = async id => {
  return Board.findById(id);
};

const createBoard = async objDetails => {
  return Board.create(objDetails);
};

const updateBoard = async (id, newInfo) => {
  return Board.updateOne({ _id: id }, newInfo);
};

const deleteBoard = async id => {
  return await Board.deleteOne({ _id: id });
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
