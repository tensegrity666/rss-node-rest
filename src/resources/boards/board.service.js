const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const Board = require('./board.model');

const getAll = () => boardsRepo.getAllBoards();
const get = id => boardsRepo.getBoard(id);
const create = boardInfo => boardsRepo.createBoard(new Board(boardInfo));

const del = id => {
  tasksRepo.resetConnectionsByBoardId(id);
  return boardsRepo.deleteBoard(id);
};

const update = ({ id, updatedInfo }) =>
  boardsRepo.updateBoard({ id, updatedInfo });

module.exports = { getAll, get, create, del, update };
