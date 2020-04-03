const Board = require('./board.model');

const boards = [
  {
    id: '1',
    title: 'work',
    columns: [
      {
        id: '1',
        title: 'Planned',
        order: 1
      },
      {
        id: '2',
        title: 'In Progress',
        order: 2
      }
    ]
  },
  {
    id: '2',
    title: 'React',
    columns: [
      {
        id: '1',
        title: 'Tasks',
        order: 1
      },
      {
        id: '2',
        title: 'In Progress',
        order: 2
      }
    ]
  }
];

const getAll = async () => {
  return boards;
};

const getBoard = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async objDetails => {
  const { title, columns } = objDetails;
  const newBoard = new Board({ title, columns });
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, newInfo) => {
  const currentBoard = boards.find(item => item.id === id);
  for (const column of currentBoard.columns) {
    for (const newColumn of newInfo.columns) {
      if (column.id === newColumn.id) {
        Object.assign(currentBoard, newInfo);
        return currentBoard;
      }
      return false;
    }
  }
};

const deleteBoard = async id => {
  const index = boards.findIndex(board => board.id === id);
  if (index !== -1) {
    boards.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
