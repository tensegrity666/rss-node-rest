const Board = require('../../resources/boards/board.model');

const board1 = new Board({ title: 'First board' });
const board2 = { id: 'b2', title: 'SECOND board' };
const board3 = new Board();
const board4 = {
  id: '12345',
  title: 'VasyaBoard'
};

const boardsDB = [board1, board2, board3, board4];

const getAllBoards = () => [...boardsDB];

const getBoard = id => boardsDB.filter(element => element.id === id)[0];

const createBoard = board => {
  boardsDB.push(board);

  return getBoard(board.id);
};

const deleteBoard = id => {
  const indexBoard = boardsDB.findIndex(item => item.id === id);

  boardsDB.splice(indexBoard, 1);

  return true;
};

const updateBoard = props => {
  const { id, updatedBoard } = props;

  const userIndex = boardsDB.findIndex(item => item.id === id);

  boardsDB.splice(userIndex, 1, updatedBoard);

  return getBoard(id);
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
};
