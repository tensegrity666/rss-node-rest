const Board = require('../resources/boards/board.model');
const taskDB = require('./db-tasks');
const taskDB2 = require('./db-tasks');

const board1 = new Board({ title: 'First board', tasks: taskDB });
const board2 = new Board({ tasks: taskDB });
const board3 = new Board({ tasks: taskDB });
const board4 = {
  id: '12345',
  title: 'VasyaBoard',
  tasks: taskDB2
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
  return (boardsDB[index] = {
    id,
    title: value.title,
    columns: value.columns,
    tasks: value.tasks || board.tasks
  });
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
};
