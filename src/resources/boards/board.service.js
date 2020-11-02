const boardsRepo = require('./board.repository');
const tasksRepo = require('../tasks/task.repository');

const toResponse = (board) => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const getAll = async () => {
  const boards = await boardsRepo.getAllBoards();
  return boards.map((board) => toResponse(board));
};

const get = async (id) => {
  const board = await boardsRepo.getBoard(id);
  return board && toResponse(board);
};

const del = async (id) => {
  await tasksRepo.resetConnectionsByBoardId(id);
  return boardsRepo.deleteBoard(id);
};

const create = async (boardInfo) => {
  const newBoard = await boardsRepo.createBoard(boardInfo);
  return toResponse(newBoard);
};

const update = async ({ id, updatedInfo }) => {
  const updatedBoard = await boardsRepo.updateBoard({ id, updatedInfo });
  return toResponse(updatedBoard);
};

module.exports = {
  getAll,
  get,
  del,
  create,
  update
};
