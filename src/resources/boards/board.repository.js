const Board = require('./board.model');

const getAllBoards = () => Board.find({});

// const getBoard = id => Board.findById(id);

// const deleteBoard = id => Board.deleteOne({ _id: id });

// const createBoard = newBoard => Board.create(newBoard);

// const updateBoard = async ({ id, updatedInfo }) => {
//   await Board.updateOne({ _id: id }, updatedInfo);
//   return getBoard(id);
// };

module.exports = {
  getAllBoards
  // getBoard,
  // deleteBoard,
  // createBoard,
  // updateBoard
};
