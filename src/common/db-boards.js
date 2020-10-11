const Board = require('../resources/boards/board.model');

const board1 = new Board({ title: 'First board' });
const board2 = { id: 'b2', title: 'SECOND board' };
const board3 = new Board();
const board4 = {
  id: '12345',
  title: 'VasyaBoard'
};

let boardsDB = [board1, board2, board3, board4];

const getAllBoards = () => [...boardsDB];

const getBoard = id => boardsDB.filter(element => element.id === id)[0];

const createBoard = board => {
  boardsDB.push(board);

  return getBoard(board.id);
};

const deleteBoard = id => {
  const board = getBoard(id);
  const index = boardsDB.indexOf(board);
  const boardsBefore = boardsDB.slice(0, index);
  const boardsAfter = boardsDB.slice(index + 1);
  boardsDB = [...boardsBefore, ...boardsAfter];

  return boardsDB;
};

const updateBoard = (id, value) => {
  const board = getBoard(id);
  const index = boardsDB.indexOf(board);
  return (boardsDB[index] = {
    id,
    title: value.title,
    columns: value.columns
  });
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
};
