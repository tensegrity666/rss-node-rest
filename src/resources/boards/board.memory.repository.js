const DB = require('../../common/db');

const getAllBoards = () => [...DB.boards];

const getBoard = id => DB.boards.filter(board => board.id === id)[0];

const createBoard = newBoard => {
  DB.boards.push(newBoard);

  return getBoard(newBoard.id);
};

const deleteBoard = id => {
  const boardIndex = DB.boards.findIndex(board => board.id === id);

  if (boardIndex === -1) return false;

  DB.boards = DB.boards.filter(board => board.id !== id);

  return true;
};

const updateBoard = ({ id, updatedInfo }) => {
  const boardIndex = DB.boards.findIndex(board => board.id === id);

  if (boardIndex === -1) return false;

  DB.boards.splice(boardIndex, 1, updatedInfo);

  return getBoard(id);
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
};
