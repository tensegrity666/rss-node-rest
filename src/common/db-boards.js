const Board = require('../resources/boards/board.model');
const columnDB = require('./db-columns');

const board1 = new Board({ title: 'First board', columns: columnDB });
const board2 = new Board({ columns: columnDB });
const board3 = new Board({ columns: columnDB });
const board4 = {
  id: '12345',
  title: 'VasyaBoard',
  columns: columnDB
};

const boardsDB = [board1, board2, board3, board4];

const getAllBoards = () => [...boardsDB];

const getBoard = id => boardsDB.filter(element => element.id === id)[0];

const createBoard = board => {
  boardsDB.push(board);
  return getBoard(board.id);
};

const deleteBoard = id => [...boardsDB.filter(element => element.id !== id)];

const updateBoard = (id, value) => {
  const board = getBoard(id);
  const index = boardsDB.indexOf(board);
  return (boardsDB[index] = { id, board, ...value });
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
};
