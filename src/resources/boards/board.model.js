const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [columnSchema],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};
const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
