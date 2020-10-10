const {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
} = require('../../common/db-boards');

const getAll = async () => await getAllBoards();

const get = async id => {
  const board = await getBoard(id);

  if (board === undefined) throw new Error(`Board with id:${id} not found!`);

  return board;
};

const create = async board => await createBoard(board);

const del = async id => await deleteBoard(id);

const update = async (id, value) => await updateBoard(id, value);

module.exports = { getAll, get, create, del, update };
